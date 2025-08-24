import React, { useState } from 'react'
import image from '../../public/imgs/facebook.png'
import { IoSearch } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GrIntegration } from "react-icons/gr";
import { MdArrowForwardIos } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const DashboardSidebar = () => {
  const [isauthenticated, setIsauthenticate] = useState(false)
  return (
    

      <div
      style={{background: 'linear-gradient(to right,rgb(41, 41, 41) 0%, black 100%)', width: '20%' }}
      className=' py-3 d-flex justify-content-start align-items-start px-4 flex-column gap-5 text-start text-white'>
        <span className='d-flex justify-content-center align-items-center w-100'>
          <img src={image} alt="" className='' style={{ width: '20%' }} />
          <h5>ecommerce</h5>
        </span>
        <div className='position-relative'>
          <IoSearch className='position-absolute start-0 top-0 m-2 fs-4 text-black' />
          <input type="text" name="" id="" placeholder='Search for ...' className='form-control ps-5' />


        </div>
        <div className='d-flex justify-content-center align-items-center gap-2'>
          <MdDashboard />
          <h5 className='p-0 m-0'>Dashboard</h5>
        </div>
        <div className='d-flex justify-content-start align-items-center gap-2'>
          <FaProductHunt />
          <h5 className='p-0 m-0'>Products</h5>
        </div>
        <div className='d-flex justify-content-start align-items-center gap-2'>
          <FaUser />
          <h5 className='p-0 m-0'>Users</h5>
        </div>
        <div className='d-flex justify-content-start align-items-center gap-2'>
          <FaFileInvoiceDollar />
          <h5 className='p-0 m-0'>Pricing</h5>
        </div>
        <div className='d-flex justify-content-start align-items-center gap-2'>
          <GrIntegration />
          <h5 className='p-0 m-0'>Integrations</h5>
        </div>

        <hr className='border border-3 fw-bold w-100' />

        <div className='w-100'>


          <div className='d-flex justify-content-between align-items-center w-100'>
            <div className='d-flex justify-content-center
           align-items-center  gap-2'>

              <GrIntegration />
              <h5 className='p-0 m-0'>Authentications</h5>

            </div>
            {isauthenticated ?
              <IoIosArrowDown onClick={() => setIsauthenticate((prev) => !prev)} /> :

              <MdArrowForwardIos onClick={() => setIsauthenticate((prev) => !prev)} />
            }

          </div>
          {isauthenticated ?
            <div className='mt-2'>
              <p>Login</p>
              <p>Logout</p>
            </div> :
            ""}
        </div>

        <div className='d-flex justify-content-start gap-2 align-items-center w-100'>
          <IoSettingsOutline />
          <h5 className='p-0 m-0'>Settings</h5>

        </div>

      </div>


  
  )
}

export default DashboardSidebar
