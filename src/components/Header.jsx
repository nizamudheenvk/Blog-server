import React, { useContext } from 'react'
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
// import { tokenContext } from '../context/tokenAuth';
// import { tokenContext } from '../context/tokenAuth';



const Header = () => {
  // const {authorizesUser,setAuthorizedUser}= useContext(tokenContext)
    const navigate = useNavigate()
    const logout=()=>{
        sessionStorage.clear()
        // setAuthorizedUser(false)
        navigate('/')
    }

  return (
    <Navbar style={{ zIndex: "1", height: "8vh" }} className="bg-dark position-fixed w-100">
    <Container className='d-flex flex-wrap justify-content-between align-items-center'>
      <Link to={'/'} style={{ textDecoration: "none" }}>
        <Navbar.Brand  className='fs-5 fw-bolder text-warning'>
          <i className='fa-solid fa-blog me-2'></i>
          Blog
        </Navbar.Brand>
      </Link>
<button onClick={logout} className='btn btn-warning'>Logout</button>
    </Container>
  </Navbar>
  )
}

export default Header