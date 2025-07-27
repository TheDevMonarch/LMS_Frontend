import React, { useState, useEffect, useContext } from 'react';
import '../../CSS/Admin/ExtensionRequests.css';
import axios from 'axios';  
import LMSContext from '../../Context/LMSContext.jsx';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LMSState from '../../Context/LMSState.jsx';


const ExtensionRequests = () => {
  const [searchURN, setSearchURN] = useState('');
  const [allStudentsData, setAllStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [inputFocused, setInputFocused] = useState(false);


  const { setAllExtensionRequests, allExtensionRequests, apiUrl } = useContext(LMSContext);
  // Load all data on component mount

  
  useEffect(() => {
  setAllStudentsData(allExtensionRequests);
  setFilteredData(allExtensionRequests);
}, [allExtensionRequests]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {

      const ExtensionRequests = await axios.get(`${apiUrl}/api/extensionRequests/getAllRequestsData`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log(ExtensionRequests.data);
      
      setTimeout(() => {
        setAllStudentsData(ExtensionRequests.data.Requests);
        setFilteredData(ExtensionRequests.data.Requests);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchURN.trim()) {
      setFilteredData(allStudentsData);
      setError('');
      return;
    }

    const filtered = allStudentsData?.filter(student => 
      student.URN.toLowerCase().includes(searchURN.toLowerCase())
    );
    
    if (filtered.length === 0) {
      setError('No student found with this URN');
    } else {
      setError('');
    }
    
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchURN('');
    setFilteredData(allStudentsData);
    setError('');
  };

  // Get all pending requests from filtered data
  const getAllPendingRequests = () => {
    const allPending = [];
    filteredData?.forEach(student => {
      const pendingRequests = student.bookRequests?.filter(
        request => request.status === 'Pending' || request.status === 'rejected'
      ) || [];
      
      pendingRequests.forEach(request => {
        allPending.push({
          ...request,
          studentURN: student.URN,
          studentId: student.student_id
        });
      });
    });
    return allPending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const handleApprove = async (bookId, studentId) => {
    // console.log('Approve request:', bookId, 'for student:', studentId);

    const acceptRequest = await axios.post(`${apiUrl}/api/extensionRequests/acceptRequest`, {
      bookId,
      student_id: studentId
    },{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    toast.success(acceptRequest.data.message, {
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
  };

  const handleReject = async(bookId, studentId) => {
    // console.log('Reject request:', bookId, 'for student:', studentId);
    // Add your reject logic here
    const rejectRequest = await axios.post(`${apiUrl}/api/extensionRequests/rejectRequest`, {
      bookId,
      student_id: studentId
    },{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

    });

     toast.warn(rejectRequest.data.message, {
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

  };

  const isDesktop = windowWidth >= 768;
  const allPendingRequests = getAllPendingRequests();



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

      <div className="lms-container">
        <div className="main-wrapper">
        

         
          <div className="search-section">
            <div className="search-container">
              <div className="search-row">
                <div className="input-container">
                  <label className="label">
                    🔍 Search by URN (Leave empty to show all)
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={searchURN}
                    onChange={(e) => setSearchURN(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Enter student URN (e.g., 2023-B-23052005)"
                  />
                </div>
                <div className="button-container">
                  <button
                    className="search-button"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? '🔄 Loading...' : '🔍 Search'}
                  </button>
                  <button
                    className="clear-button"
                    onClick={clearSearch}
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}
            </div>
          </div>

          
          <div className="results-section">
            <h2 className="section-title">
              📋 Pending Book Requests ({allPendingRequests.length})
            </h2>

            {allPendingRequests.length === 0 ? (
              <div className="no-pending-container">
                <div className="no-pending-icon">📚</div>
                <h3>No pending book requests found</h3>
                <p>All requests have been processed or no students have made requests yet.</p>
              </div>
            ) : (
              <>
                <div className="requests-list">
                  {allPendingRequests.map((request) => (
                    <div
                      key={`${request.studentURN}-${request._id}`}
                      className="request-card"
                    >
                      <h4 className="request-title">
                        📖 {request.bookTitle}
                      </h4>
                      
                      <div className="student-info">
                        👤 {request.studentURN}
                      </div>
                      
                      <div className="request-details">
                        <div>📅 Borrow: {request.borrowDate}</div>
                        <div>📅 Return: {request.returnDate}</div>
                        <div>⏰ Duration: {request.NoOfDays} days</div>
                        <div>🆔 Book ID: {request.bookId}</div>
                      </div>

                      <div className="request-meta">
                        📝 Requested: {formatDate(request.createdAt)}
                      </div>

                      <span className="status-badge">
                        ⏳ {request.status}
                      </span>
                      
                      <div className="action-buttons">
                        <button 
                          className="action-button approve-button"
                          onClick={() => handleApprove(request.bookId, request.studentId)}
                        >
                          ✅ Approve
                        </button>
                        <button 
                          className="action-button reject-button"
                          onClick={() => handleReject(request.bookId, request.studentId)}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                
                <div className="summary">
                  📊 <strong>Total Students:</strong> {filteredData?.length} | 
                  <strong className="summary-pending"> Pending Requests:</strong> {allPendingRequests.length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtensionRequests;