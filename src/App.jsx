

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Blogs from './pages/Blogs'
import Dashbord from './pages/Dashbord'
import First from './pages/First'
import { useContext } from 'react'
import { tokenContext } from './context/tokenAuth'
import Pnf from './pages/Pnf'




function App() {
 const {authorizesUser,setAuthorizedUser}=useContext(tokenContext)

  return (
    <>
    <Routes>
    <Route path='/' element={<First/>}/> 
    <Route path='/login' element={<Auth/>}/> 
    <Route path='/register' element={<Auth insideRegister={true}/>}/>
   {authorizesUser && <>
     <Route path='/dashbord' element={<Dashbord/>}/>
    <Route path='/blogs' element={<Blogs/>}/>
    </>}
    <Route path='/*' element={<Pnf/>}/>

    </Routes>
    
  
     
    </>
  )
}

export default App
