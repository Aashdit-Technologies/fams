import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./LoginPage.css";
import Odisha from "../../assets/od-logo.png";
import { IoKeySharp } from "react-icons/io5";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      toast.error("Both username and password are required.", {
        autoClose: 1000,
      });
      return;
    }

    try {
      await login({ userName, password });
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login_main">
      <div className="container">
        <div className="log-logo-sec">
          <Link to="/">
            <img src={Odisha} alt="" />
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        <ToastContainer />
        <div className="container cntr_cls">
          <div className="box">
            <div className="shadow"></div>
            <div className="content">
              <div className="form">
                <h3 className="logos">
                  <IoKeySharp />
                </h3>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                  <div className="inputBox">
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaUser />
                          </InputAdornment>
                        ),
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="inputBox">
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdLock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <MdVisibilityOff />
                              ) : (
                                <MdVisibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="inputBox d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3"
                      disabled={isLoggingIn}
                    >
                      {isLoggingIn ? "Login" : "Login"}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3"
                    >
                      <Link
                        to="/"
                        style={{ color: "#fff", textDecoration: "none" }}
                      >
                        Home
                      </Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
