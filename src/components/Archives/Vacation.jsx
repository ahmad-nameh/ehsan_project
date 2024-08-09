import { React ,useState ,useEffect ,useContext} from "react";
import DatePiker from "../Date/DatePiker";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from "axios";
import { PopUp } from "./pages/SubInfoArchivePart2";


const Vacation =(props) => {

    const token = localStorage.getItem("token");
    const [emp_id,setEmpId] = useState();

    const [vacationData, setVacationData] = useState({});

    const { setclick } = useContext(PopUp);

    const apiUrl = process.env.REACT_APP_API_URL
        

    useEffect(()=> {
      if(props.data && props.data.administrative_vacations.length !==0){
        setEmpId(props.data.administrative_vacations[0].emp_id);
          const transformedData = props.data.administrative_vacations.reduce((acc, cur, index) => {
            acc[`vac${index + 1}`] = cur;
            return acc;
        }, {});
        setVacationData(transformedData);
        
      }
      else {
        setVacationData({vac1: { emp_id:props.empid, date: " ", reason:"",duration: "" },});
        setEmpId(props.empid);    
      }
    },[props.empid ,props.data]);
    
    const handleInputChange = (value, field, index) => {
      const newData = { ...vacationData };
      newData[`vac${index + 1}`][field] = value;
      setVacationData(newData);
    };
    
    const handleDateChange = (date, index) => {
      const newData = { ...vacationData };
      newData[`vac${index + 1}`].date = date;
      setVacationData(newData);
    };
  
    const handleDelete = (index) => {
      setVacationData(prevData=> {
      const newData = { ...prevData};
      delete newData[`vac${index + 1}`];
      Object.keys(newData).forEach((key, i) => {
          if (i >= index) {
          const newKey = `vac${i + 1}`;
        if (key !== newKey) {
          newData[newKey] = newData[key];
          delete newData[key];
        }
      }
      });

      return newData;
      });
    }
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const response = await axios
        .post(
          `${apiUrl}/addEmpVac`,vacationData,
          {
            headers: {
              Accept: "application/json",
              'Authorization': `Bearer ${token}`,
            }
          }
        )
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
          <p>الاجازات الادارية</p>
          <table>
              <tr>
                  <th>تاريخه</th>
                  <th>مدته</th>
                  <th>أسبابه</th>
                  <th></th>
              </tr>
              {Object.keys(vacationData).map((key, index) => (
              <tr key={index}>
                <td>
                  <DatePiker
                  datee={vacationData[key].date}
                  setDate={(date) => handleDateChange(date, index)}
                  />
                </td>
                  <td>
                    <input type="text" value={vacationData[key].duration} required
                    onChange={(e) => handleInputChange(e.target.value, "duration", index)}/>
                  </td>
                  <td>
                    <textarea  value={vacationData[key].reason} required
                    onChange={(e) => handleInputChange(e.target.value, "reason", index)}></textarea>
                  </td>
                  <td>
                    <button disabled={Object.keys(vacationData).length === 1} onClick={() => handleDelete(index)}>
                      <DeleteOutlineIcon  className="text-red-600"/>
                    </button>
                  </td>
              </tr>
              ))}
              <button
                onClick={() => {
                  setVacationData((prevData) => ({
                    ...prevData,
                    [`vac${ Object.keys(vacationData).length + 1}`]: { emp_id:emp_id, date: " ", reason:"",duration: "" },
                  }));
                }}
                className="AddRowButton " 
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

export default Vacation;



