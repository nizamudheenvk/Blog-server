import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import upldimg from '../assets/uploadimg.jpg'
import { Await } from 'react-router-dom'
import { addBlogApi } from '../services/allApi'
import { addProjectContext } from '../context/Contextshare'




const Add = () => {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectContext)
  const [preview,setPreview]=useState("")

  const [uploadfileStatus,setUplodFileStatus]=useState(false)

  const [projectDetails,setProjectDetils]=useState({
    title:"",date:"",description:"",blogImage:""
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
      setShow(false);
     setPreview("")
     setUplodFileStatus(false)
     setProjectDetils({ title:"",date:"",description:"",blogImage:""})
    
    };
    const handleShow = () => setShow(true);

    const handleAddProject = async()=>{
      const {title,date,description,blogImage}=projectDetails
      if(title && date && description && blogImage){
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("date",date)
        reqBody.append("description",description)
        reqBody.append("blogImage",blogImage)

        const token =sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          // api call
          try{
            const result = await addBlogApi(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              alert(`${result?.data?.title} uploaded success fully`)
              handleClose()
              // share result with view component
              setAddProjectResponse(result)
            }else{
              if(result.response.status==406){
              alert(result.response.data)
              }
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
<button onClick={handleShow}  className='btn btn-warning'>+ New Blog</button>

<Modal size='lg' centered  show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
             <label>
              <input onChange={e=>setProjectDetils({...projectDetails,blogImage:e.target.files[0]})}  style={{display:"none"}} type="file" />
              <img height={'200px'} className='img-fluid' src={preview?preview:upldimg}alt="" />
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
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

</>  )
}

export default Add