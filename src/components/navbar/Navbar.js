import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css'
import {FaClipboardList, FaTrashAlt} from 'react-icons/fa'


function Navbar() {
 const activeLink={
   color:"white",
 
   fontWeight:"bold"
 };
 const inactiveLink={
  color:"black"
 
 
 
 };
return (
<nav className="navbar navbar-expand-sm bg-body-tertiary">
  <div className="container-fluid">
  <img className="image" src="https://thumbs.dreamstime.com/b/to-do-list-colored-outline-icon-vector-checklist-symbol-to-do-list-colored-outline-icon-vector-checklist-concept-symbol-logo-117289054.jpg" alt="" width="80px" height="50px"></img>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <NavLink className="nav-link  fs-5 " 
          style={({isActive })=>{
            return isActive?activeLink:inactiveLink; 
          }
        } 
         to="/users"><FaClipboardList className='todo-icon'/>Todolist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fs-5 " 
          style={({isActive })=>{
            return isActive?activeLink:inactiveLink; 
          }
        } 
          to="/removedusers"><FaTrashAlt className='removedtodo-icon'/>RemovedTodos
          </NavLink>
        </li>
       
        
        
      </ul>
     
    </div>
  </div>
</nav>
    )
}

export default Navbar;

