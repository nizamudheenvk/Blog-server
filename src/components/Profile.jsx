import React, { useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import SERVER_BASE_URL from '../services/serverUrl';
import upldimg from '../assets/uploadimg.jpg'
import { updateUserApi } from '../services/allApi';




const Profile = () => {
  const [preview,setPreview]=useState("")
  const [exisitingProfil,setExistingProfile]=useState("")
  const [userDetails , setUserDetails]=useState({
    username:"",email:"",password:"",profilepic:""
  })
  console.log(userDetails);
  
    const [open,setOpen] = useState(false);
    useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,
      })
      setExistingProfile(user.profilepic)
    }
    },[open])
    
    useEffect(()=>{
      if(userDetails.profilepic){
        setPreview(URL.createObjectURL(userDetails.profilepic))
      }else{
        setPreview("")
      }

    },[userDetails.profilepic])

    const handleUserUpdate =async()=>{
      const {username,email,password,profilepic}=userDetails
      if(username){
        const reqBody =new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
       preview? reqBody.append("profilepic",profilepic): reqBody.append("profilepic",exisitingProfil)
// reqHeader
     const token = sessionStorage.getItem("token")
     if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      // api call
      try{
        const result = await updateUserApi(reqBody,reqHeader)
        if(result.status==200){
          // alert
          alert("user profile updated successfully")
          sessionStorage.setItem("user",JSON.stringify(result.data))
          setOpen(!open)


        }


      }catch(err){
        console.log(err);
        
      }
     }



      }else{
        alert("please fill the form")
      }
    }

  return (
    <>

   <div className="d-flex justify-content-evenly">
    <h3 className='text-warning'>Profile</h3>
    <button onClick={()=>setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
   </div>
   <Collapse in={open}>
        <div className='row container-fluid align-items-center justify-content-center
        shadow p-2 rounded'  id="example-collapse-text">

          {/* upload photo */}
          <label className='text-center'>
          <input onChange={e=>setUserDetails({...userDetails,profilepic:e.target.files[0]})} style={{display:"none"}} type="file" />
        
        {
          exisitingProfil==""?
          <img width={'200px'} height={'200px'} src={preview?preview:upldimg} alt="" />
          :
          <img width={'200px'} height={'200px'} src={preview?preview:`${SERVER_BASE_URL}/uploads/${exisitingProfil}`} alt="" />
        }
          
         
         
          </label>
          <div className="mb-2 w-100 mt-2">
            <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})}  type="text" placeholder='user github Link' className="form-control" />
          </div>
         
          <div className='d-grid w-100'>
            <button onClick={handleUserUpdate}  className='btn btn-warning'>Update</button>
          </div>
        </div>
      </Collapse>
   </>
  )
}

export default Profile