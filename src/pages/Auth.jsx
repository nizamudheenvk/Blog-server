import React, { useContext, useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registrApi } from '../services/allApi'
import { tokenContext } from '../context/tokenAuth'
// import { tokenContext } from '../context/tokenAuth'

const Auth = ({ insideRegister }) => {
 const {authorizesUser,setAuthorizedUser}=useContext(tokenContext)
  const naviagte = useNavigate()
  const [islogin, setIslogin] = useState(false)
  const [userinput, setUserInput] = useState({
    username: "", email: "", password: ""
  })

  const register = async (e) => {
    e.preventDefault()
    if (userinput.username && userinput.email && userinput.password) {
      // api call
      try {
        const result = await registrApi(userinput)
        if (result.status == 200) {
          alert(`Welcome ${result.data?.username}, PLEASE LOGIN TO EXPLORE THE BLOG`)
          naviagte("/login")
          setUserInput({ username: "", email: "", password: "" })
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setUserInput({ username: "", email: "", password: "" })
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completely")
    }
  }

  const login = async (e) => {
    e.preventDefault()
    if (userinput.email && userinput.password) {
      // api call
      try {
        const result = await loginApi(userinput)
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIslogin(true)
         setAuthorizedUser(true)
          setTimeout(() => {
            naviagte("/")
            setUserInput({ username: "", email: "", password: "" })
          }, 2000)
        } else {
          if (result.response.status == 404) {
            alert(result.response.data)
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completely")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(145deg, #2b2b2b, #121212)' }}>
      <div className="container w-75 card shadow p-3 rounded" style={{ background: 'rgba(0, 0, 0, 0.75)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)', borderRadius: '12px' }}>
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <img
              src="https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg"
              alt=""
              className="img-fluid rounded"
              style={{ borderRadius: '10px', filter: 'brightness(80%)' }}
            />
          </div>
          {/* Form Section */}
          <div className="col-12 col-md-6 text-light">
            <h5 className="mb-4">{insideRegister ? 'Create your account' : 'Sign In'}</h5>
            <Form>
              {insideRegister && (
                <FloatingLabel controlId="floatingInputUsername" label="Username" className='mb-3'>
                  <Form.Control
                    value={userinput.username}
                    onChange={e => setUserInput({ ...userinput, username: e.target.value })}
                    type="text"
                    placeholder="Username"
                    className="bg-dark text-light border-0"
                  />
                </FloatingLabel>
              )}
              <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
                <Form.Control
                  value={userinput.email}
                  onChange={e => setUserInput({ ...userinput, email: e.target.value })}
                  type="email"
                  placeholder="Email"
                  className="bg-dark text-light border-0"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                  value={userinput.password}
                  onChange={e => setUserInput({ ...userinput, password: e.target.value })}
                  type="password"
                  placeholder="Password"
                  className="bg-dark text-light border-0"
                />
              </FloatingLabel>

              {insideRegister ? (
                <div className="mt-3">
                  <button onClick={register} className="btn btn-warning w-100 py-2">Register</button>
                  <p className="mt-2">Already a user? <Link to={'/login'} className="text-warning">Login here</Link></p>
                </div>
              ) : (
                <div className="mt-3">
                  <button onClick={login} className="btn btn-warning w-100 py-2 d-flex align-items-center justify-content-center">
                    Login
                    {islogin && <Spinner animation="border" variant="light" className="ms-2" />}
                  </button>
                  <p className="mt-2">New user? <Link to={'/register'} className="text-warning">Register here</Link></p>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
