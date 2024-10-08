import { React, useContext } from "react";
import { PopUp } from "../../../App";
import { motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AddStu } from "../AddStu";
import { AddEvent } from "../../Event/AddEvent";
import { AddGrade } from "../AddGrade";
import { Addfile } from "../Addfile";
import Successimg from "../../../assets/pngwing.com.png";
import { AddAdminForClass } from "../adminForClass/AddAdminForClass";
import { AddClass } from "../classSetting/AddClass";
import { WeekSchedule } from "../Schedules/WeekSchedule";
import { ExamSchedule } from "../Schedules/ExamSchedule";
import { StudentAbsense } from "../StudentDetailsPage/StudentAbsense";
import { StudentViolation } from "../StudentDetailsPage/StudentViolation";
import ShowFile from "../ShowFile";

const PopupWindow = (props) => {
  const { click, tclick, setclick } = useContext(PopUp);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="fixed top-0 left-0 w-full h-screen bg-black/50 z-10"
      >
        {props.name === "loading" ? (
          <div
            className=" relative container bg-white p-6 z-10 w-[90%] md:w-1/3 shadow-md  
              rounded-md mx-auto top-1/2 -translate-y-1/2"
          >
            <div className="loader mx-auto"></div>
            <p className="mx-auto w-fit mt-8">يرجى الانتظار</p>
          </div>
        ) : props.name === "success" ? (
          <div
            className=" relative container bg-white p-6 z-10 w-[90%] md:w-1/3 shadow-md  
          rounded-md mx-auto top-1/2 -translate-y-1/2"
          >
            <div>
              <div
                className="absolute top-2 right-2 text-black/70 cursor-pointer rounded-full"
                onClick={() => {
                  setclick([0, 0, 0, 0]);
                }}
              >
                <IoIosCloseCircleOutline size={35} />
              </div>
              <img src={Successimg} className="w-48 mx-auto" />
              <p className="font-extrabold text-2xl text-center">
                تم الحفظ بنجاح
              </p>
            </div>
          </div>
        ) : props.name === "error" ? (
          <div className="max-h-[90vh] ">
            <div>
              <p className="font-extrabold text-red text-2xl text-center">
                {props.errorMessage}
              </p>
            </div>
          </div>
        ) : (
          <div
            className=" relative container bg-white p-2 w-fit shadow-md 
              rounded-md mx-auto top-1/2 -translate-y-1/2"
          >
            <div
              className="absolute top-2 right-2 text-black/70 cursor-pointer rounded-full"
              onClick={() => {
                setclick([0, 0, 0, 0]);
              }}
            >
              <IoIosCloseCircleOutline size={35} />
            </div>
            {props.name === "addStudent" ? (
              <AddStu />
            ) : props.name === "addEvent" ? (
              <AddEvent />
            ) : props.name === "weeklySchedule" ? (
              <WeekSchedule />
            ) : props.name === "examSchedule" ? (
              <ExamSchedule />
            ) : props.name === "addGrade" ? (
              <AddGrade />
            ) : props.name === "addAdminForClass" ? (
              <AddAdminForClass />
            ) : props.name === "AddClass" ? (
              <AddClass />
            ) : props.name === "addFile" ? (
              <Addfile />
            ) : props.name === "showFile" ? (
              <ShowFile />
            ) : props.name === "studentAbsense" && props.type === "adding" ? (
              <StudentAbsense name="adding" />
            ) : props.name === "studentAbsense" ? (
              <StudentAbsense />
            ) : props.name === "studentViolation" && props.type === "adding" ? (
              <StudentViolation name="adding" />
            ) : props.name === "studentViolation" ? (
              <StudentViolation />
            ) : null}
          </div>
        )}
      </motion.div>
    </div>
  );
};
export default PopupWindow;
