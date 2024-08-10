import { React ,useState ,useEffect ,useContext } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ResponsiveDateTimePickers from "../Date/DateTimePic";
import DatePiker from "../Date/DatePiker";
import axios from "axios";
import { PopUp } from "../../App";

export const ExamSchedule =(props) => {

    const { click ,tclick , setclick} = useContext(PopUp);
    const [data , setData] = useState({});
    const [formData,setFormData] = useState({});
    const [error , setError] = useState('')
    const[date,setDate] = useState()
    const[time,settime] = useState()
    const[period,setperiod] = useState(1)
    const[changeDay,setChangeDay] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("token")

    useEffect(()=>{
        const getData = async () => {
        // setclick([0,0,0,0,0,1])
        
        try {
            console.log("a")
            // console.log(day)
        const response = await axios.post(
            `${apiUrl}/showExamSchedule`,{
                class_id :"66ad42c654ed758ed6e2420b",
            },
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
        console.log("alo")
        setData(response.data.data)
        }
        
        }
        catch(e){
        setError(e.message)
        console.log(e)
        }
    }
    getData();
    },[changeDay])

    function setProgDay(e) {
        setChangeDay(!changeDay)
        setDay(e.target.innerText)
        let days = document.querySelectorAll("ul li button")
        for(let i=0;i<days.length;i++){
            days[i].classList.remove("bg-cyan-800")
        }
        e.target.classList.add("bg-cyan-800")
        
    }
    function setPeriod(e) {
        setperiod(e.target.innerText)
        let periods = document.querySelectorAll(".lessons li")
        for(let i=0;i<periods.length;i++){
            periods[i].classList.remove("bg-sky-700")
        }
        e.target.classList.add("bg-sky-700")
        
    }
    const handleInputChange =(event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }
    console.log(formData)
    console.log(data)

    // console.log(day)
    const handleAddToProgram = async(e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            day : day,
            class_id :"66ad42c654ed758ed6e2420b",
            order: period
        })
        
        try {
            // setclick([0,0,0,0,0,1])
        const response = await axios.post(
            `${apiUrl}/addWeekSchedule`,formData,
            {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        
        console.log(response)
        if(response.data.status) {
            setChangeDay(!changeDay)
            setFormData({})
            // setclick([0,0,0,0,1]);
            // setMessage(response.data.message)
        }
        console.log(formData)
        }
    
        catch(e) {
            // setclick([0])
            console.log(e)
    }
    }
    console.log(formData)
    console.log(date)
    console.log(time)
    return(
        <div >
            <h2 className="text-l text-center mt-6">برنامج الامتحان</h2>
            <div className="flex max-h-[90vh] overflow-auto flex bg-white p-12 text-[13px] justify-between addClassmate gap-4">
            <div className="basis-1/3 " style={{direction:"rtl"}}>
                <form onSubmit={handleAddToProgram}>
                <label>المادة</label><br/>
                <input type="text" placeholder="الحصة الدرسية" className="w-full" name="name" required onChange={handleInputChange}/><br/>
                <label>التاريخ</label><br/>
                <DatePiker datee={date} setDate={setDate}/>
                
                <label>الوقت</label>
                <ResponsiveDateTimePickers time={time} setTime={settime}/>

                <button className="adding mx-auto" onClick={(e)=>handleAddToProgram}>إضافة</button>
                </form>
            </div>
            {/* {data[0]&&
            <div className="flex basis-2/3 justify-around flex-wrap">
                {data.map((item,index) => (
                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate w-40" key={index} >
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="mt-2.5 mb-3.5">الحصة :{item.order}</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">أ : </span>{item.teacher}</p>
                    <div className="absolute top-1 left-1">
                        <ClearIcon/><br/>
                        <EditIcon/>
                    </div>
                </div>
                ))}
        
                
            </div>} */}
        </div>
        {/* <button style={{padding: "10px 20px",color:"white",backgroundColor:"green",borderRadius:"12px",display:"block",margin: "-15px  auto 10px"}}>حفظ</button> */}
        </div>
    )
}