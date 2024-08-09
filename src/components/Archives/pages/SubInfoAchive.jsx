import { React , useState ,useEffect,createContext } from "react";
import { Navigate, useNavigate,useLocation } from "react-router-dom";
import Qualifications from "../Qualifications";
import Courses from "../Courses";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Successimg from "../../../assets/pngwing.com.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

export const PopUp = createContext(null);


const SubInfoArchive =() => {

    const navigate = useNavigate();
    const location = useLocation();
    const[emp_id,setEmpId]=useState(location.state.empid);
    const[Data,setData] = useState(location.state.data);

    const [click, setclick] = useState([0, 0, 0, 0,0]);
    const [tClick, setTClick] = useState([1, 0, 0, 0,0]);

    return(
        
        <div className="registeration">
            <div className="container">
                <span className="arrowBack" onClick={()=>navigate(-1)}>
                    <ArrowForwardIcon fontSize="small"/>رجوع 
                </span>
                <PopUp.Provider value={{ tClick, setTClick, setclick }}>
                {Data ? 
                <Qualifications empid={emp_id} data={Data}/> :
                <Qualifications empid={emp_id} />
                }
                {Data ? 
                <Courses empid={emp_id} data={Data}/> :
                <Courses empid={emp_id} />
                }
                
                <button className="next-buttons" 
                    onClick={()=>navigate("/archive/part3", { state: {  empid: emp_id ,data: Data } })} >
                    <span>المزيد </span>
                </button>
                </PopUp.Provider>
            
            </div>

            {click[0] ? (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="fixed top-0 left-0 w-full h-screen bg-black/50"
                    >
                    <div className=" relative container bg-white p-2 w-[90%] md:w-2/3 shadow-md  rounded-md mx-auto top-1/2 -translate-y-1/2">
                        <div
                        className="absolute top-2 right-2 text-black/70 cursor-pointer rounded-full"
                        onClick={() => {
                            setclick([0, 0, 0, 0]);
                            setTClick([1, 0, 0, 0]);
                        }}
                        >
                        <IoIosCloseCircleOutline size={35} />
                        </div>
                        <div className="max-h-[90vh] ">
                            {click[4] ? (
                            <div>
                                <img src={Successimg} className="mx-auto w-48"/>
                                <p className="font-extrabold text-2xl text-center">
                                    تم الحفظ بنجاح
                                </p>
                            </div>
                            ) : null}
                        </div>
                    </div>
                    </motion.div>
                ) : null}
        </div>
    )
}

export default SubInfoArchive;