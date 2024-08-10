import React from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login&register/Login";
import MainInfoArchive from "./components/Archives/pages/MainInfoArchive";
import SubInfoArchive from "./components/Archives/pages/SubInfoAchive";
import SubInfoArchivePart2 from "./components/Archives/pages/SubInfoArchivePart2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ShowInfo from "./components/TableShow/ShowInfo";
import ShowInfo2 from "./components/TableShow/ShowInfo2";
import { createContext, useState } from "react";
import { motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import StudentInfo from "./components/student/StudentInfo";
import { AddStu } from "./components/student/AddStu";
import StudentGrade from "./components/student/StudentGrade";
import ResponsiveDatePickers from "./components/Date/DatePikerOpened";
import { AddEvent } from "./components/student/AddEvent";
import { AddGrade } from "./components/student/AddGrade";
import Home2 from "./Home2";
import { Prog } from "./components/student/WProgram";
import ShowJoinToSystemRequest from "./components/TableShow/ShowJoinToSystemRequest ";
import PopupWindow from "./components/student/popup/PopupWindow";
import Event from "./components/student/Event";
import Complaint from "./components/student/Complaint";

const PrivateRoute = ({ element: Component, ...rest }) => {
  // const isAuthenticated = localStorage.getItem("token");

  // return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  return <Component />;
};

export const PopUp = createContext(null);

const App = () => {
  const [click, setclick] = useState([0, 0, 0, 0, 0]);
  const [tClick, setTClick] = useState([1, 0, 0, 0, 0]);
  console.log(click);
  return (
    <div>
      <PopUp.Provider value={{ click, setTClick, setclick }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<PrivateRoute element={Home2} />} />
            <Route
              path="/archive"
              element={<PrivateRoute element={MainInfoArchive} />}
            />
            <Route
              path="/archive/part2"
              element={<PrivateRoute element={SubInfoArchive} />}
            />
            <Route
              path="/archive/part3"
              element={<PrivateRoute element={SubInfoArchivePart2} />}
            />
            <Route
              path="/showInfo"
              element={<PrivateRoute element={ShowInfo} />}
            />
            <Route
              path="/showInfo2"
              element={<PrivateRoute element={ShowInfo2} />}
            />
            <Route
              path="/join"
              element={<PrivateRoute element={ShowJoinToSystemRequest} />}
            />
            <Route path="/event" element={<PrivateRoute element={Event} />} />
            <Route
              path="/complaint"
              element={<PrivateRoute element={Complaint} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        {click[4] ? (
          <PopupWindow name="success" />
        ) : click[5] ? ( //Loading
          <PopupWindow name="loading" />
        ) : click[6] ? (
          <PopupWindow name="addStudent" />
        ) : click[7] ? (
          <PopupWindow name="addEvent" />
        ) : click[8] ? (
          <PopupWindow name="addGrade" />
        ) : // <PopupWindow name="addFile"/>
        null}
      </PopUp.Provider>
    </div>
  );
};

export default App;
