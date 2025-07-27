import React, { useContext, useState } from 'react'
import '../../CSS/Students/navbar.css'
import bookImage from '../../Images/book_image.png'
import LMSContext from '../../Context/LMSContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const {menubt, setMenubt, apiUrl} = useContext(LMSContext)
  
  const navigate = useNavigate();

  const {isAuthenticated, setIsAuthenticated, user} = useContext(LMSContext)

  const [isProfileDetail, setIsProfileDetail] = useState(false)

  const checkProfileDetail = ()=>{
      if(isProfileDetail){
        return 'show-prfile-detail-list'
      }
      else{
        return ''
      }
  }

  const logOut = async() =>{

    try {

      let logout = await axios.get(`${apiUrl}/api/user/logout`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      });
      

      toast.success(logout.data.message, {
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

      setIsAuthenticated(false)

      setTimeout(() => {
        navigate('/LoginPage')
      }, 2000);

    } catch (error) {
      console.log(error)
    }

  }

  // console.log(menubt, setMenubt)
 

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
    <header>
      <nav className="navbar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="currentColor" className="menu-bt-js menu-bt" onClick={()=>setMenubt(!menubt)}><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>

        <div className="logo">
          <img src={bookImage} alt="logo"/>
          <div className="logo-text">
            Library management system
          </div>
        </div>

        <div className="profile">
          <div onClick={()=>setIsProfileDetail(!isProfileDetail)}  className="profile-detail">
            {user?(<span>{user.name}</span>):(<span className="skeleton skeleton-text w-24 inline-block" />)}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className={(isProfileDetail)?`rotate-arrow`:''}><path d="M12 14L8 10H16L12 14Z"></path></svg>
          </div>

        </div>
      </nav>
    </header>

    <ul className={`profile-detail-list ${checkProfileDetail()}`}>
      {user?(<li className="name-detail">
        <h4>{user.name}</h4>
        <span>{user.URN}</span>
      </li>):<li className="skeleton skeleton-text w-24 inline-block"></li>}
      
      <li className="signout" onClick={logOut} >
        <span>signout</span>
      </li>
     </ul>
    </>
        
  )
}

export default Navbar