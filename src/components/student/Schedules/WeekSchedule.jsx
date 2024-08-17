import { React ,useState ,useEffect ,useContext } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ResponsiveDateTimePickers from "../../Date/DateTimePic";
import axios from "axios";
import { PopUp } from "../../../App";

export const WeekSchedule =(props) => {

    const { click ,tclick , setclick} = useContext(PopUp);
    const [data , setData] = useState({});
    const [formData,setFormData] = useState({});
    const [error , setError] = useState('')
    const[day,setDay] = useState('الاحد')
    const[period,setperiod] = useState(1)
    const[changeDay,setChangeDay] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("token")

    useEffect(()=>{
        const getData = async () => {
        // setclick([0,0,0,0,0,1])
        
        try {
            console.log("a")
            console.log(day)
        const response = await axios.post(
            `${apiUrl}/showWeekSchedule`,{
                class_id :"66ad42c654ed758ed6e2420b",
                day :day
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

    console.log(day)
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
    return(
        <div >
            <h2 className="text-l text-center mt-6">برنامج الاسبوع</h2>
            <ul className="flex gap-2  w-fit my-5 mx-auto  rounded-full text-white bg-cyan-600" >
                <li><button className="px-2 py-2 rounded-full duration-500 bg-cyan-800" onClick={setProgDay}>الاحد</button></li>
                <li><button className="px-2 py-2 rounded-full duration-500" onClick={setProgDay}>الاثنين</button></li>
                <li><button className="px-2 py-2 rounded-full duration-500" onClick={setProgDay}>الثلاثاء</button></li>
                <li><button className="px-2 py-2 rounded-full duration-500" onClick={setProgDay}>الاربعاء</button></li>
                <li><button className="px-2 py-2 rounded-full duration-500" onClick={setProgDay}>الخميس</button></li>
            </ul>
            <div className="flex max-h-[90vh] overflow-auto flex bg-white p-12 text-[13px] justify-between addClassmate gap-4">
            <div className="basis-1/3 " style={{direction:"rtl"}}>
                <form onSubmit={handleAddToProgram}>
                <label>المادة</label><br/>
                <input type="text" placeholder="الحصة الدرسية" className="w-full" name="name" required onChange={handleInputChange}/><br/>
                <label>الحصة</label><br/>
                <ul className="flex gap-2 lessons">
                    <li className="text-white bg-sky-400 bg-sky-700 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>1</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>2</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>3</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>4</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>5</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>6</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>7</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl cursor-pointer" onClick={setPeriod}>8</li>
                </ul>
                <label>الاستاذ</label><br/>
                <input type="text" className="w-full" name="teacher" required placeholder="المدرس" value={formData.teacher} onChange={handleInputChange}/><br/>
                {/* <label>الوقت والتاريخ</label>
                <ResponsiveDateTimePickers/> */}

                <button className="adding mx-auto" onClick={(e)=>handleAddToProgram}>إضافة</button>
                </form>
            </div>
            {data[0]&&
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
        
                
            </div>}
        </div>
        {/* <button style={{padding: "10px 20px",color:"white",backgroundColor:"green",borderRadius:"12px",display:"block",margin: "-15px  auto 10px"}}>حفظ</button> */}
        </div>
    )
}