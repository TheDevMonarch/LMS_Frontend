import axios from "axios";
import React, { useContext, useState } from "react";
import LMSContext from "../../Context/LMSContext.jsx";


const BookCard = ({ book, URN, setMessage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { apiUrl } = useContext(LMSContext);  

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleReturnBook = () => {
    setShowConfirmation(true);
  };

  const handleConfirmReturn = async() => {
    // Add your return book logic here
    // console.log(`Returning book: ${book.BookDetail.title}`);
    setShowConfirmation(false);

    // console.log(URN, book.bookId)

    try {
      let returnBook = await axios.post(`${apiUrl}/api/allottedBooks/returnBook`,{
        URN,
        bookId:book.bookId
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })


      // console.log(returnBook.data)
      setMessage({text:returnBook.data.message, status:returnBook.data.success})

    } catch (error) {
      setMessage({text:error.response.data.message, status:error.response.data.success})
      console.log(error.response.data)
    }

  };  

  const handleCancelReturn = () => {
    setShowConfirmation(false);
  };

  const fallbackImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUgxNVYzNUgyMFYyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
  
  return (
    <>
      <div className="book-card">
        <img 
          src={book.BookDetail.coverImage} 
          alt={book.BookDetail.title} 
          className="book-cover"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <div className="book-details">
          <div className="book-title">{book.BookDetail.title}</div>
          <div className="book-author">by {book.BookDetail.authorName}</div>
          <div className="book-meta">
            <span>📖 {book.BookDetail.publication}</span>
            <span>📚 ISBN: {book.BookDetail.isbn}</span>
          </div>
          <div className="category-badge">{book.BookDetail.category}</div>
          <div className="date-info">
            <span className="date-badge borrow-date">
              Borrowed: {formatDate(book.borrowDate)}
            </span>
            <span className="date-badge return-date">
              Return: {formatDate(book.returnDate)}
            </span>
          </div>
          <button 
            className="return-book-btn"
            onClick={handleReturnBook}
          >
            Return Book
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirm Return</h3>
            <p>Are you sure you want to return "{book.BookDetail.title}"?</p>
            <div className="popup-buttons">
              <button 
                className="confirm-btn"
                onClick={handleConfirmReturn}
              >
                Confirm
              </button>
              <button 
                className="cancel-btn"
                onClick={handleCancelReturn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;