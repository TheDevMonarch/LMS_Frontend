import Navbar from "../Components/Students/Navbar.jsx";
import Sidebar from "../Components/Students/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default StudentLayout;
