import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../../App";
import axios from "axios";

export const StudentViolation =(props) => {

    const { click ,tclick , setclick} = useContext(PopUp);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    
    const [formData,setFormData] = useState();
    const [date,setDate] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/addStudentAbsence`,{
                student_id : '66ad442007042ce972c0a0d0',
                date : date,
                delay_time : formData
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

console.log(date)
    return(
        <div>
            <div>
                {/* <h2 className="text-center text-l mt-6">إضافة فعالية</h2> */}
                <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu">
                    {props.name ==="adding" ? (
                    <form onSubmit={handleSubmit}>
                        <ResponsiveDatePickers datee={date} setDate={setDate} />
                        <input type="text" placeholder="مدة التأخير ازا كان متأخراً" className="w-full" name="delay-time" onChange={(e)=>setFormData(e.value)} /><br/>
                        <button onClick={(e)=>handleSubmit} className="adding mx-auto mt-4">إضافة</button>
                    </form> )
                    :(
                        <div>
                        </div>
                    )
                    }
                </div>
            </div>

        </div>
    )
}