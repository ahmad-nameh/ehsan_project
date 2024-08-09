import { React , useState ,useEffect ,useContext} from "react";
import DatePiker from "../Date/DatePiker";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { PopUp } from "./pages/SubInfoArchivePart2";


const Rewards_punishments =(props) => {

    const token = localStorage.getItem("token");
    const [emp_id,setEmpId] = useState();

    const [rewardsOrpunihData, setRewardsOrPunishData] = useState({});

    const { setclick } = useContext(PopUp);

    useEffect(()=> {
        if(props.type==="reward") {
            if(props.data && props.data.rewards.length !==0){
                setEmpId(props.data.rewards[0].emp_id);
                const transformedData = props.data.rewards.reduce((acc, cur, index) => {
                acc[`rew${index + 1}`] = cur;
                return acc;
                }, {});
            setRewardsOrPunishData(transformedData);
            }
            else {
                setRewardsOrPunishData({rew1: { name: "", emp_id: props.empid, date: "",type:"",note:"",resourse:"الادارة"},});
                setEmpId(props.empid);    
            }
        }
        else {
            if(props.data && props.data.punishments.length !==0){
                setEmpId(props.data.punishments[0].emp_id);
                const transformedData = props.data.punishments.reduce((acc, cur, index) => {
                acc[`pun${index + 1}`] = cur;
                return acc;
                }, {});
            setRewardsOrPunishData(transformedData);
            }
            else {
                setRewardsOrPunishData({pun1: { name: "", emp_id: props.empid, date: "",type:"",note:"",resourse:"الادارة"},});
                setEmpId(props.empid);    
            }
        }
    },[props.empid ,props.data,props.type]);

    const handleInputChange = (value, field, index) => {
        if(props.type==="reward") {
            const newData = { ...rewardsOrpunihData };
            newData[`rew${index + 1}`][field] = value;
            setRewardsOrPunishData(newData);
        }
        else {
            const newData = { ...rewardsOrpunihData };
            newData[`pun${index + 1}`][field] = value;
            setRewardsOrPunishData(newData);
        }
    };
    
    const handleDateChange = (date, index) => {
        if(props.type==="reward") {
            const newData = { ...rewardsOrpunihData };
            newData[`rew${index + 1}`].date = date;
            setRewardsOrPunishData(newData);
        }
        else {
            const newData = { ...rewardsOrpunihData };
            newData[`pun${index + 1}`].date = date;
            setRewardsOrPunishData(newData);
        }
    };
    
    const handleDelete = (index) => {
        if(props.type==="reward") {
            setRewardsOrPunishData(prevData=> {
            const newData = { ...prevData};
            delete newData[`rew${index + 1}`];
            Object.keys(newData).forEach((key, i) => {
                if (i >= index) {
                const newKey = `rew${i + 1}`;
                    if (key !== newKey) {
                        newData[newKey] = newData[key];
                        delete newData[key];
                    }
                }
            });
            return newData;
            });
        }
        else {
            setRewardsOrPunishData(prevData=> {
            const newData = { ...prevData};
            delete newData[`pun${index + 1}`];
            Object.keys(newData).forEach((key, i) => {
                if (i >= index) {
                    const newKey = `pun${i + 1}`;
                    if (key !== newKey) {
                        newData[newKey] = newData[key];
                        delete newData[key];
                    }
                }
            });
            return newData;
            });
        };
    }
    const apiUrl = process.env.REACT_APP_API_URL
        const handleSave = async (e) => {    
            e.preventDefault();    
            let response;
        try {
            if(props.type==="reward") {
            response = await axios
            .post(
            `${apiUrl}addEmpRew`,rewardsOrpunihData,
            {
            headers: {
                Accept: "application/json",
                'Authorization': `Bearer  ${token}`,
            }
            }
            )
            }
            else {
                response = await axios
            .post(
            `${apiUrl}addEmpPun`,rewardsOrpunihData,
            {
            headers: {
                Accept: "application/json",
                'Authorization': `Bearer  ${token}`,
            }
            }
            )
            }
            if(response.status==200) {
                setclick([1, 0, 0, 0,1])
            }
        }
        catch(error){
            console.error(error);
        }
    };

    return(
            <div>
                <form onSubmit={handleSave}>
                <table>
                    <p className={props.type==="reward" ? "text-lime-600 font-extrabold" 
                        : "text-red-600 font-extrabold"}>
                            {props.type==="reward" ? "المكافآت" : "العقوبات"} 
                    </p>
                    <tr>
                        <th>{props.type==="reward" ? "المكافئة" : "العقوبة"}</th>
                        <th>نوعها</th>
                        <th>تاريخها</th>
                        <th>الملاحظات</th>
                        <th></th>
                    </tr>
                    {Object.keys(rewardsOrpunihData).map((key, index) => (
                    <tr key={index}>
                    <td>
                        <textarea 
                        value={rewardsOrpunihData[key].name} required
                        onChange={(e) => handleInputChange(e.target.value, "name", index )}></textarea>
                    </td>
                    <td>
                        <textarea 
                        value={rewardsOrpunihData[key].type} required
                        onChange={(e) => handleInputChange(e.target.value, "type", index )}></textarea>
                    </td>
                    <td>
                        <DatePiker
                            datee={rewardsOrpunihData[key].date}
                            setDate={(date) => handleDateChange(date, index)}
                        />
                    </td>
                    <td>
                        <textarea 
                        value={rewardsOrpunihData[key].note} required
                        onChange={(e) => handleInputChange(e.target.value, "note", index)}></textarea>
                    </td>
                    <td>
                        <button disabled={Object.keys(rewardsOrpunihData).length === 1} onClick={() => handleDelete(index)}>
                            <DeleteOutlineIcon className="text-red-600"/>
                        </button>
                    </td>
                </tr>
                ))}
                <button
                onClick={() => {
                    setRewardsOrPunishData((prevData) => {
                        const prefix = props.type === "reward" ? "rew" : "pun";
                        return {
                            ...prevData,
                            [`${prefix}${Object.keys(rewardsOrpunihData).length + 1}`]: {
                                name: "",
                                emp_id: emp_id,
                                type: "",
                                date: "",
                                note: "",
                                resourse: "الادارة"
                            },
                        };
                    });
                }}
                className={props.type === "reward" ? "flex items-center absolute bottom-3 left-11 px-1 py-0.5 rounded-md bg-lime-600 text-white" 
                : "flex items-center absolute bottom-3 left-11 px-1 py-0.5 rounded-md bg-red-500 text-white"}
                >
                <AddRoundedIcon />
                اضافة
                </button>
                </table>
                <input
                type="submit"
                className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white mx-auto my-1.5 block"
                style={{ boxShadow: "0 0 10px var(--color4)" }}
                value="حفظ"
                />
            </form>
        </div>
    )
}

export default Rewards_punishments;
