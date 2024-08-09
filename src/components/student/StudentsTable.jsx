import {React,useState,useEffect,useContext} from "react";
import SearchIcon from '@mui/icons-material/Search';
import { PopUp } from "../../App";
import axios from "axios";

export const StudentsTable =() => {

  const { click ,tclick , setclick} = useContext(PopUp);
  const[classes,setClasses] = useState({});
  const[students,setStudents] = useState({});
  const[searchData,setSearchData] = useState({});
  const[error,setError] = useState("")
  const token = localStorage.getItem("token")    
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(()=>{
      const getData = async () => {
      try {
      const response = await axios.get(
          `${apiUrl}/showClasses`,
          {
          headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
          },
          }
      );
      console.log(response)
      setClasses(response.data.data)
      }
      catch(e){
      setError(e.message)
      }
  }
  getData();
  },[])
  useEffect(()=>{
    const getData = async () => {
    try {
    const response = await axios.post(
        `${apiUrl}/searchStudent`,searchData,
        {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        }
    );
    console.log(response)
    setClasses(response.data.data)
    }
    catch(e){
    setError(e.message)
    console.log(e)
    }
}
getData();
},[searchData])

  const handleInputChange = (event) => {
    console.log("A")
    setSearchData({
    ...searchData,
    [event.target.name]: event.target.value,
    
    });
    
};
console.log(searchData)

    return(
        <div>
        {classes[0]&&<select className="" name="class_id" onChange={handleInputChange} >
          <option value="">اختر</option>
          {classes.map((item, index) => (
              <option key={index} value={item._id}>{item.name} {item.section}</option>
          ))}
        </select>}
            <div className="chooseTable p-2 mx-2">
                
            <div className="tableEmp bg-white border shadow rounded-[7px] px-10 py-8  w-full" >
            <div>
              <input type="text" placeholder="serach" name="name" className="border shadow rounded-[5px] p-2"onChange={handleInputChange}/>
              <button className="py-2 px-8 mx-2 shadow">برنامج الاسبوع</button>
              <button className="py-2 px-8 mx-2 shadow">برنامج الامتحان</button>
              <button className="py-2 px-8 mx-2 shadow">الملفات</button>
            </div>
      <div className="header grid grid-cols-5  py-4 font-bold">
        <h2>اسم الطالب</h2>
        <h2>اسم الأب</h2>
        <h2>اسم الأم</h2>
        <h2>الصف</h2>
        <h2>الشعبة</h2>
      </div>
      <div className="max-h-72 overflow-auto">
        {/* {data.map((content) => ( */}
          <div
            // key={content._id}
            className="header grid grid-cols-5 border-b py-4 mt-2 emp_content hover:bg-gray-100 "
          >
            <h2>احمد نعمه</h2>
            <h2>باسل</h2>
            <h2>هدى</h2>
            <h2>hgshfu</h2>
            <h2>23</h2>
          </div>
          <div
            // key={content._id}
            className="header grid grid-cols-5 border-b py-4 mt-2 emp_content hover:bg-gray-100 "
          >
            <h2>احمد نعمه</h2>
            <h2>باسل</h2>
            <h2>هدى</h2>
            <h2>hgshfu</h2>
            <h2>23</h2>
          </div>
        {/* ))} */}
      </div>
      
    </div>

            </div>
        </div>
    )
} 
