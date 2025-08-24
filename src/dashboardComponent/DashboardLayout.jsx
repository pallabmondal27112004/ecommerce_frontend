import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './Dashboardsidebar'
const DashboardLayout = () => {
  return (
    <div 
    style={{background: 'linear-gradient(to right,rgb(41, 41, 41) 0%, black 100%)'}}
    className=' d-flex justify-content-center align-item-center w-100'>
      {/* <div className='' style={{ width: '20%' }}> */}

        <DashboardSidebar  />
      {/* </div> */}
      <div style={{ width: '80%' }}>

        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
