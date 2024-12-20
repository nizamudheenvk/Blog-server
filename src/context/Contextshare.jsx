import React, { createContext, useState } from 'react'
export const addProjectContext = createContext()
export const editProjectContext = createContext()

const Contextshare = ({children}) => {
    const [addProjectResponse,setAddProjectResponse]=useState("")

    const [editProjectResponse,seteditProjectResponse]=useState("")
  return (
   <addProjectContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
   <editProjectContext.Provider value={{editProjectResponse,seteditProjectResponse}}>
    {children}
    </editProjectContext.Provider>
   </addProjectContext.Provider>
  )
}

export default Contextshare