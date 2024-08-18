import React, { useEffect, useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/l.png";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { PopUp } from "../../App";

const Login = () => {
  const { click, tclick, setclick } = useContext(PopUp);

  const [loginMode, setLoginMode] = useState(true);

  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = useState({
    // email: '',
    // password: '',
    // name: '',
    // role_id: ''
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLoginMode = (mode) => {
    setFormData("");
    setError("");
    setMessage("");
    setLoginMode(mode);
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/showRoles`, {
          headers: {
            Accept: "application/json",
          },
        });
        response;
        setRole(response.data.sectors);
      } catch (e) {
        setError(e.message);
      }
    };
    getRoles();
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setclick([0, 0, 0, 0, 0, 1]);

    try {
      const response = await axios.post(`${apiUrl}/login`, formData, {
        headers: {
          Accept: "application/json",
        },
      });
      response;
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.role_id.name);
        setclick([0, 0, 0, 0, 0]);
        navigate("/");
        setError("");
        setMessage(response.data.message);
      }
      //  (localStorage.getItem("token"))
      //  (localStorage.getItem("role"))
    } catch (error) {
      setclick([0, 0, 0, 0, 0]);
      console.error("Sign-in error:", error);
      setMessage("");
      setError(error.response.data.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setclick([0, 0, 0, 0, 0, 1]);
    try {
      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        setError("");
        setMessage(response.data.message);
        setclick([0, 0, 0, 0, 0]);
      }
    } catch (error) {
      console.error("Sign-up error:", error.response.data);
      setMessage("");
      setError(error.response.data.message);
      setclick([0, 0, 0, 0, 0]);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="mainWrap">
      <div
        className={
          loginMode === true ? "container loginMode" : "container signupMode"
        }
      >
        {role && (
          <div className="formContainer">
            <div className="formWrapper">
              <img src={Logo} alt="logo" className="w-52 object-contain" />
              <div className="user-data flex flex-col gap-9 relative">
                <div>
                  <button
                    className={loginMode === true ? "clicked" : "not-clicked"}
                    onClick={() => handleLoginMode(true)}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    className={
                      loginMode === false ? "clicked ml-8" : "not-clicked ml-8"
                    }
                    onClick={() => handleLoginMode(false)}
                  >
                    تسجيل حساب
                  </button>
                </div>
                {loginMode && (
                  <form
                    className="flex flex-col gap-4 w-72"
                    autoComplete="off"
                    onSubmit={handleLoginSubmit}
                  >
                    <TextField
                      label="Email"
                      id="outlined-controlled"
                      size="small"
                      sx={{ borderRadius: "7px" }}
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      required
                    />
                    <FormControl sx={{}} variant="outlined" size="small">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        name="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ marginRight: "0px" }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <button type="submit" className="login">
                      Login
                    </button>
                  </form>
                )}
                {!loginMode && (
                  <form
                    className="flex flex-col mx-auto gap-4 w-72"
                    onSubmit={handleSignupSubmit}
                  >
                    <TextField
                      label="Name"
                      id="outlined-controlled"
                      size="small"
                      sx={{ borderRadius: "7px" }}
                      value={formData.name}
                      name="name"
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      label="Email"
                      id="outlined-controlled"
                      size="small"
                      sx={{ borderRadius: "7px" }}
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      required
                    />
                    {role && (
                      <FormControl sx={{}} variant="outlined" size="small">
                        <InputLabel id="demo-simple-select-label">
                          role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.role_id}
                          name="role_id"
                          label="role"
                          onChange={handleInputChange}
                        >
                          {role.map(function (item, index) {
                            return (
                              <MenuItem value={item._id} key={index}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}

                    <FormControl sx={{}} variant="outlined" size="small">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        name="password"
                        onChange={handleInputChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ marginRight: "0px" }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <button className="login">Sign up</button>
                  </form>
                )}
                {error && (
                  <span className="text-red-600 text-center">{error}</span>
                )}
                {message && (
                  <span className="text-green-600 text-center">{message}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
