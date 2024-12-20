import React, { createContext, useEffect, useState } from 'react'
export const tokenContext = createContext("")

const tokenAuth = ({children}) => {
    const [authorizesUser,setAuthorizedUser]=useState("")
    useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setAuthorizedUser(true)
    }else{
        setAuthorizedUser(false)
    }
    },[authorizesUser])
  return (
    <tokenContext.Provider value={{authorizesUser,setAuthorizedUser}}>
   {children}
    </tokenContext.Provider>
  )
}

export default tokenAuth