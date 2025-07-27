import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Students/SearchBooks.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LMSContext from "../../Context/LMSContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchBooks = () => {

  
  const navigate = useNavigate();
  
  const { menubt, setBook, apiUrl } = useContext(LMSContext);
  const [bookData, setBookData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    category: "",
  });

  useEffect(() => {
    const fetchAllBookData = async () => {
      try {
        const bookData = await axios.get(
          `${apiUrl}/api/books/getBooks`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // console.log(bookData.data.books);
        let Books = bookData.data.books;

        const categories = [
          ...new Set(
            Books.map((Book) => {
              return Book.category;
            })
          ),
        ];
        setCategories(categories);

        setBookData(Books);
      } catch (error) {
        console.log(error);
      }
    };

    if (formData.title === "") {
      fetchAllBookData();
    }
  }, [formData.title]);

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData)

    try {
      const searchBook = await axios.post(
        `${apiUrl}/api/books/search`,
        {
          title: formData.title,
          authorName: formData.authorName,
          category: formData.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(searchBook);
      setBookData(searchBook.data.books);
    } catch (error) {
      // console.log(error.response.data.message)
      toast.warn(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setBookData([])
    }

    setFormData((prev) => ({
      ...prev,
      category: "",
      authorName: "",
    }));
  };


  const allotBook = (Book)=>{
    if(Book.availableCopies){
     setBook(Book)
    
     navigate('/admin/allotBook')

    // setTimeout(() => {
    //   navigate('/admin/allotBook')
    // }, 500);

    } 
  }  

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

      <div
        className={`main-page searchBooks-main-page ${
          menubt ? "shrink-main-page" : ""
        }`}
      >
        <div className="header">
          <h1>Search Book Availability</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="search-bar">
            <input
              placeholder="Search for books..."
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormData}
            />
            <button>Search</button>
          </div>
          <div className="filters">
            <select
              name="category"
              value={formData.category}
              onChange={handleFormData}
            >
              <option value="">Category</option>
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
            <input
              placeholder="Author"
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleFormData}
            />
          </div>
        </form>

        <div className="grid">
          {bookData ? (
            bookData.map((Book) => {
              return (
                <div key={Book._id} className="book-item" onClick={()=>allotBook(Book)}>
                  <img alt="Book cover" src={Book.coverImage} />
                  <h2>{Book.title}</h2>
                  <p>Author: {Book.authorName}</p>
                  <p>Publication: {Book.publication}</p>
                  <p>ISBN: {Book.isbn}</p>
                  <p>Total Copies: {Book.totalCopies}</p>
                  <p>Available copies: {Book.availableCopies}</p>
                  <p
                    className={`${
                      Book.availableCopies > 0 ? "available" : "not-available"
                    }`}
                  >
                    {Book.availableCopies > 0 ? "Available" : "Not Available"}
                  </p>
                  <p className="location">{Book.location}</p>
                </div>
              );
            })
          ) : (
            <div className="skeleton skeleton-text w-24 inline-block"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBooks;
