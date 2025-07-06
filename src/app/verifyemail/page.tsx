"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
export default function VerifyEmailPage() {
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)
    
    const verifyUserEmail = async () =>{
            try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
            setError(false)
        }
    
catch (err:any) {
    setError(true)
    console.log(err.response.data);
}
    }
    useEffect(()=>{
       const urlToken =  window.location.search.split("=")[1]
       setToken(urlToken||"")
    //    const {query} = router
    //    const urlTokenTwo = query.token
    },[])
    useEffect(()=>{
        setError(false)
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>{token?`${token}`:"no token"}</h2>
            {verified && (
                <div>you are now verified
                <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div><h2>Error</h2>
                </div>
            )}
        </div>
    )
}

