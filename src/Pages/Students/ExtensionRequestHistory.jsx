import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Students/AllottedBooks.css";
import axios from "axios";
import LMSContext from "../../Context/LMSContext.jsx";

const ExtensionRequestHistory = () => {


  const {ExtensionRequestHistoryData} = useContext(LMSContext)
  
//   const ExtensionRequestHistoryDataUpdated = ExtensionRequestHistoryData?.filter((Book) => {
//   return Book.status === "Pending"
// });


  return (
    <div className={`main-page `}>
      <div className="header">
        <h1>Extension Requests</h1>
      </div>
      <div className="grid">
        {ExtensionRequestHistoryData ? (
          ExtensionRequestHistoryData.map((Book) => {
            return (
              <div key={Book._id} className="book-item">
                <img alt="Book cover" src={Book.BookData.coverImage} />
                <h2>{Book.BookData.title}</h2>
                <p>Author: {Book.BookData.authorName}</p>
                <p>Status: <b>{Book.status}</b></p>
                <p>Request for: {Book.NoOfDays} Days</p>
                <p>Requested At: {(Book.createdAt).split("T")[0]}</p>
              </div>
            );
          })
        ) : (
          <div className="skeleton skeleton-text w-24 inline-block"></div>
        )}
      </div>
    </div>
  );
};

export default ExtensionRequestHistory;
