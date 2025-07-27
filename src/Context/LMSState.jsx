import React, { useEffect, useRef, useState } from "react";
import LMSContext from "./LMSContext.jsx";
import axios from "axios";
import config from "../config.js";

const LMSState = (props) => {
  const [menubt, setMenubt] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [readBookCount, setReadBookCount] = useState(0);
  const [allottedBooks, setAllottedBooks] = useState([]);
  const [allottedBookNo, setAllottedBookNo] = useState(0);
  const [penaltyData, setPenaltyData] = useState({});
  const [ExtensionRequestHistoryData, setExtensionRequestHistoyData] =
    useState();
  const [extensionRequestNo, setExtensionRequestNo] = useState(0);
  const [role, setRole] = useState("");

  const [book, setBook] = useState();
  console.log(config.apiBaseUrl)
  const apiUrl= `${config.apiBaseUrl}`;

  const [allExtensionRequests, setAllExtensionRequests] = useState();

  const fetchUserAndData = async () => {
    try {
      //  Verify token
      const tokenRes = await axios.get(
        `${apiUrl}/api/verifyToken`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!tokenRes.data.isAuthenticated) {
        setIsAuthenticated(false);
        return;
      }

      // console.log(tokenRes.data.role)
      setIsAuthenticated(true);
      setRole(tokenRes.data.role);

      // Fetch user data
      const userRes = await axios.get(
        `${apiUrl}/api/user/getUserData`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const userData = userRes.data.LMSuser;
      setUser(userData);

      if (tokenRes.data.role === "student") {
        setReadBookCount([...new Set(userData.returnedBooks)].length);

        //  Fetch 3 APIs in parallel
        const [booksRes, penaltyRes, extensionRes] = await Promise.all([
          axios.get(
            `${apiUrl}/api/allottedBooks/getAllottedBooksById`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          ),
          axios.get(
            `${apiUrl}/api/allottedBooks/getPenaltyBooksById`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          ),
          axios.get(
            `${apiUrl}/api/extensionRequests/getRequestsData`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          ),
        ]);

        //  Set all states
        const bookDetails = booksRes.data.bookDetailsResponse;
        setAllottedBooks(bookDetails);
        setAllottedBookNo(bookDetails?.length);

        setPenaltyData(penaltyRes.data);

        // console.log(extensionRes)

        const extensionRequests =
          extensionRes.data.ExtensionRequestData?.filter((Book) => {
            return Book.status === "Pending" || Book.status === "rejected";
          });
        setExtensionRequestHistoyData(extensionRequests);
        setExtensionRequestNo(extensionRequests?.length);
      }

      if (tokenRes.data.role === "admin") {
        
          
          try {
            const ExtensionRequests = await axios.get(
              `${apiUrl}/api/extensionRequests/getAllRequestsData`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            // console.log(ExtensionRequests.data);

            setTimeout(() => {
              setAllExtensionRequests(ExtensionRequests.data.Requests);
           
            }, 1000);
          } catch (err) {
            setError("Error fetching data");
          }
        


      }
    } catch (err) {
      console.error("Error in LMSState:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndData();
  }, []);

  return (
    <LMSContext.Provider
      value={{
        menubt,
        setMenubt,
        isAuthenticated,
        setIsAuthenticated,
        user,
        loading,
        allottedBookNo,
        allottedBooks,
        readBookCount,
        fetchUser: fetchUserAndData,
        penaltyData,
        ExtensionRequestHistoryData,
        extensionRequestNo,
        role,
        book,
        setBook,
        allExtensionRequests, 
        setAllExtensionRequests,
        apiUrl,
      }}
    >
      {props.children}
    </LMSContext.Provider>
  );
};

export default LMSState;
