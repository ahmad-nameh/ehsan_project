import {React,useState,useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { PopUp } from "../../App";
import axios from "axios";

export const StudentsTable =() => {

  const { click ,tclick , setclick} = useContext(PopUp);
  const[classes,setClasses] = useState({});
  const[students,setStudents] = useState({});
  const[searchData,setSearchData] = useState({});
  const[data,setData] = useState({});
  const[error,setError] = useState("")
  const token = localStorage.getItem("token")    
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

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
      setclick([0,0,0,0,0,1])
    const response = await axios.post(
        `${apiUrl}/searchStudent`,searchData,
        {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        }
    );
    if(response.data.status) {
      setclick([0])
      setData(response.data.data)
    }
    console.log(response)
    setClasses(response.data.data)
    }
    catch(e){
      setclick([0])
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

const goToStudentInfoPage = (studentId) => {
  navigate("/studentInfo",studentId);
}
console.log(searchData)

    return(
        <div>
        <select className="w-40" name="class_id" onChange={handleInputChange} >
          <option value="">اختر</option>
          {classes[0]&&classes.map((item, index) => (
              <option key={index} value={item._id}>{item.name} {item.section}</option>
          ))}
        </select>
            <div className="chooseTable p-2 mx-2">
                
            <div className="tableEmp bg-white border shadow rounded-[7px] px-10 py-8  w-full" >
            <div>
              <span className="relative">
                <input type="text" placeholder="بحث عن طالب" name="name" className="border shadow rounded-[5px] p-2"
                onChange={handleInputChange}
                />
                <SearchIcon className="absolute top-0 left-1 text-blue-500"/>
              </span>
              <button className="py-2 px-8 mx-2 shadow" 
              onClick={() => setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0, 1])}
              >برنامج الاسبوع</button>
              <button className="py-2 px-8 mx-2 shadow"
              onClick={() => setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 1])}
              >برنامج الامتحان</button>
              <button className="py-2 px-8 mx-2 shadow">الملفات</button>
            </div>
            <div className="header grid grid-cols-5  py-4 font-bold">
                  <h2>اسم الطالب</h2>
                  <h2>اسم الأب</h2>
                  <h2>اسم الأم</h2>
                  <h2>الصف</h2>
                  <h2>الشعبة</h2>
                </div>
            {data[0]&&
              <div className="max-h-64 overflow-auto">
                {data.map((item,index)=>(
                  <div className="header grid grid-cols-5 border-b py-3 mt-2 emp_content hover:bg-gray-100" key={index}
                  onClick={() => navigate("/studentInfo", { state: { studentId: item._id }})}>
                    <h2>{item.full_name}</h2>
                    <h2>{item.father_name}</h2>
                    <h2>{item.mother_name}</h2>
                    <h2>{item.class_id.name}</h2>
                    <h2>{item.class_id.section}</h2>
                  </div>
                ))}
                
            </div>}
      </div>
      
    </div>

            </div>
    )
} 
