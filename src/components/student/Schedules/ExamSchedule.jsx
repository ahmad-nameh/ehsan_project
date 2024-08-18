import { React ,useState ,useEffect ,useContext } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ResponsiveDateTimePickers from "../../Date/DateTimePic";
import DatePiker from "../../Date/DatePiker";
import axios from "axios";
import { PopUp } from "../../../App";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const ExamSchedule =(props) => {

    const { click ,tclick , setclick} = useContext(PopUp);
    const [data , setData] = useState({});
    const [formData,setFormData] = useState();
    const [error , setError] = useState('')
    const[date,setDate] = useState()
    const[time,settime] = useState()
    const[change,setChange] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("token")

    useEffect(()=>{
        const getData = async () => {
        // setclick([0,0,0,0,0,1])
        
        try {
            // console.log(day)
        const response = await axios.post(
            `${apiUrl}/showExamSchedule`,{
                class_id :localStorage.getItem("class"),
            },
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        if(response.data.status) {
        // setclick([0])
        console.log(response)
        setData(response.data.data)
        }
        
        }
        catch(e){
        setError(e.message)
        console.log(e)
        }
    }
    getData();
    },[change])

    // const handleInputChange =(event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name] : event.target.value
    //     })
    // }
    console.log(formData)
    console.log(data)

    // console.log(day)
    const handleAddToProgram = async(e) => {
        e.preventDefault();
        
        try {
            // setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/addExamSchedule`,{
                name: formData,
                date: date,
                class_id :localStorage.getItem("class"),
                time : time
            },
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        
        console.log(response)
        if(response.data.status) {
            setChange(!change)
        }
        console.log(formData)
        }
    
        catch(e) {
            // setclick([0])
            console.log(e)
    }
    }
    const handleDel = async(id) => {        
        try {
            // setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/deleteExamSchedule`,{
                id: id
            },
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        
        console.log(response)
        if(response.data.status) {
            setChange(!change)
            setFormData({})
            // setclick([0,0,0,0,1]);
            // setMessage(response.data.message)
        }
        console.log(formData)
        }
    
        catch(e) {
            // setclick([0])
            console.log(e)
    }
    }
    console.log(formData)
    console.log(date)
    console.log(time)
    return(
        <div className="examschedule">
            <h2 className="text-l text-center mt-6">برنامج الامتحان</h2>
            <div className="flex max-h-[90vh] overflow-auto flex bg-white p-12 text-[13px] justify-between addClassmate gap-9">
            <div className="" style={{direction:"rtl"}}>
                <form onSubmit={handleAddToProgram}>
                <label>المادة</label><br/>
                <input type="text" placeholder="المادة الامتحانية"className="w-full" name="name" required onChange={(e)=>setFormData(e.target.value)}/><br/>
                <label>التاريخ</label><br/>
                <DatePiker datee={date} setDate={setDate}/>                
                <label>الوقت</label>
                <ResponsiveDateTimePickers time={time} setTime={settime}/>
                <button className="adding mx-auto" onClick={(e)=>handleAddToProgram}>إضافة</button>
                </form>
            </div>
            {data[0]&&
            <div className="max-h-96 overflow-auto">
                {data.map((item,index) => (
                <div className=" flex gap-3 justify-between items-center p-4 h-28 classmate w-80 " key={index} >
                    <p className="text-3xl">{new Date(item.date).getDate()}<br/>/{new Date(item.date).getMonth()}</p>
                    <div className="flex justify-between items-center border-y-2 p-3 border-slate-300 gap-14">
                        <p className="text-xl">{item.name}
                        <br/><span className="text-base text-gray-600">{item.class}</span></p>     
                        <div className="flex gap-5 items-center">
                        <p className="text-xl text-gray-500"><AccessTimeIcon className="clock"/>{item.time}</p>
                        <div>
                            <ClearIcon className="cursor-pointer" onClick={()=>handleDel(item._id)}/><br/>
                            <EditIcon/>
                        </div>
                        </div>
                    </div>
                </div>
                ))}
        
                
            </div>}
        </div>
        {/* <button style={{padding: "10px 20px",color:"white",backgroundColor:"green",borderRadius:"12px",display:"block",margin: "-15px  auto 10px"}}>حفظ</button> */}
        </div>
    )
}