import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div style={{height:"100vh"}} className='d-flex justify-content-center align-items-center flex-column'>
        <img className='img-fluid' src="https://media0.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif" alt="" />
        <h1>Look Like You're Lost</h1>
        <p>The page your looking for is not available</p>
        <Link  to={'/'}className="button btn btn-warning">Go To Home</Link>
    </div>
  )
}

export default Pnf