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
        <Link onClick={()=>setMenubt(!menubt)} to="/dashboard"  >
          <li  className={`sidebar-list ${(location==='/dashboard')?'selected-tab':''}`}>
            <i className="fa-solid fa-border-all"></i>
            <span>dashboard</span>
         </li>
        </Link>
        
        <Link onClick={()=>setMenubt(!menubt)} to="/allottedBooks"> 
          <li className={`sidebar-list ${(location==='/allottedBooks')?'selected-tab':''}`}>
            <i className="fa-solid fa-book"></i>
            <span>allotted books</span>
          </li>
        </Link>

        <Link onClick={()=>setMenubt(!menubt)} to="/searchBooks">
          <li className={`sidebar-list ${(location==='/searchBooks')?'selected-tab':''}`}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search books</span>
          </li>
        </Link>

        <Link onClick={()=>setMenubt(!menubt)} to="/penalty">
          <li className={`sidebar-list ${(location==='/penalty')?'selected-tab':''}`}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>Penalty</span>
          </li>
        </Link>
 
        <Link onClick={()=>setMenubt(!menubt)} to="/extensionRequest">
          <li className={`sidebar-list ${(location==='/extensionRequest')?'selected-tab':''}`}>
            <i className="fa-solid fa-hourglass-end"></i>
            <span>extention request</span>
          </li>
        </Link>

      </ul>
    </aside>
  )
}

export default Sidebar