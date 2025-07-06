"use client"

import React from 'react'


export default function Page({params}:any) {
    const { id }:any = React.use(params);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile Page</h1>
            <h2 className='p-3 bg-green-500 rounded text-black'>{id}</h2>
        </div>
    )
}

