import React from 'react'
import './Cover.css'
import { Link } from "react-router-dom"

function Cover() {
  return (
    <>
    <div className='banner-image w-100  d-flex justify-content-center align-items-center'>
      <div className='container'>
       <h1 className='cover-heading text-white text-center'>COLLEGE FEST</h1>
       <button  className='row mx-auto rounded-3'><Link className='cover-button'  to="/event-request">List Your College Fest</Link></button>
       </div>
       
    </div>
    </>
  )
}

export default Cover
