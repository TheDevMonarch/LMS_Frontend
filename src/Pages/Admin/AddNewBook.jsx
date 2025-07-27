import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Admin/AddNewBook.css";
import axios from "axios";
import LMSContext from "../../Context/LMSContext.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewBook = () => {
  const { apiUrl } = useContext(LMSContext);

  const [formData, setFormData] = useState({
    bookTitle: "",
    authorName: "",
    publication: "",
    isbn: "",
    category: "",
    location: "",
    copies: "",
  });

  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleFileChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "isbn") {
      // Format ISBN as user types
      let formattedValue = value.replace(/[^0-9X]/g, "");
      if (formattedValue.length > 10) {
        // Format as ISBN-13
        formattedValue = formattedValue.replace(
          /(\d{3})(\d{1})(\d{3})(\d{3})(\d{3})/,
          "$1-$2-$3-$4-$5"
        );
      } else if (formattedValue.length === 10) {
        // Format as ISBN-10
        formattedValue = formattedValue.replace(
          /(\d{1})(\d{3})(\d{3})(\d{3})/,
          "$1-$2-$3-$4"
        );
      }
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.bookTitle ||
      !formData.authorName ||
      !formData.category ||
      !formData.publication ||
      !formData.location ||
      !formData.copies
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.bookTitle);
      formDataToSend.append("authorName", formData.authorName);
      formDataToSend.append("publication", formData.publication);
      formDataToSend.append("isbn", formData.isbn);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("totalCopies", formData.copies);

      if (coverPhoto) {
        formDataToSend.append("coverPhoto", coverPhoto);
      }

      const AddNewBook = await axios.post(
        `${apiUrl}/api/books/addNewBook`,
        formDataToSend,
        {
          withCredentials: true,
        }
      );

       toast.success(AddNewBook.data.message, {
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

      // console.log(" Book added:", AddNewBook.data);
    } catch (error) {
      console.error(" Error adding book:", error);
    }

    // console.log('Book added:', formData);

    setFormData({
      bookTitle: "",
      authorName: "",
      publication: "",
      isbn: "",
      category: "",
      location: "",
      copies: "",
    });
    setCoverPhoto(null);
    document.querySelector('input[name="coverPhoto"]').value = "";
  };

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


    <div className="form-container">
      <h1 className="form-title">Add New Book</h1>

      <div className="success-message" id="successMessage">
        Book added successfully!
      </div>

      <form id="addBookForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookTitle">Book Title</label>
          <input
            type="text"
            id="bookTitle"
            value={formData.bookTitle}
            name="bookTitle"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorName">Author Name</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publication">Publication</label>
          <input
            type="text"
            id="publication"
            name="publication"
            value={formData.publication}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN Number</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            onChange={handleInputChange}
            value={formData.isbn}
            placeholder="978-0-123456-78-9"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Book Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select a Category --</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="biography">Biography</option>
            <option value="history">History</option>
            <option value="self-help">Self Help</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="health">Health & Wellness</option>
            <option value="cooking">Cooking</option>
            <option value="travel">Travel</option>
            <option value="art">Art & Design</option>
            <option value="religion">Religion & Spirituality</option>
            <option value="education">Education</option>
            <option value="children">Children's Books</option>
            <option value="young-adult">Young Adult</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="copies">Number of Copies</label>
          <input
            type="number"
            id="copies"
            name="copies"
            value={formData.copies}
            onChange={handleInputChange}
            min="1"
            max="999"
            required
          />
        </div>

        <label className="custom-file-upload">
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            required
          />
          Upload Book Cover
        </label>

        <button type="submit" className="submit-btn">
          Add Book
        </button>
      </form>
    </div>
    </>
    
  );
};

export default AddNewBook;
