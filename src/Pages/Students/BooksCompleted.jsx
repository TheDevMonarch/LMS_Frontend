import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Students/AllottedBooks.css";

import LMSContext from "../../Context/LMSContext.jsx";
import axios from "axios";


const BooksCompleted = () => {

   const [booksCompletedData, setBooksCompletedData] = useState([])
  const { apiUrl } = useContext(LMSContext);

     useEffect(() => {
    const fetchBooksCompletedData = async()=>{

    try {
          let BooksData = await axios.get(`${apiUrl}/api/allottedBooks/booksCompleted`, {
            headers:{
              "Content-Type":"application/json",
            },
            withCredentials:true
          })

          // console.log(BooksData.data.returnBooksData)
          setBooksCompletedData(BooksData.data.returnBooksData)

    } catch (error) {
      console.log(error)
    }
  }

  fetchBooksCompletedData()
    
  }, [])

  return (
    <div className={`main-page `}>
      <div className="header">
        <h1>Books Completed</h1>
      </div>
      <div className="grid">
        {booksCompletedData ? (
          booksCompletedData.map((Book) => {
            return (
              <div key={Book._id} className="book-item">
                <img alt="Book cover" src={Book.coverImage} />
                <h2>{Book.title}</h2>
                <p>Author: {Book.authorName}</p>
                <p>Publication: {Book.publication}</p>
                <p>ISBN: {Book.isbn}</p>
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

export default BooksCompleted;
