import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//Layouts
import StudentLayout from "./Layouts/studentLayout.jsx";
import AdminLayout from "./Layouts/adminLayout.jsx";

//Student Pages
import Dashboard from "./Pages/Students/Dashboard.jsx";
import AllottedBooks from "./Pages/Students/AllottedBooks.jsx";
import SearchBook from "./Pages/Students/SearchBook.jsx";
import Penalty from "./Pages/Students/Penalty.jsx";
import ExtensionRequest from "./Pages/Students/ExtensionRequest.jsx";

import Login from "./Pages/Login.jsx";

//Admin Page
import AddNewBook from "./Pages/Admin/AddNewBook.jsx";
import SearchBooks from "./Pages/Admin/searchBooks.jsx";
import ExtensionRequests from "./Pages/Admin/ExtensionRequests.jsx";
import Register from "./Pages/Register.jsx";
import LMSContext from "./Context/LMSContext.jsx";
import BooksCompleted from "./Pages/Students/BooksCompleted.jsx";
import ExtensionRequestHistory from "./Pages/Students/ExtensionRequestHistory.jsx";
import RoleRoute from "./Pages/RoleRoute.jsx";
import BookAllottment from "./Pages/Admin/BookAllottment.jsx";
import AllotBook from "./Pages/Admin/AllotBook.jsx";
import ChangePenaltyAmount from "./Pages/Admin/ChangePenaltyAmount.jsx";
import AddNewStudent from "./Pages/Admin/addNewStudent.jsx";


const App = () => {

  const { isAuthenticated, loading, role } = useContext(LMSContext);

  // useEffect(() => {
  //   console.log(isAuthenticated)

  // }, [isAuthenticated])

  if (loading) return <div>Loading authentication...</div>; //

  return (
    <>
      <Routes>
         <Route path="/" element={<Navigate to="/loginPage" replace />} />
        <Route path="/RegisterPage" element={<Register />} />
        <Route path="/loginPage" element={<Login />} />

        <Route
          element={
            <RoleRoute
              isAuthenticated={isAuthenticated}
              role={role}
              allowedRoles={["student"]}
            />
          }
        >
          <Route element={<StudentLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allottedBooks" element={<AllottedBooks />} />
            <Route path="/searchBooks" element={<SearchBook />} />
            <Route path="/penalty" element={<Penalty />} />
            <Route path="/extensionRequest" element={<ExtensionRequest />} />
            <Route path="/booksCompleted" element={<BooksCompleted />} />
            <Route
              path="/extensionRequestStatus"
              element={<ExtensionRequestHistory />}
            />
          </Route>
        </Route>

        <Route
          element={
            <RoleRoute
              isAuthenticated={isAuthenticated}
              role={role}
              allowedRoles={["admin"]}
            />
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="addNewBook" element={<AddNewBook />} />
            <Route path="bookAllottment" element={<BookAllottment />} />
            <Route path="searchBooks" element={<SearchBooks />} />
            <Route path="extensionRequests" element={<ExtensionRequests />} />
            <Route path="allotBook" element={<AllotBook/>}/>
            <Route
              path="changePenaltyPerDay"
              element={<ChangePenaltyAmount />}
            />
            <Route path="addNewStudent" element={<AddNewStudent />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
