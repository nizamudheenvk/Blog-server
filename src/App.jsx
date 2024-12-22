

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Blogs from './pages/Blogs'
import Dashbord from './pages/Dashbord'
import First from './pages/First'
import { useContext } from 'react'
import Pnf from './pages/Pnf'
import { tokenconText } from './tokenAuth/TokenAuth'




function App() {
const {authorizrdUser,setAuthorizedUser} = useContext(tokenconText)
  return (
    <>
    <Routes>
    <Route path='/' element={<First/>}/> 
    <Route path='/login' element={<Auth/>}/> 
    <Route path='/register' element={<Auth insideRegister={true}/>}/>
   { 
    authorizrdUser&&
    <>
     <Route path='/dashbord' element={<Dashbord/>}/>
    <Route path='/blogs' element={<Blogs/>}/>
    </>}
    <Route path='/*' element={<Pnf/>}/>

    </Routes>
    
  
     
    </>
  )
}

export default App
