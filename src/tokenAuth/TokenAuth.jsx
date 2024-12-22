import React, { createContext, useEffect, useState } from 'react'
export const tokenconText = createContext()

const TokenAuth = ({children}) => {
    const [authorizrdUser,setAuthorizedUser]=useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setAuthorizedUser(true)
        }else{
            setAuthorizedUser(false)
        }

    },[authorizrdUser])
  return (
    <tokenconText.Provider value={{authorizrdUser,setAuthorizedUser}}>
    {children}
    </tokenconText.Provider>
  )
    
}

export default TokenAuth