import React, { useContext, useState } from "react";
import {
  ArrowLeft,
  Book,
  User,
  Calendar,
  Hash,
  Building,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import "../../CSS/Admin/AllotBook.css";
import LMSContext from "../../Context/LMSContext.jsx";
import axios from "axios";

const BookDetailPage = ({
  
}) => {
  const [studentUrn, setStudentUrn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { book, apiUrl } = useContext(LMSContext);

  const handleAllotBook = async () => {
    if (!studentUrn.trim()) {
      setMessage({ type: "error", text: "Please enter a valid Student URN" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const allotBook = await axios.post(
        `${apiUrl}/api/allottedBooks/allotBooks`,
        {
          URN: studentUrn,
          bookId: book._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setMessage(allotBook.data.message);

      setMessage({ type: "success", text: allotBook.data.message });
      setStudentUrn("");
    } catch (error) {
      console.log(error)
      setMessage({ type: "error", text: error.response.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        {/* Main Content */}
        <div className="main-content">
          <div className="card">
            <div className="card-grid">
              {/* Book Information */}
              <div>
                <div className="section-header">
                  <h2 className="section-title">Book Information</h2>
                  <p className="section-subtitle">
                    Complete details about the selected book
                  </p>
                </div>

                <div className="book-info-card">
                  <div className="book-image-container">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="book-image"
                    />
                    <div className="book-details">
                      <h3 className="book-title">{book.title}</h3>
                      <div className="detail-item">
                        <User size={16} className="detail-icon" />
                        <span>
                          <strong>Author:</strong> {book.authorName}
                        </span>
                      </div>
                      <div className="detail-item">
                        <Building size={16} className="detail-icon" />
                        <span>
                          <strong>Publication:</strong> {book.publication}
                        </span>
                      </div>
                      <div className="detail-item">
                        <Hash size={16} className="detail-icon" />
                        <span>
                          <strong>ISBN:</strong> {book.isbn}
                        </span>
                      </div>
                      <div className="detail-item">
                        <Book size={16} className="detail-icon" />
                        <span>
                          <strong>Total Copies:</strong> {book.totalCopies}
                        </span>
                      </div>
                      <div className="detail-item">
                        <CheckCircle
                          size={16}
                          className="detail-icon-success"
                        />
                        <span>
                          <strong>Available:</strong> {book.availableCopies}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allotment Section */}
              <div>
                <div className="allotment-header">
                  <h2 className="section-title">Book Allotment</h2>
                  <p className="section-subtitle">
                    Assign this book to a student
                  </p>
                </div>

                <div className="allotment-card">
                  {/* Availability Status */}
                  <div className="status-card">
                    <div className="status-header">
                      <div>
                        <h4 className="status-title">Availability Status</h4>
                        <p className="status-text">
                          {book.availableCopies > 0
                            ? `${book.availableCopies} of ${book.totalCopies} copies available`
                            : "No copies available"}
                        </p>
                      </div>
                      <div
                        className={`status-badge ${
                          book.availableCopies > 0
                            ? "status-badge-available"
                            : "status-badge-unavailable"
                        }`}
                      >
                        {book.availableCopies > 0
                          ? "Available"
                          : "Not Available"}
                      </div>
                    </div>
                  </div>

                  {/* Student URN Input */}
                  <div className="input-section">
                    <label htmlFor="studentUrn" className="label">
                      Student URN *
                    </label>
                    <input
                      id="studentUrn"
                      type="text"
                      value={studentUrn}
                      onChange={(e) => setStudentUrn(e.target.value)}
                      placeholder="Enter student URN (e.g., STU2024001)"
                      className="input"
                      disabled={isLoading || book.availableCopies === 0}
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleAllotBook}
                    disabled={
                      isLoading ||
                      book.availableCopies === 0 ||
                      !studentUrn.trim()
                    }
                    className={`button ${
                      isLoading ||
                      book.availableCopies === 0 ||
                      !studentUrn.trim()
                        ? "button-disabled"
                        : "button-enabled"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Allotting Book...</span>
                      </>
                    ) : (
                      <>
                        <Book size={20} />
                        <span>Allot Book to Student</span>
                      </>
                    )}
                  </button>

                  {/* Message Display */}
                  {message.text && (
                    <div
                      className={`message-card ${
                        message.type === "success"
                          ? "message-success"
                          : "message-error"
                      }`}
                    >
                      {message.type === "success" ? (
                        <CheckCircle size={20} />
                      ) : (
                        <AlertCircle size={20} />
                      )}
                      <span>{message.text}</span>
                    </div>
                  )}

                  {/* Book ID Info */}
                  <div className="book-id-card">
                    <h4 className="book-id-title">Book ID</h4>
                    <p className="book-id-value">{book._id}</p>
                    <p className="book-id-note">
                      This ID will be used for the allotment request
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;
