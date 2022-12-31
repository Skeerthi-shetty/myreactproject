import React from 'react'
import {NavLink} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar1.css'
function Navbar1() {
  return (
    <div>
       <Navbar bg="dark" variant="dark">
      
          <Navbar.Brand href="#home">
           <img className="image " src="https://thumbs.dreamstime.com/b/to-do-list-colored-outline-icon-vector-checklist-symbol-to-do-list-colored-outline-icon-vector-checklist-concept-symbol-logo-117289054.jpg" alt="" width="90px" height="60px"></img>
          </Navbar.Brand>
          <Navbar.Brand href="#name" className='app-logo-name fs-3' style={{color:"pink"}}>
             To Do App
          </Navbar.Brand>
          <Nav className="ms-auto gap-4 mx-4">
            <NavLink to="/addtodos" className='fs-5  links' style={{color:"pink"}}>Add Todos</NavLink>
            <NavLink to="/addtodos" className='fs-5  links' style={{color:"pink"}}>Analysis</NavLink>
            
         
            
          </Nav>
       
      </Navbar>
    </div>
  )
}

export default Navbar1
