import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Students/AllottedBooks.css";

import LMSContext from "../../Context/LMSContext.jsx";
import axios from "axios";


const AllottedBooks = () => {
  
  const { menubt, allottedBooks} = useContext(LMSContext);
  

  return (
    <div className={`main-page `}>
      <div className="header">
        <h1>Allotted Books</h1>
      </div>
      <div className="grid">

        {allottedBooks?(allottedBooks.map((Book)=>{return (<div key={Book._id} className="book-item">
          <img alt="Book cover" src={Book.bookDetails.coverImage} />
          <h2>{Book.bookDetails.title}</h2>
          <p>Author: {Book.bookDetails.authorName}</p>
          <p>Allotted Date: {Book.borrowDate}</p>
          <p>Due Date: {Book.returnDate}</p>
        </div>)})):(<div className="skeleton skeleton-text w-24 inline-block"></div>)}
      </div>
    </div>
  );
};

export default AllottedBooks;
