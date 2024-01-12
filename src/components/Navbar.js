import React from 'react'
import { Link } from "react-router-dom"
import './Navbar.css'

function Navbar() {
  
  return (
    <div className='nav'>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
      <div className="container">
        <h1 className='my-auto'>
          <Link to="/" className="navbar-brand fs-1">CampusGala</Link>
        </h1>
          
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label='Toggle Navbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
  
        <div className="collapse navbar-collapse" id='navbarNav'>
          <div className="mx-auto"></div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/about'>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/events'>Events</Link>
            </li>
            <li className="nav-item my-auto mx-2 user">
              <Link className="nav-link-user" to='/about'>SignUp</Link>
            </li>
            <li className="nav-item my-auto mx-2 user">
              <Link className="nav-link-user" to='/events'>Login</Link>
            </li>
        
          </ul>
          
        </div>
      </div>
    </nav> 
  </div>
  
  )
}

export default Navbar
