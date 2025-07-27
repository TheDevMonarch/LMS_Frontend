import AdminNavbar from "../Components/Admin/Navbar.jsx";
import AdminSidebar from "../Components/Admin/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
