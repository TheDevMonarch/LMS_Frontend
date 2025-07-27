import React, { useContext, useState } from 'react';
import '../../CSS/Admin/AddNewStudent.css';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LMSContext from '../../Context/LMSContext.jsx';

const AddNewStudent = () =>{
  const { apiUrl } = useContext(LMSContext);
  const [formData, setFormData] = useState({
    urn: '',
    name: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };



  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
     const newStudent = await axios.post(`${apiUrl}/students/`, {
        URN: formData.urn,
        name: formData.name
      }, {
        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials: true
     }, );

    //  console.log(newStudent)
      

     toast.success(newStudent.data.message, {
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
      toast.error(error.response.data.message, {
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
    } finally {
      setIsSubmitting(false);
       setFormData({
        urn: '',
        name: ''
      });
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

      <div className="container">

      
        <div className="main-content">
          <div className="form-container">
            <h1 className="form-title">Add New Student</h1>
            
          
            <div className="form-group">
              <label className="form-label" htmlFor="urn">
                Student URN
              </label>
              <input
                type="text"
                id="urn"
                name="urn"
                value={formData.urn}
                onChange={handleInputChange}
                placeholder="Enter student URN"
                className={`form-input ${errors.urn ? 'error' : ''}`}
                required
              />
              {errors.urn && <div className="error-message">{errors.urn}</div>}
            </div>

          
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Student Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                required
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting && <div className="loading-spinner"></div>}
              {isSubmitting ? 'Adding Student...' : 'Add Student'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewStudent;