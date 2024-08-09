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
    const [img , setImg] = useState(null)

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
        formDataToSend.append("photo", img);
    
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        try {
            setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/addEvent`,formDataToSend,
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        
        console.log(response)
        if(response.data.status) {
            setclick([0,0,0,0,1]);
            setMessage(response.data.message)
        }
        console.log(formDataToSend)
        }
    
        catch(e) {
            setclick([0])
            console.log(e)
    }
}
    const handleInputChange = (event) => {
        if(event.target.name == "photo") {
            console.log("imgs")
            setImg(event.target.files[0])
            console.log(img)
        }
        else{
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }
    };

    return(
        <div>
            <div>
                <h2 className="text-center text-l mt-6">إضافة ملف</h2>
                <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu flex gap-8">
                    
                        {/* <div> */}
                        <form onSubmit={handleSubmit} className="basis-1/3">
                            <label>اسم الملف</label><br/>
                            <input type="text" placeholder="فعالية" className="w-full" name="name" required onChange={handleInputChange} /><br/>
                            <label>الملف</label><br/>
                            <input type="file" placeholder="first name" className="w-full" name="photo" onChange={handleInputChange}/><br/>
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