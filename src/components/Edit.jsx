import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react';
import { Button, Modal } from 'react-bootstrap';
import upldimg from '../assets/uploadimg.jpg'
import SERVER_BASE_URL from '../services/serverUrl';
import { updateBlogApi } from '../services/allApi';
import { editProjectContext } from '../context/Contextshare';



const Edit = ({blog}) => {
  const {editProjectResponse,seteditProjectResponse}=useContext(editProjectContext)

  const [preview,setPreview]=useState("")

  const [uploadfileStatus,setUplodFileStatus]=useState(false)

  const [projectDetails,setProjectDetils]=useState({
    id:blog?._id,title:blog?.title , date:blog?.title , description:blog?.description , blogImage:""
  })

  console.log(projectDetails);


    const [show, setShow] = useState(false);
    useEffect(()=>{
      if(projectDetails.blogImage.type=="image/png" || projectDetails.blogImage.type=="image/jpeg" || projectDetails.blogImage.type=="image/jpg"){
       setUplodFileStatus(true)
       setPreview(URL.createObjectURL(projectDetails.blogImage))
      }else{
        // invalid image file 
        setUplodFileStatus(false)
        setProjectDetils({...projectDetails,blogImage:""})
 
      }
    },[projectDetails.blogImage])

    const handleClose = () =>{
      setShow(false)
      setProjectDetils({
        id:blog?._id,title:blog?.title , date:blog?.title , description:blog?.description , blogImage:""

      })
    }
    const handleShow = () => {
      setShow(true);
      setProjectDetils({
        id:blog?._id,title:blog?.title , date:blog?.title , description:blog?.description , blogImage:""

      })
    }

    const handleUpdateBlog =async()=>{
      const {id,title,date,description,blogImage}=projectDetails
      if(title && date && description){
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("date",date)
        reqBody.append("description",description)
        // 
       preview? reqBody.append("blogImage",blogImage): reqBody.append("blogImage",blog?.blogImage)
       const token =sessionStorage.getItem("token")
       if(token){
         const reqHeader = {
           "Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`
         }
        //  make api call

        try{
           const result = await updateBlogApi(id,reqBody,reqHeader)
           console.log(result);
           if(result.status==200){
            alert("project updated successfully")
            handleClose()
            // share result with view
            seteditProjectResponse(result)
           }
           
        }catch(err){
          console.log(err);
          
        }
        }

      }else{
        alert("please fill the form completely")
      }


    }
    
  
  return (
  <>
  <button onClick={handleShow} className='btn btn-light'><i className='fa-solid fa-edit'></i></button>

  <Modal size='lg' centered  show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <div className="row align-items-center">
                   <div className="col-lg-4">
                    <label>
                     <input onChange={e=>setProjectDetils({...projectDetails,blogImage:e.target.files[0]})}  style={{display:"none"}} type="file" />
                     <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVER_BASE_URL}/uploads/${blog?.blogImage}`}alt="" />
                    </label>
                 {  !uploadfileStatus&& <div className="text-warning">*Upload Only the Following File types(jpeg,jpg,png)Here!!!</div>}
                   </div>
                   <div className="col-lg-8">
                   <div className="mb-2">
                      <input value={projectDetails.title} onChange={e=>setProjectDetils({...projectDetails,title:e.target.value})} type="text" className="form-control" placeholder='Title' />
                     </div> <div className="mb-2">
                      <input value={projectDetails.date} onChange={e=>setProjectDetils({...projectDetails,date:e.target.value})} type="text" className="form-control" placeholder='Date' />
                     </div>
                     <div className="mb-2">
                      <input value={projectDetails.description} onChange={e=>setProjectDetils({...projectDetails,description:e.target.value})} type="text" className="form-control" placeholder='Description' />
                     </div>
                    
                   </div>
                 </div>
                
               </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateBlog} variant="primary">update</Button>
        </Modal.Footer>
      </Modal>


  
  </>
  )
}

export default Edit