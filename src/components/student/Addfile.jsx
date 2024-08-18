import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../App";
import axios from "axios";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const Addfile =() => {

    const { click ,tclick , setclick} = useContext(PopUp);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    
    const [formData,setFormData] = useState({});
    const [data,setData] = useState({});
    const [message,setMessage] = useState("");
    const [error,setError] = useState("")
    const [file , setFile] = useState(null)
    const[classes,setClasses] = useState({});
    const[class_id,setClass_id] = useState("");
    const [subject,setSubject] = useState({});

    
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
        setClasses(response.data.data);
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
            `${apiUrl}/showStudentsAndSubjectForClass`,{class_id:class_id},
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

        }
        catch(e){
            console.log(e)
        setError(e.message)
        }
    }
    getData();
    },[class_id])

    useEffect(()=>{
        const getData = async () => {
            // setclick([0,0,0,0,0,1])
        try {
        const response = await axios.get(
            `${apiUrl}/showFiles`,
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
    },[])
    console.log(data)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("file", file); 
    
        formDataToSend.append("class_id[0]", class_id); 
    
        // Appending other form data
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        try {
            const response = await axios.post(
                `${apiUrl}/addFile`,
                formDataToSend,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if(response.data.status) {
                setMessage(response.data.message);
            }
        } catch(e) {
            console.log(e);
        }
    };
    
    const handleInputChange = (event) => {
        if(event.target.name === "file") {
            console.log("aa")
            setFile(event.target.files[0]);
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }
    };
    
console.log(file)
    console.log(formData)

    return(
        <div>
            <div>
                <h2 className="text-center text-l mt-6">إضافة ملف</h2>
                <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu flex gap-8">
                    
                        {/* <div> */}
                        <form onSubmit={handleSubmit} className="basis-1/3">
                            <label>اسم الملف</label><br/>
                            <input type="text" placeholder="اسم الملف" className="w-full" name="name" required onChange={handleInputChange} /><br/>
                            <label>الصف</label><br/>
                            <select className="w-40" name="class_id" onChange={(e)=>setClass_id(e.target.value)} >
                                <option value="">اختر</option>
                                {classes[0]&&classes.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name} {item.section}</option>
                                ))}
                            </select>
                            <label>المادة</label><br/>
                            <select className="w-40" name="subject_id" onChange={handleInputChange}>
                                <option value="">اختر</option>
                                {subject[0]&&subject.map((item,index)=>(
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                            <label>الملف</label><br/>
                            <input type="file" className="w-full" name="file" onChange={handleInputChange}/><br/>
                            <button onClick={(e)=>handleSubmit} className="adding mx-auto mt-7">إضافة</button>
                        </form>
                        {/* </div> */}
                        {data[0]&&<div className="basis-2/3 justify-between border-r-2 p-2" style={{direction:"ltr"}}>
                            {data.map((item,index) => (
                                <div className="flex justify-between items-center p-4 border-b">
                                <h2><InsertDriveFileIcon/>{item.name}</h2>
                                <h2>{item.subject_id.name}</h2>
                                <h2>
                                {item.classes_id.map((item1,index1)=>(
                                    <h2>{item1.name} {item1.section}</h2>
                                ))}
                                </h2>
                                
                                <h2></h2>
                                <a href={item.url}><FileDownloadIcon/></a>
                            </div>
                            ))}
                            
                        </div>}
                        
                </div>
            </div>

        </div>
    )
}