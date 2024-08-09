import { React ,useState ,useEffect ,useContext } from "react";
import axios from "axios";
import { PopUp } from "../../App";


export const AddStu =() => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [message , setMessage] = useState("")
    const [classes, setClasses] = useState({});
    const token = localStorage.getItem("token")

    const { click ,tclick , setclick} = useContext(PopUp);

    const handleInputChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
        console.log(formData)
    };

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
        setClasses(response.data.data)
        }
        catch(e){
        setError(e.message)
        }
    }
    getData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/addStudent`,formData,
            {
            headers: {
                Accept: "application/json",
            },
            }
        );
        console.log(response)
        if(response.data.status) {
            setclick([0,0,0,0,1])
            setMessage(response.data.message)
        }
        }
        catch(e) {
            setclick([0])
            console.log(e)
        }
    }
    console.log(classes)
    return(
        <div >
            <h2 className="text-center text-l mt-6">إضافة طالب</h2>
            <form onSubmit={handleSubmit}>
            <div className="flex max-h-[90vh] overflow-auto flex gap-10 flex-wrap bg-white pt-12 px-12 pb-6 text-[13px] justify-between addstu">
                <div className="basis-2/5">
                    <label>الاسم الكامل</label><br/>
                    <input type="text" placeholder="اسم الطالب" className="w-full" name="full_name" required onChange={handleInputChange}/><br/>
                    <label>مكان وناريخ الولادة</label>
                    <div className="flex gap-3 w-full">
                            <input type="date"  name="birth_date" onChange={handleInputChange} required/>
                            <input type="text"  name="birth_place" placeholder="مكان الولادة" required onChange={handleInputChange}/>
                    </div>
                    <label>رقم الهاتف</label><br/>
                    <input type="tel" className="w-full" placeholder="011......"  name="tele_num" pattern="[1-9]+" required onChange={handleInputChange}/><br/>
                    <label>تاريخ الانضمام إلى الثانوية</label><br/>
                    <input type="date" name="join_date" onChange={handleInputChange} required/>
                </div>
                <div className="basis-2/5">
                <div className="flex w-full gap-3">
                    <div>
                    <label>اسم الأب</label><br/>
                    <input type="text" placeholder="اسم والده"  name="father_name" required onChange={handleInputChange}/><br/>
                    </div>
                    <div>
                    <label>اسم الأم</label><br/>
                    <input type="text" placeholder="اسم والدته" name="mother_name" required onChange={handleInputChange}/><br/>
                    </div>
                    </div>
                    <label>رقم الجوال</label><br/>
                    <input type="tel" placeholder="09......" className="w-full" required name="mobile_num" pattern="[1-9]+" onChange={handleInputChange}/><br/>
                    <div className="basis-2/5">
                        <label>الصف</label><br/>
                        {classes[0]&&<select className="text-green-300" name="class_id" onChange={handleInputChange} >
                            {classes.map((item, index) => (
                                <option key={index} value={item._id}>{item.name} {item.section}</option>
                            ))}
                        </select>}
                    </div>
                    <label>العنوان</label><br/>
                    <textarea  className="w-full" placeholder="العنوان بالتفصيل" required name="address" onChange={handleInputChange} ></textarea>
                    
                </div>
                
            </div>
            <button onClick={(e)=>handleSubmit} className="adding mx-auto">إضافة</button>
            </form>
        <p className="text-center text-green-200">{message}</p>
        
        </div>
    )
}