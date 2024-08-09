import img3 from "./assets/3.png";
import img2 from "./assets/2.png";
import img1 from "./assets/1.png";
import { CiCirclePlus } from "react-icons/ci";
import TableEmp from "./components/TableShow/TableEmp";
import TeachingRequest from "./components/teachingRequest/TeachingRequest";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createContext, useState } from "react";
import EmpRequest from "./components/empRequest/EmpRequest";
import { motion } from "framer-motion";
import { React , useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowTeachReq from "./components/TableShow/ShowTeachReq";
import ShowEmp from "./components/TableShow/ShowEmp";
import ShowJoinToSystemRequest from "./components/TableShow/ShowJoinToSystemRequest ";
import { StudentsTable } from "./components/student/StudentsTable";
import { PopUp } from "./App";
import axios from "axios";



function Home2() {

  const { click ,tclick , setclick} = useContext(PopUp);



  const navigate = useNavigate();

  const goToArchiveClick = () => {
    navigate("/archive");
  };

  return (
    <div>
      <div className="home container w-2/3 text-[12px]">
        <div className="flex flex-col  items-center lg:flex-row gap-3 justify-around flex-wrap py-10 mt-11 mx-auto ">
          <div
            className="homeBtn relative cursor-pointer"
            onClick={() => setclick([0, 0, 0, 0, 0, 0,1])}
          >
            <div className="absolute px-9 py-6 -top-4 -left-5 border border-gray-300 rounded-[20px] bg-white shadow ">
              <CiCirclePlus size={25} color="gray" />
            </div>
            <div className="text-left">
              <h2 className="text-[12px]">اضافة طالب</h2>
            </div>
            <div>
              <img className="w-[75px]" src={img3} alt="" />
            </div>
          </div>
          <div
            className="homeBtn relative cursor-pointer"
            onClick={() => setclick([0, 0, 0, 0,0,0,0,0,1])}
          >
            <div className="absolute px-9 py-6 -top-4 -left-5 border border-gray-300 rounded-[20px] bg-white shadow">
              <CiCirclePlus size={25} color="gray" />
            </div>
            <div className="text-left">
              <h2 className="text-[12px]">اضافة نتيجة</h2>
            </div>
            <div>
              <img className="w-[75px]" src={img2} alt="" />
            </div>
          </div>
          {/* <div
            className="homeBtn relative cursor-pointer"
            onClick={() => goToArchiveClick()}
          >
            <div className="absolute px-9 py-6 -top-4 -left-5 border border-gray-300 rounded-[20px] bg-white shadow">
              <CiCirclePlus size={25} color="gray" />
            </div>
            <div className="text-left">
              <h2 className="text-[12px]">السجلات</h2>
            </div>
            <div>
              <img className="w-[75px]" src={img1} alt="" />
            </div> */}
          {/* </div> */}
        </div>

      <StudentsTable/>
    </div>
    </div>
  );
}

export default Home2;
