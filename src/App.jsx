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
import Home2 from "./Home2";

import StudentInfo from "./components/student/StudentDetailsPage/StudentInfo";

import ShowJoinToSystemRequest from "./components/TableShow/ShowJoinToSystemRequest ";
import PopupWindow from "./components/student/popup/PopupWindow";
import Event from "./components/Event/Event";
import Complaint from "./components/student/Complaint";
import Setting from "./components/student/Setting";

import { StudentAbsense } from "./components/student/StudentDetailsPage/StudentAbsense";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export const PopUp = createContext(null);

const App = () => {
  const [reload, setReload] = useState(0);
  const [click, setclick] = useState([0, 0, 0, 0, 0]);
  const [tClick, setTClick] = useState([1, 0, 0, 0, 0]);
  return (
    <div>
      <PopUp.Provider value={{ click, setTClick, setclick, reload, setReload }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {localStorage.getItem("role") === "موجه" ? (
              <Route path="/" element={<PrivateRoute element={Home2} />} />
            ) : (
              <Route path="/" element={<PrivateRoute element={Home} />} />
            )}

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
            <Route
              path="/studentInfo"
              element={<PrivateRoute element={StudentInfo} />}
            />
            <Route path="/event" element={<PrivateRoute element={Event} />} />
            <Route
              path="/complaint"
              element={<PrivateRoute element={Complaint} />}
            />
            <Route
              path="/setting"
              element={<PrivateRoute element={Setting} />}
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
          <PopupWindow name="addAdminForClass" />
        ) : click[9] ? (
          <PopupWindow name="AddClass" />
        ) : click[10] ? (
          <PopupWindow name="addGrade" />
        ) : click[11] ? (
          <PopupWindow name="addFile" />
        ) : click[12] ? (
          <PopupWindow name="weeklySchedule" />
        ) : click[13] ? (
          <PopupWindow name="examSchedule" />
        ) : click[14] ? (
          <PopupWindow name="studentAbsense" type="adding" />
        ) : click[15] ? (
          <PopupWindow name="studentAbsense" />
        ) : null}
      </PopUp.Provider>
    </div>
  );
};

export default App;
