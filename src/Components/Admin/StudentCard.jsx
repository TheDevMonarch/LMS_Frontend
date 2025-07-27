import React from "react";
import BookCard from '../../Components/Admin/BookCard.jsx';
  const StudentCard = ({ student, setMessage }) => {

   
    
    

    return (
      <>
  
      <div className="student-card">
        <div className="student-header">
          <div className="student-info">
            <span className="student-urn">URN: {student.URN}</span>
          </div>
          <div className="books-count">
            {student.books.length} Book{student.books.length > 1 ? 's' : ''} Issued
          </div>
        </div>
        <div className="books-grid">
          {student.books.map((book, index) => (
            <BookCard key={book._id || index} book={book} URN={student.URN} setMessage={setMessage}/>
          ))}
        </div>
      </div>
      </>
      
    );
  };

  export default StudentCard