import { React, useState, useEffect, useContext} from "react";
import DatePiker from "../Date/DatePiker";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

export const AddGrade =() => {

    const [formData, setFormData] = useState({
        subject_id :"",
        type :"",
        date :0,
        full_mark :""
    });
    const [studentMarks , setStudentMarks] = useState([])
    const [error, setError] = useState("");
    const [message , setMessage] = useState("")
    const [studetns, setStudents] = useState({});
    const [subject,setSubject] = useState({});
    const token = localStorage.getItem("token")

    const handleSelctionChange = (event) => {
            console.log(event)

            setFormData({
                ...formData,
                [event.target.name] : event.target.value
            })
        console.log(formData)
    };
//     const handleMarksChange = (id) => {
//         console.log(id)
        
//             // setStudentMarks({
//             // ...studentMarks,
//             // id: id,
//             // mark: event.target.value
            
//             // });
//             // setStudentMarks(prevMarks => 
//             //     prevMarks.map(student =>
//             //         student.id === id ? { ...student, mark: event.target.value } : "a"
//             //     )
//             // );
//             // const handleMarksChange = (id, event) => {
//                 const newMark = event.target.value;
//                 setStudentMarks(prevMarks => 
//                     prevMarks.map(student =>
//                         student.id === id ? { ...student, mark: newMark } : student
//                     )
//                 );
//             // };
//             console.log(studentMarks)
        
// };
const handleMarksChange = (id) => {
    const newMark = event.target.value;
    
    setStudentMarks(prevMarks => {
        // Check if the student already exists
        const studentExists = prevMarks.some(student => student.id === id);
        
        if (studentExists) {
            // Update existing student's mark
            return prevMarks.map(student =>
                student.id === id ? { ...student, mark: newMark } : student
            );
        } else {
            // Add new student object
            return [...prevMarks, { id: id, mark: newMark }];
        }
    });
};

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        const getData = async () => {
        try {
        const response = await axios.post(
            `${apiUrl}/showStudentsAndSubjectForClass`,{class_id:"66ad42c654ed758ed6e24208"},
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        console.log(response)
        // console.log(response1)
        setSubject(response.data.subject)
        setStudents(response.data.students)
        }
        catch(e){
            console.log("erroe")
        setError(e.message)
        }
    }
    getData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setclick([1,0,0,0,0])
        // console.log(studentMarks)
        // console.log(e)
        setFormData({
            ...formData,
            ["students"]: studentMarks,
            });
    
        try {
        const response = await axios.post(
            `${apiUrl}/addStudentsMarks`,formData,
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        console.log(response)
        if(response.data.status===200) {
            setMessage(response.data.message)
        }
        }
        catch(e) {
            console.log(e)
        }
    }
    // console.log(classes)
    console.log(formData)


    return(
        <div>
            <h2 className="text-center text-l mt-6">إضافة نتائج</h2>
            <form>
                <div className=" bg-white p-12 text-[13px] ">
                    <div className="flex items-center flex-wrap addGradeSelectData gap-4" style={{direction:'rtl'}}>
                    <select name="">
                        <option>السابع</option>
                        <option>التامن</option>
                    </select>
                    <select name="type" onChange={handleSelctionChange}>
                        <option>امتحان</option>
                        <option>مذاكرة</option>
                        <option>شفهي</option>
                    </select>
                    {subject[0]&&<select name="subject_id" onChange={handleSelctionChange}>
                        {subject.map((item,index)=>(
                            <option key={index} d="dd" value={item._id}>{item.name}</option>
                        ))}
                    </select>}
                    <input type="number" placeholder="العلامة الكاملة" className="w-24" name="full_mark" onChange={handleSelctionChange}/>
                    <input type="date" name="date" onChange={handleSelctionChange}/>
                </div>
                {studetns[0]&&<div style={{marginBottom:"20px"}}>
                    <div className="flex p-3 border-b-2" >
                        <p className="w-1/2">اسم الطالب</p>
                        <p>الدرجة</p>
                    </div>
                    <div className="max-h-60 overflow-auto ">
                    {studetns.map((item,index)=>(
                        <div className="flex addGrade" key={index}>
                            <label className="w-1/2 py-2 px-3" key={index}>{item.full_name}</label>
                            <input type="number" className="w-24" onChange={()=>handleMarksChange(item._id)}/>
                        </div>
                    ))}
                    </div>
                </div>}
            </div>
            <button onClick={handleSubmit} 
            style={{padding: "10px 20px",color:"white",backgroundColor:"green",borderRadius:"12px",display:"block",margin: "-15px  auto 10px"}}>حفظ</button>
            </form>
        </div>
    )
}