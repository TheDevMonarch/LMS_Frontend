import React, { useEffect, useState } from "react";
import "../CSS/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegisterNavbar from "../Components/LoginRegisterNavbar";
import { useContext } from "react";
import LMSContext from "../Context/LMSContext.jsx";

const Login = () => {

  const { isAuthenticated, setIsAuthenticated, fetchUser, apiUrl } = useContext(LMSContext)

  const [active, setActive] = useState("signup");

  const switchCircle = (selected) => {
    setActive(selected);

    if (selected === "signup") {
      setbuttonState(false);
    } else {
      setbuttonState(true);
    }
  };

  const [buttonState, setbuttonState] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const setVisibility = (State) => {
    if (State) {
      return "showPage";
    } else {
      return "hide";
    }
  };
 

  const submitHandler = async (e, Role) => {
    e.preventDefault();
    // console.log("In submitHandler");

    try {
      const userData = await axios.post(
        `${apiUrl}/api/user/login`,
        {
          identifier,
          password: password,
          role:Role
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(userData.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // console.log(userData.data);

      setIsAuthenticated(true);

      if (userData.data.success) {
  setTimeout(() => {
    fetchUser();
  }, 300); 
}

      setTimeout(() => {
        if(userData.data.role === 'student'){
          navigate("/dashboard");
        }
        if(userData.data.role === 'admin')
        {
          navigate("/admin/extensionRequests")
        }
      }, 1700);
    } catch (error) {
      console.log(error);

      toast.warn(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setIdentifier("");
    setPassword("");
  };


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <LoginRegisterNavbar />

      <div className="main-login">
        <div className="MobileViewContainer">
          <div
            className={`circle login ${active === "login" ? "active" : ""}`}
            id="login"
            onClick={() => switchCircle("login")}
          >
            <div className="mobile-admin-box mobile-logo-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="black"
              >
                <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V17H19Z"></path>
              </svg>
              <pre>Admin</pre>
            </div>
          </div>

          <div
            className={`circle signup ${active === "signup" ? "active" : ""}`}
            id="signup"
            onClick={() => switchCircle("signup")}
          >
            <div className="mobile-student-box mobile-logo-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="black"
              >
                <path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path>
              </svg>
              <pre>Student</pre>
            </div>
          </div>
        </div>

        <div className={`student ${setVisibility(!buttonState)}`}>
          <div className="side-bar">
            <div
              className="admin-box logo-box"
              onClick={() => setbuttonState(!buttonState)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="85px"
                height="85px"
                fill="currentColor"
              >
                <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V17H19Z"></path>
              </svg>
              <pre>Admin</pre>
            </div>
          </div>

          <div className={`login-box ${setVisibility(!buttonState)}`}>
            <div className="student-logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                heigth="85px"
                width="85px"
              >
                <path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path>
              </svg>
            </div>
            <p>Student Login</p>
            <form onSubmit={(e) => submitHandler(e, "student")}>
              <input
                type="text"
                id="S-URN"
                name="S-URN"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="input-detail "
                placeholder="Student URN"
              />
              <br />
              <br />
              <input
                type="password"
                id="S-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-detail "
                placeholder="Password"
              />
              <br />
              <input type="submit" value="login" className="login-bt" />
            </form>

            <hr className="hr-line" />

            <pre className="register-link">
              {" "}
              Create New Account <Link to={"/RegisterPage"}>Here</Link>
            </pre>
          </div>
        </div>

        <div className={`admin ${setVisibility(buttonState)}`}>
          <div className="side-bar-admin">
            <div
              className="student-box logo-box"
              onClick={() => setbuttonState(!buttonState)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                heigth="85px"
                width="85px"
              >
                <path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path>
              </svg>
              <pre>student</pre>
            </div>
          </div>

          <div className={`login-box-admin ${setVisibility(buttonState)}`}>
            <div className="admin-logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="80px"
                height="80px"
                fill="black"
              >
                <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V17H19Z"></path>
              </svg>
            </div>
            <p>admin Login</p>
            <form onSubmit={(e)=>submitHandler(e,"admin")}>
              <input
                type="text"
                id="admin"
                name="admin"
                className="input-detail "
                value={identifier}
                onChange={(e)=>setIdentifier(e.target.value)}
                placeholder="Username"
              />
              <br />
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-detail"
                placeholder="Password"
              />
              <br />
              <input type="submit" value="login" className="login-bt" />
            </form>

            <hr className="hr-line" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
