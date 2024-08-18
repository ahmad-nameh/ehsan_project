import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../../App";
import axios from "axios";
import DatePiker from "../../Date/DatePiker";
import CloseIcon from '@mui/icons-material/Close';


export const StudentViolation =(props) => {

    const { click ,tclick , setclick} = useContext(PopUp);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    
    const [formData,setFormData] = useState("");
    const [date,setDate] = useState("");
    const [violation,setViolation] = useState({})
    const [message,setMessage] = useState("");
    const [error,setError] = useState("")

    const[delEvent,setDelEvent] = useState(false)


    if(props.name != "adding") 
    { useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}/showStudentsViolation`,
                    { student_id: localStorage.getItem("student")},
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                if (response.data.status) {
                    console.log(response)
                    setViolation(response.data.data);
                }
            } catch (e) {
                setError(e.message);
                console.log(e);
            }
        };
        getData();
    }, [delEvent]);

    console.log(violation)
    console.log(localStorage.getItem("student"))


}

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/addStudentViolation`,{
                student_id : localStorage.getItem("student"),
                date : date,
                description : formData
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
            setclick([0,0,0,0,1]);
            setMessage(response.data.message)
        }
        }
    
        catch(e) {
            setclick([0])
            console.log(e)
    }
}
const handleDelEvent = async (id) => {
      
    try {
    const response = await axios.post(
        `${apiUrl}/deleteStudentViolation`,{
            'id' : id
        },
        {
        headers: {
            Accept: "application/json",
        },
        }
    );
    setDelEvent(!delEvent);
    console.log(response)
    if(response.data.status===200) {
        setMessage(response.data.message)
    }
    }
    catch(e) {
        console.log(e)
    }
}
console.log(violation)
console.log(localStorage.getItem("student"))
    return(
        <div>
            <div>
                {/* <h2 className="text-center text-l mt-6">إضافة فعالية</h2> */}
                <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu">
                    {props.name ==="adding" ? (
                    <form onSubmit={handleSubmit}>
                        <label>تاريخ المخالفة</label><br/>
                        <DatePiker datee={date} setDate={setDate} />
                        <label>سببها</label><br/>
                        <textarea name="description" required placeholder="سبب المخالفة" className="w-full" onChange={(e)=>setFormData(e.target.value)}></textarea>
                        <button onClick={(e)=>handleSubmit} className="adding mx-auto mt-4">إضافة</button>
                    </form> )
                    :(
                        <div>
                        {violation[0] && (
                        <div>
                            <div className="flex text-xl mb-5 gap-4">
                                <h2 className="">المخالفات : </h2>
                                <p>{violation.length}</p>
                            </div>
                            {violation.map((item, index) => (
                                <div key={index} className="infoShow1 gap-11 items-center">
                                <div>
                                    <p>{item.description}</p>
                                    <p>{item.date}</p>
                                </div>
                                <button className="text-red-500" onClick={()=>handleDelEvent(item._id)}>
                                    <CloseIcon/>
                                </button>
                            </div>
                            ))}
                        </div>
                )}
                        </div>
                    )
                    }
                </div>
            </div>

        </div>
    )
}