import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Message = ({message="Pls login......"}) => {
    const nevigate=useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            nevigate("/login"); // Redirect to login after 2 seconds
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout
    }, [nevigate]);
  return (
    <div className='text-center d-flex justify-content-center align-items-center fade-in '  style={{width:'100%', height:'100vh', backgroundColor: ''}}>
        <div className=' d-flex justify-content-center align-items-center bg-info text-white ' style={{padding:'5rem 4rem '}}>

        <h1>{message}</h1>
        </div>
    </div>
  )
}

export default Message
