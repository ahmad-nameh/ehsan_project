import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/Logo.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [hideNavBar, setHideNavBar] = useState(false);

  useEffect(() => {
    function checkHideNav() {
      if (window.location.pathname === "/login") {
        setHideNavBar(true);
      } else {
        setHideNavBar(false);
      }
    }

    checkHideNav();
  }, [window.location.pathname]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogout = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    } catch (error) {
      console.error("log-out error:", error);
    }
  };
  return (
    <>
      {!hideNavBar &&
        (role === "مدير" ? (
          <nav className="nav items-center">
            <img src={Logo} alt="logo" className="Logo" />
            <button className="flex items-center">
              <NavLink to="/" className="px-0 mx-0 flex items-center ">
                <BadgeIcon />
                <span> الموظفين</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/student" className="flex items-center ">
                <AutoStoriesIcon />
                <span>الطلاب</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/join" className="flex items-center ">
                <GroupRoundedIcon />
                <span>الانضمام</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/event" className="flex items-center ">
                <EventIcon />
                <span>الفعاليات</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/complaint" className="flex items-center ">
                <MessageIcon />
                <span>المقترحات</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/setting" className="flex items-center ">
                <DescriptionRoundedIcon />
                <span>إعداد</span>
              </NavLink>
            </button>
            <div className="flex justify-center items-end p-0 grow  ">
              <button
                className="flex justify-end items-center  loguot"
                onClick={() => handleLogout()}
              >
                <LogoutIcon />
                تسجيل الخروج
              </button>
            </div>
          </nav>
        ) : role === "موجه" ? (
          <nav className="nav items-center">
            <img src={Logo} alt="logo" className="Logo" />
            <button className="flex items-center">
              <NavLink to="/" className="px-0 mx-0 flex items-center ">
                <HomeRoundedIcon />
                <span>الرئيسية</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/event" className="flex items-center ">
                <EventIcon />
                <span>الفعاليات</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/complaint" className="flex items-center ">
                <MessageIcon />
                <span>المقترحات</span>
              </NavLink>
            </button>
            <div className="flex justify-center items-end p-0 grow  ">
              <button
                className="flex justify-end items-center  loguot"
                onClick={() => handleLogout()}
              >
                <LogoutIcon />
                تسجيل الخروج
              </button>
            </div>
          </nav>
        ) : (
          <nav className="nav items-center">
            <img src={Logo} alt="logo" className="Logo" />
            <button className="flex items-center">
              <NavLink to="/" className="px-0 mx-0 flex items-center ">
                <HomeRoundedIcon />
                <span> الرئيسية</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/event" className="flex items-center ">
                <EventIcon />
                <span>الفعاليات</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/complaint" className="flex items-center ">
                <MessageIcon />
                <span>المقترحات</span>
              </NavLink>
            </button>
            <div className="flex justify-center items-end p-0 grow  ">
              <button
                className="flex justify-end items-center  loguot"
                onClick={() => handleLogout()}
              >
                <LogoutIcon />
                تسجيل الخروج
              </button>
            </div>
          </nav>
        ))}
    </>
  );
};

export default NavBar;
