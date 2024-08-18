import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { PopUp } from "../../App";
import CloseIcon from "@mui/icons-material/Close";
import ShowAdminForClasses from "./adminForClass/ShowAdminForClasses";
import ShowClasses from "./classSetting/ShowClasses";
import PromotionClasses from "./PromotionClasses";

const Setting = () => {
  const token = localStorage.getItem("role");

  const [state, setState] = useState([false, false, false, false]);
  return (
    <div className="container">
      <div className="p=10 my-10 lg:mr-32 ml-10 ">
        <h1 className=" font-bold text-xl my-10">اعدادات</h1>
        <ShowAdminForClasses state={state} setState={setState} />
        <ShowClasses state={state} setState={setState} />
        {token === "مدير" && <PromotionClasses />}
      </div>
    </div>
  );
};

export default Setting;
