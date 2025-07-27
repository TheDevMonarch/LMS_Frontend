import React, {useContext, useState} from 'react';
import '../CSS/RegisterPage.css'
import bookImage from '../Images/book_image.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegisterNavbar from '../Components/LoginRegisterNavbar';
import LMSContext from '../Context/LMSContext.jsx';


const Register = () => {
  const { apiUrl } = useContext(LMSContext);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:'',
    URN:'',
    password:''
  })

  const changeHandler = (e) =>{
    const { name, value} = e.target;

    setFormData({
      ...formData,
      [name]:value
    })
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    //console.log(formData);

      try {
      const userData = await axios.post(
        `${apiUrl}/api/user/register`,
        {
          email: formData.email,
          URN: formData.URN,
          password: formData.password
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

      // console.log(userData.data.message);

      setTimeout(() => {
        navigate('/LoginPage')
      }, 1600);


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

  setFormData({
    email:'',
    URN:'',
    password:''
  })

  }

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

    <LoginRegisterNavbar/>

      <div className="register-container">
      <div className="register-left">
        <div className="admin-icon">
          <i className="fa-solid fa-book-open fa-3x"></i>
          <p>Library Management System</p>
        </div>
      </div>
      <div className="register-right">
        <div className="svg-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d6a863" height="85px" width="85px">
            <path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path>
          </svg>
        </div>

        <h2>Student Register</h2>

        <form onSubmit={(e)=>submitHandler(e)}>
          <input type="text" placeholder="Student URN" value={formData.URN} onChange={changeHandler} name='URN'required />
          <input type="email" placeholder="Email" value={formData.email} onChange={changeHandler} name='email'required />
          <input type="password" placeholder="Password" value={formData.password} onChange={changeHandler} name='password' required />
          <button type="submit">Register</button>
        </form>

        <hr />
        <p className="login-link">Already registered? <Link to={'/LoginPage'} >Login</Link></p>
      </div>
    </div>
    
    </>
    
  );
};

export default Register;

