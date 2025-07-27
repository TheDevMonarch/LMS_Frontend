import React, { useContext, useEffect, useState } from "react";
import LMSContext from "../../Context/LMSContext.jsx";
import "../../CSS/Students/ExtensionRequest.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ExtensionRequest = () => {
  const { menubt, user, allottedBooks, apiUrl } = useContext(LMSContext);

  const changeDateFormat = (DateStr) =>{
    const [day, month, year] = DateStr.split("-");
    const newDate = new Date(`${year}-${month}-${day}`)
     return newDate;
  }

  // console.log(allottedBooks)
  const Today = new Date();
  let ExtensionRequestBooks = allottedBooks?.filter((Book) => {
    const returnDate = changeDateFormat(Book.returnDate);
    const borrowDate = changeDateFormat(Book.borrowDate);
    const milliSeconds = Today - borrowDate;
    const days = milliSeconds/(1000 * 60 * 60 * 24);
    return Today <= returnDate && days<=62;
  });

  // console.log(ExtensionRequestBooks)

  const [formData, setformData] = useState({
    URN: "",
    bookId:"",
    NoOfDays: 0,
  });

  const [book, setBook] = useState({})

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if(name === "bookId"){
      const bookDetail = ExtensionRequestBooks.filter((Book)=>{
        return Book.bookId.toString() === value
      })

      setBook(bookDetail)
    }

    setformData({
      ...formData,
      [name]: name === "NoOfDays" ? Number(value) : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(book[0].bookId)

    try {
      let ExtensionRequest = await axios.post(
        `${apiUrl}/api/extensionRequests/addNewRequest`,
        {
          URN: formData.URN,
          bookId:formData.bookId,  
          bookTitle:book[0].bookDetails.title, 
          borrowDate:book[0].borrowDate, 
          returnDate:book[0].returnDate,
          NoOfDays: formData.NoOfDays,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(ExtensionRequest);

      toast.success(ExtensionRequest.data.message, {
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
    } catch (error) {
      console.log(error);
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
    }

    setformData({
      URN: user ? user.URN : "",
      bookId:"",
      NoOfDays: 0,
    });
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

      <div
        className={`main-page main-page-penalty-main-page ${
          menubt ? "shrink-main-page" : ""
        }`}
      >
        <div className="container-extension-request">
          <h2>Extension Request</h2>
          <form className="form-box" onSubmit={submitHandler}>
            <label htmlFor="urn">URN</label>
            <input
              type="text"
              id="urn"
              name="URN"
              value={(formData.URN = user ? user.URN : "")}
              readOnly
              placeholder="Enter your URN"
              required
            />

            <label htmlFor="book">Select Book</label>
            <select
              id="book"
              name="bookId"
              value={formData.bookId}
              onChange={changeHandler}
              required
            >
              <option value="">-- Select a Book --</option>
              {ExtensionRequestBooks?.map((Book) => {
                return (
                  <option key={Book.bookId} value={Book.bookId}>
                    {Book.bookDetails.title}
                  </option>
                );
              })}
            </select>

            <label htmlFor="days">Number of Days (Max 15)</label>
            <input
              type="number"
              id="days"
              name="NoOfDays"
              onChange={changeHandler}
              value={formData.NoOfDays}
              max="15"
              min="1"
              required
            />

            <button className="Extension-Button" type="submit">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExtensionRequest;
