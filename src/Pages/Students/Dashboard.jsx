import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Students/Dashboard.css";
import LMSContext from "../../Context/LMSContext.jsx";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { menubt, allottedBookNo, readBookCount, penaltyData, extensionRequestNo } = useContext(LMSContext);
  const navigate = useNavigate();

  return (
    <div className={`main-page`}>
      <div className="page-heading">
        <h1>Dashboard</h1>
      </div>

      <div className="quick-view">
        <div onClick={()=>{navigate('/allottedBooks')}}>
          <span>Books allotted</span>
          <div className="count">{allottedBookNo?allottedBookNo:0}</div>
        </div>

        <div onClick={()=>{navigate('/booksCompleted')}}>
          <span>Book Already read</span>
          <div className="count">{readBookCount?readBookCount:0}</div>
        </div>
      </div>

      <div className="quick-view">
        <div onClick={()=>{navigate('/penalty')}}>
          <span>Penalty</span>
          <div className="count">{penaltyData.Data?penaltyData.Data.length:0}</div>
        </div>

        <div onClick={()=>{navigate('/extensionRequestStatus')}}>
          <span>Extension request</span>
          <div className="count">{extensionRequestNo?extensionRequestNo:0}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
