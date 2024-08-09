import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/Logo.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")

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
      {!hideNavBar && (
        ((role==="مدير") ? (
        <nav className="nav">
          <img src={Logo} alt="logo" className="Logo" />
            <button className="flex items-center">
              <NavLink to="/" className="px-0 mx-0 flex items-center font-large">
                <HomeRoundedIcon />
                <span> الموظفين</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/b" className="flex items-center font-large">
                <GroupRoundedIcon />
                <span>الطلاب</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/join" className="flex items-center font-large">
                <GroupRoundedIcon />
                <span>الانضمام</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/event" className="flex items-center font-large">
                <EventIcon />
                <span>الفعاليات</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/c" className="flex items-center font-large">
                <DescriptionRoundedIcon />
                <span>المقترحات</span>
              </NavLink>
            </button>
            <button
            className="flex justify-end items-center grow font-large loguot"
            onClick={() => handleLogout()}
          >
            <LogoutIcon />
            تسجيل الخروج
          </button>
        </nav>
            
        ):(role==="موجه") ? (
          <nav className="nav">
          <img src={Logo} alt="logo" className="Logo" />
            <button className="flex items-center">
              <NavLink to="/" className="px-0 mx-0 flex items-center font-large">
                <HomeRoundedIcon />
                <span> الموظفين</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/b" className="flex items-center font-large">
                <GroupRoundedIcon />
                <span>الطلاب</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/join" className="flex items-center font-large">
                <GroupRoundedIcon />
                <span>الانضمام</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/event" className="flex items-center font-large">
                <EventIcon />
                <span>الفعاليات</span>
              </NavLink>
            </button>
            <button className="flex items-center">
              <NavLink to="/c" className="flex items-center font-large">
                <DescriptionRoundedIcon />
                <span>المقترحات</span>
              </NavLink>
            </button>
            <button
            className="flex justify-end items-center grow font-large loguot"
            onClick={() => handleLogout()}
          >
            <LogoutIcon />
            تسجيل الخروج
          </button>
        </nav>
          ) : (
            <nav className="nav">
            <img src={Logo} alt="logo" className="Logo" />
              <button className="flex items-center">
                <NavLink to="/" className="px-0 mx-0 flex items-center font-large">
                  <HomeRoundedIcon />
                  <span> الموظفين</span>
                </NavLink>
              </button>
              <button className="flex items-center">
                <NavLink to="/b" className="flex items-center font-large">
                  <GroupRoundedIcon />
                  <span>الطلاب</span>
                </NavLink>
              </button>
              <button className="flex items-center">
                <NavLink to="/join" className="flex items-center font-large">
                  <GroupRoundedIcon />
                  <span>الانضمام</span>
                </NavLink>
              </button>
              <button className="flex items-center">
                <NavLink to="/event" className="flex items-center font-large">
                  <EventIcon />
                  <span>الفعاليات</span>
                </NavLink>
              </button>
              <button
              className="flex justify-end items-center grow font-large loguot"
              onClick={() => handleLogout()}
            >
              <LogoutIcon />
              تسجيل الخروج
            </button>
          </nav>
          ))
      )}
    </>
  );
};

export default NavBar;
