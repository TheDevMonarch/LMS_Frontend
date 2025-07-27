import React, { useState, useEffect, useContext } from 'react';
import '../../CSS/Admin/SearchBooks.css'
import axios from 'axios';
import StudentCard from '../../Components/Admin/StudentCard.jsx';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LMSContext from '../../Context/LMSContext.jsx';

const BookAllottment = () => {
  const { apiUrl } = useContext(LMSContext);
  const [studentsData, setStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

   const [message, setMessage] = useState({text:'', status:''})

    useEffect(() => {

      if(message.text?.trim()){
        if(message.status){
          toast.success(message.text, {
        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
        }
        else{
          toast.warn(message.text, {
        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
        }

    }

    setMessage('')
      
    }, [message])


  useEffect(() => {

     const fetchBookAllottmentData = async()=>{
      try {
      let bookAllottements = await axios.get(`${apiUrl}/api/allottedBooks/getAllottedBooksData`, {
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })

      const filteredData = bookAllottements?.data.updatedData.filter(student => student.books.length > 0);

      setStudentsData(filteredData);
      setFilteredData(filteredData);
    } catch (error) {
      console.log(error)
    }
     }
    
    fetchBookAllottmentData();

    
  }, []);



  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredData(studentsData);
    } else {
      const filtered = studentsData.filter(student => {
        const studentMatch = student.URN.toLowerCase().includes(value.toLowerCase());
        
        const bookMatch = student.books.some(book => 
          book.BookDetail.title.toLowerCase().includes(value.toLowerCase()) ||
          book.BookDetail.authorName.toLowerCase().includes(value.toLowerCase()) ||
          book.BookDetail.category.toLowerCase().includes(value.toLowerCase())
        );
        
        return studentMatch || bookMatch;
      });
      setFilteredData(filtered);
    }
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
    <div className="app-container">
      

      
      <div className="container">
        <h1 className="page-title">Student Book Allotments</h1>
        
       
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Student URN, or book title..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Students Container */}
        <div>
          {filteredData.length === 0 ? (
            <div className="no-data">No book allotments found</div>
          ) : (
            filteredData.map((student, index) => (
              <StudentCard key={student._id || index} student={student} setMessage={setMessage}/>
            ))
          )}
        </div>
      </div>
    </div>
    </>
    
  );
};

export default BookAllottment;