import { React, useState ,useEffect ,useContext} from "react";
import DatePiker from "../Date/DatePiker";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { PopUp } from "./pages/SubInfoAchive";

const Qualifications = (props) => {

  const token = localStorage.getItem("token");

  const [qualificationsData, setQualificationsData] = useState({});
  const [emp_id,setEmpId] = useState();

  const { setclick } = useContext(PopUp);


  useEffect(()=> {

    if(props.data && props.data.emp_qualifications.length !==0){
      setEmpId(props.data.emp_qualifications[0].emp_id);
        const transformedData = props.data.emp_qualifications.reduce((acc, cur, index) => {
          acc[`qua${index + 1}`] = cur;
          return acc;
      }, {});
      setQualificationsData(transformedData);
      
    }
    else {
      setQualificationsData({qua1: { name: "", emp_id: props.empid, resource: "", date: "",note: "" },});
      setEmpId(props.empid); 
    }
},[props.empid ,props.data]);

  const handleInputChange = (value, field, index) => {
    const newData = { ...qualificationsData };
    newData[`qua${index + 1}`][field] = value;
    setQualificationsData(newData);
  };

  const handleDateChange = (date, index) => {
    const newData = { ...qualificationsData };
    newData[`qua${index + 1}`].date = date;
    setQualificationsData(newData);
  };

  const handleDelete = (index) => {
    setQualificationsData(prevData => {
  
      const newData = { ...prevData };
      delete newData[`qua${index + 1}`];
      Object.keys(newData).forEach((key, i) => {
        if (i >= index) {
          const newKey = `qua${i + 1}`;
          if (key !== newKey) {
            newData[newKey] = newData[key];
            delete newData[key];
          }
        }
      });
  
      return newData;
    });
  };
  const apiUrl = process.env.REACT_APP_API_URL
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
      .post(
        `${apiUrl}addEmpQua`,qualificationsData,
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
    


  return (
    <div className="coursesQulificationSection">
      <p>المؤهلات العلمية</p>
      <form onSubmit={handleSave}>
      <table className="w-full relative">
        <tr>
          <th>المؤهل العلمي</th>
          <th>مصدره</th>
          <th>تاريخ الحصول عليه</th>
          <th>الملاحظات</th>
          <th></th>
        </tr>
        {Object.keys(qualificationsData).map((key, index) => (
          <tr key={index}>
            <td style={{ position: "relative" }}>
              <textarea
                value={qualificationsData[key].name} required
                onChange={(e) => handleInputChange(e.target.value, "name", index)}
              ></textarea>
              <br />
            </td>
            <td>
              <textarea
                value={qualificationsData[key].resource} required
                onChange={(e) => handleInputChange(e.target.value, "resource", index)}
              ></textarea>
            </td>
            <td>
              <DatePiker
                datee={qualificationsData[key].date}
                setDate={(date) => handleDateChange(date, index)}
              />
            </td>
            <td>
              <textarea
                value={qualificationsData[key].note} required
                onChange={(e) => handleInputChange(e.target.value, "note", index)}
              ></textarea>
            </td>
            <td>
              <button disabled={Object.keys(qualificationsData).length === 1} onClick={() => handleDelete(index)}>
                <DeleteOutlineIcon  className="text-red-600"/>
              </button>
            </td>
          </tr>
        ))}
        <button
        onClick={() => {
          setQualificationsData((prevData) => ({
            ...prevData,
            [`qua${ Object.keys(qualificationsData).length + 1}`]: { name: "", emp_id: emp_id, resource: "", date: "" ,note:""},
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
  );
};

export default Qualifications;
