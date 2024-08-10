import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { PopUp } from "../../App";
import CloseIcon from "@mui/icons-material/Close";
import ShowAdminForClasses from "./adminForClass/ShowAdminForClasses";
import ShowClasses from "./classSetting/ShowClasses";

const Setting = () => {
  return (
    <div className="container">
      <div className="p=10 mt-7 lg:mr-32 ml-10">
        <h1 className=" font-bold text-xl my-10">اعدادات</h1>
        <ShowAdminForClasses />
        <ShowClasses />
      </div>
    </div>
  );
};

export default Setting;
