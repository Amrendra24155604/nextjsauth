"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const onLogin = async () =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("login success", response.data);
            router.push("/profile")

        } catch (error:any) {
            console.log("SIgnup failed");
            toast.error(error.message)
        }
    }

    
useEffect(()=>{
    if(user.email.length>0&&user.password.length>0){
        setButtonDisabled(false)
    }
    else{
        setButtonDisabled(true)
    }
},[user])
    return (
        <div className='flex flex-col items-center justify-center mb-3 min-h-screen py-2'>
            <h1>{loading?"Processing":"Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input type="email" value={user.email} id="email"
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder='email'
            className='bg-white text-black p-2 rounded-md mb-4 focus:outline-none focus:border-gray-600'
            />
            <label htmlFor="password">password</label>
            <input type="password" value={user.password} id="password"
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='password'
            className='bg-white text-black p-2 rounded-md mb-4 focus:outline-none focus:border-gray-600'
            />
            <button onClick={onLogin} className='focus:outline-none px-9 py-3 border border-white focus:border-gray-600 rounded-lg'>
                {buttonDisabled?"No login":"login"}
            </button>
           
        </div>
    )
}

