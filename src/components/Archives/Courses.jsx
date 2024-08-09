import React, { useState ,useEffect ,useContext } from "react";
import DatePiker from "../Date/DatePiker";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { PopUp } from "./pages/SubInfoAchive";

const Courses = (props) => {

  const token = localStorage.getItem("token");


  const [coursesData, setCoursesData] = useState({});
  const [emp_id,setEmpId] = useState();

  const { setclick } = useContext(PopUp);

  useEffect(()=> {

    if(props.data && props.data.emp_courses.length != 0){
      setEmpId(props.data.emp_courses[0].emp_id);
      const transformedData = props.data.emp_courses.reduce((acc, cur, index) => {
        acc[`cor${index + 1}`] = cur;
        return acc;
      }, {});
      setCoursesData(transformedData);
    }
    else  {
      setCoursesData({cor1: { emp_id: props.empid, name: "", type: "", duration: "", date: "", place: "" },});
      setEmpId(props.empid);
    }
  },[props.empid ,props.data]);


  const handleInputChange = (value, field, index) => {
    const newData = { ...coursesData };
    newData[`cor${index + 1}`][field] = value;
    setCoursesData(newData);
  };

  const handleDateChange = (date, index) => {
    const newData = { ...coursesData };
    newData[`cor${index + 1}`].date = date;
    setCoursesData(newData);
  };

const handleDelete = (index) => {
  setCoursesData(prevCoursesData => {

    const newData = { ...prevCoursesData };
    delete newData[`cor${index + 1}`];
    Object.keys(newData).forEach((key, i) => {
      if (i >= index) {
        const newKey = `cor${i + 1}`;
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
        `${apiUrl}addEmpcourse`,coursesData,
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
      console.error( error);
    }
  };
    

  return (
    <div className="coursesQulificationSection">
      <p>الدورات التي اتبعها</p>
      <form onSubmit={handleSave}>
      <table className="relative w-full">
        <tr>
          <th>اسم الدورة</th>
          <th>نوعها</th>
          <th>مدتها</th>
          <th>مكانها</th>
          <th>تاريخها</th>
        </tr>
        {Object.keys(coursesData).map((key, index) => (
          <tr key={index}>
            <td style={{ position: "relative" }}>
              <textarea
                value={coursesData[key].name}
                onChange={(e) => handleInputChange(e.target.value, "name", index)} required
              ></textarea>
            </td>
            <td>
              <textarea
                value={coursesData[key].type} required
                onChange={(e) => handleInputChange(e.target.value, "type", index)}
              ></textarea>
            </td>
            <td>
              <textarea
                value={coursesData[key].duration} required
                onChange={(e) => handleInputChange(e.target.value, "duration", index)}
              ></textarea>
            </td>
            <td>
              <textarea 
                value={coursesData[key].place} required
                onChange={(e) => handleInputChange(e.target.value, "place", index)}
              ></textarea>
            </td>
            <td>
              <DatePiker
                datee={coursesData[key].date}
                setDate={(date) => handleDateChange(date, index)}
              />
            </td>
            <td>
            <button disabled={Object.keys(coursesData).length === 1} onClick={() => handleDelete(index)}>
                <DeleteOutlineIcon  className="text-red-600"/>
              </button>
            </td>
          </tr>
        ))}
        <button
        onClick={() => {
          setCoursesData((prevData) => ({
            ...prevData,
            [`cor${ Object.keys(coursesData).length + 1}`]: {emp_id: props.empid, name: "", type: "", duration: "", date: "", place: "" },
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

export default Courses;


