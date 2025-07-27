import React, { useContext } from 'react'
import '../../CSS/Students/sidebar.css'
import LMSContext from '../../Context/LMSContext.jsx'
import { Link, useLocation } from 'react-router-dom'

  
const Sidebar = () => {
    
    const location = useLocation().pathname

    const {menubt,setMenubt} = useContext(LMSContext)

  return (
    <aside className={`sidebar ${(menubt)?`show`:''}`}>
      <div className="website-name">
        Library Management System
      </div>

      <ul>
        <Link onClick={()=>setMenubt(!menubt)} to="/admin/addNewBook"  >
          <li  className={`sidebar-list ${(location==='/admin/addNewBook')?'selected-tab':''}`}>
            <i className="fa-solid fa-book-medical"></i>
            <span>Add New Book</span>
         </li>
        </Link>

        <Link onClick={()=>setMenubt(!menubt)} to="/admin/searchBooks">
          <li className={`sidebar-list ${(location==='/admin/searchBooks')?'selected-tab':''}`}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search books</span>
          </li>
        </Link>

        <Link onClick={()=>setMenubt(!menubt)} to="/admin/bookAllottment">
          <li className={`sidebar-list ${(location==='/admin/bookAllottment')?'selected-tab':''}`}>
            <i className="fa-solid fa-clipboard-list"></i>
            <span>Book Allottment Data</span>
          </li>
        </Link>

 
        <Link onClick={()=>setMenubt(!menubt)} to="/admin/extensionRequests">
          <li className={`sidebar-list ${(location==='/admin/extensionRequests')?'selected-tab':''}`}>
            <i className="fa-solid fa-hourglass-half"></i>
            <span>extention request</span>
          </li>
        </Link>

        <Link onClick={()=>setMenubt(!menubt)} to="/admin/changePenaltyPerDay">
          <li className={`sidebar-list ${(location==='/admin/changePenaltyPerDay')?'selected-tab':''}`}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>Penalty Per Day</span>
          </li>
        </Link>

        <Link onClick={()=>setMenubt(!menubt)} to="/admin/addNewStudent">
          <li className={`sidebar-list ${(location==='/admin/addNewStudent')?'selected-tab':''}`}>
            <i className="fa-solid fa-user-plus"></i>
            <span>Add New Student</span>
          </li>
        </Link>

      </ul>
    </aside>
  )
}

export default Sidebar