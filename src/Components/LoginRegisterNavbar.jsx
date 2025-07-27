import React from "react";
import "../CSS/LoginRegisterNav.css";
import bookImage from "../Images/book_image.png";

const LoginRegisterNavbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <img src={bookImage} alt="logo" />
        <div className="nav-text">Library management system</div>
      </div>
    </nav>
  );
};

export default LoginRegisterNavbar;
