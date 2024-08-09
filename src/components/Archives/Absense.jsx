import { React ,useState ,useEffect,useContext} from "react";
import DatePiker from "../Date/DatePiker";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from "axios";
import { PopUp } from "./pages/SubInfoArchivePart2";


const Absense =(props) => {

    const token = localStorage.getItem("token");
    const [emp_id,setEmpId] = useState();

    const [absenseData, setAbsenseData] = useState({});

    const { setclick } = useContext(PopUp);
        

      useEffect(()=> {
        if(props.data && props.data.absences_and_vacations.length !==0){
          setEmpId(props.data.absences_and_vacations[0].emp_id);
            const transformedData = props.data.absences_and_vacations.reduce((acc, cur, index) => {
              acc[`abs${index + 1}`] = cur;
              return acc;
          }, {});
          setAbsenseData(transformedData);
          
        }
        else {
          setAbsenseData({abs1: { emp_id:props.empid, from: " ",to:" ", reason:"",duration: "" },});
          setEmpId(props.empid); 
        }
    },[props.empid ,props.data]);
    
    const handleInputChange = (value, field, index) => {
      const newData = { ...absenseData };
      newData[`abs${index + 1}`][field] = value;
      setAbsenseData(newData);
    };
    
    const handleDateChange = (date, index,selectedDate) => {
      const newData = { ...absenseData };
        if(selectedDate==="from") {
            newData[`abs${index + 1}`].from = date;
        }
        else {
            newData[`abs${index + 1}`].to = date;
        }
      setAbsenseData(newData);
    };
  
    const handleDelete = (index) => {
        setAbsenseData(prevData=> {
        const newData = { ...prevData};
        delete newData[`abs${index + 1}`];
        Object.keys(newData).forEach((key, i) => {
            if (i >= index) {
            const newKey = `abs${i + 1}`;
          if (key !== newKey) {
            newData[newKey] = newData[key];
            delete newData[key];
          }
        }
        });
  
        return newData;
        });
    }
    
    const apiUrl = process.env.REACT_APP_API_URL
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const response = await axios
        .post(
          `${apiUrl}addEmpAbs`,absenseData,
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
        <p>الغيابات والاجازات الخاصة</p>
        <table>
          <tr>
              <th>مدته</th>
              <th>من</th>
              <th>الى</th>
              <th>أسبابه</th>
              <th></th>
          </tr>
          {Object.keys(absenseData).map((key, index) => (
          <tr key={index}>
              <td>
                <input type="text" value={absenseData[key].duration }
                onChange={(e) => handleInputChange(e.target.value, "duration", index)} required/>
              </td>
              <td>
                <DatePiker
                  datee={absenseData[key].from}
                  setDate={(date) => handleDateChange(date, index,"from")}
                />
              </td>
              <td>
                <DatePiker
                  datee={absenseData[key].to}
                  setDate={(date) => handleDateChange(date, index,"to")}
                />
              </td>
              <td>
                <textarea  value={absenseData[key].reason}
                onChange={(e) => handleInputChange(e.target.value, "reason", index)} required>
                </textarea>
              </td>
              <td>
                <button disabled={Object.keys(absenseData).length === 1} onClick={() => handleDelete(index)}>
                  <DeleteOutlineIcon  className="text-red-600"/>
                </button>
              </td>
          </tr>
          ))}

          <button
          onClick={() => {
          setAbsenseData((prevData) => ({
            ...prevData,
            [`abs${ Object.keys(absenseData).length + 1}`]: { emp_id:emp_id, from: " ",to:"", reason:"",duration: "" },
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

export default Absense;