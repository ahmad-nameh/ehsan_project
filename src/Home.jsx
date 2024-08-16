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

import { useNavigate } from "react-router-dom";
import ShowTeachReq from "./components/TableShow/ShowTeachReq";
import ShowEmp from "./components/TableShow/ShowEmp";


export const PopUp = createContext(null);
function Home() {
  const [click, setclick] = useState([0, 0, 0, 0]);
  const [tClick, setTClick] = useState([1, 0, 0, 0]);
  const [table, setTable] = useState([1, 0, 0, 0]);
  const [idRq, setidRq] = useState(null);

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
            onClick={() => setclick([1, 1, 0, 0])}
          >
            <div className="absolute px-9 py-6 -top-4 -left-5 border border-gray-300 rounded-[20px] bg-white shadow ">
              <CiCirclePlus size={25} color="gray" />
            </div>
            <div className="text-left">
              <h2 className="text-[12px]">طلب تكليف بالتدريس</h2>
            </div>
            <div>
              <img className="w-[75px]" src={img3} alt="" />
            </div>
          </div>
          <div
            className="homeBtn relative cursor-pointer"
            onClick={() => setclick([1, 0, 1, 0])}
          >
            <div className="absolute px-9 py-6 -top-4 -left-5 border border-gray-300 rounded-[20px] bg-white shadow">
              <CiCirclePlus size={25} color="gray" />
            </div>
            <div className="text-left">
              <h2 className="text-[12px]">طلب تكليف بعمل ادراي</h2>
            </div>
            <div>
              <img className="w-[75px]" src={img2} alt="" />
            </div>
          </div>
          <div
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
            </div>
          </div>
        </div>
        <div className="chooseTable p-2 mx-9 flex gap-12 ">
          <button
            className={`btn ${table[0] ? "active" : ""}`}
            onClick={() => setTable([1, 0, 0, 0])}
          >
            طلبات التدريس
          </button>
          <button
            className={`btn ${table[1] ? "active" : ""}`}
            onClick={() => setTable([0, 1, 0, 0])}
          >
            طلبات التكليف
          </button>
          <button
            className={`btn ${table[2] ? "active" : ""}`}
            onClick={() => setTable([0, 0, 1, 0])}
          >
            الموظفين
          </button>
        </div>
        {table[0] ? (
          <ShowTeachReq />
        ) : table[1] ? (
          <TableEmp />
        ) : table[2] ? (
          <ShowEmp />
        )  
        : null}
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
            <PopUp.Provider
              value={{ tClick, setTClick, setclick, idRq, setidRq }}
            >
              <div className="max-h-[90vh] overflow-auto">
                {click[1] ? (
                  <TeachingRequest />
                ) : click[2] ? (
                  <EmpRequest />
                ) : null}
              </div>
            </PopUp.Provider>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

export default Home;
