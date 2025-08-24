import React, { useState } from 'react'
import { MdBorderOuter } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import { useSelector } from 'react-redux';
const MyProfile = () => {

    const [showmyprofile, setMyprofile] = useState(false)
    const isLogin = useSelector((store) => store.auth)


    return (
        // <div className='d-flex justify-content-between align-items-center'>
        <div className={` bg-danger myprofilepage position-relative d-flex justify-content-center align-items-start gap-3 `}
            style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', cursor: 'pointer', padding: '0rem 9rem', }}>
            <div
            // style={{width:'25%'}}
            className={`shadow-lg my-3   myProfile text-start top-0 start-10 bg-white pb-5 p-3 m-0 pt-4 d-flex justify-content-start align-items-start gap-4     flex-column ${showmyprofile ? 'myProfileHover' : ''}`}>
                <div>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <img src={isLogin?.singleUser?.id ? isLogin.singleUser.image : "User ID not available yet"}
                            alt="" className='  border border-2' style={{ width: '50px', borderRadius: '50% ', }} />
                        <div>
                            <p className='p-0 m-0 text-secondary'>Hello,</p>
                            <h4 className='p-0 m-0 usernamefontfamily py-2' style={{ fontSize: '.8rem' }}>{isLogin?.singleUser?.id ? isLogin.singleUser.first_name + " " + isLogin.singleUser.last_name : "User ID not available yet"}</h4>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <MdBorderOuter className='fs-5' />
                        <h4 className='p-0 m-0 fontHeading' style={{ fontSize: '1.2rem' }}>MY ORDERS</h4>
                    </div>
                    <FaArrowRight />
                </div>
                <div>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <MdManageAccounts className='fs-5' />
                        <h4 className='p-0 m-0 fontHeading' style={{ fontSize: '1.2rem' }}>MY ACCOUNT SETTINGS</h4>
                    </div>
                    <div className='ps-4 py-3'>
                        <p className='p-0 m-0 text-secondary'>profile informations</p>
                        <p className='p-0 m-0 text-secondary'>Manage addresses</p>
                        <p className='p-0 m-0 text-secondary'>PAN card information</p>
                    </div>
                </div>
                <div className='w-100'>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <MdPayments className='fs-5' />
                        <h4 className='p-0 m-0 text-secondary fontHeading'  style={{ fontSize: '1.2rem' }}>PAYMENTS</h4>
                    </div>
                    <div className='ps-4 py-3 w-100'>
                        <div className='d-flex justify-content-between align-items-center w-100'>
                            <p className='p-0 m-0 text-secondary'>Gift card</p>
                            <span className='p-0 m-0 text-secondary'><FaRupeeSign /> 0</span>
                        </div>
                        <p className='p-0 m-0 text-secondary'>Saved UPI </p>
                        <p className='p-0 m-0 text-secondary'>Saved card</p>
                    </div>
                </div>
                <div>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <MdSupervisorAccount className='fs-5' />
                        <h4 className='p-0 m-0 fontHeading' style={{ fontSize: '1.2rem' }}>MY STUFF</h4>
                    </div>
                    <div className='ps-4 py-3'>
                        <p className='p-0 m-0 text-secondary'>My coupon </p>
                        <p className='p-0 m-0 text-secondary'>My reviews and rating</p>
                        <p className='p-0 m-0 text-secondary'>My notification </p>
                        <p className='p-0 m-0 text-secondary'>Ny wishlist</p>
                    </div>
                </div>
                <div>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <AiOutlineLogout className='fs-5' />
                        <h4 className='p-0 m-0 fontHeading' style={{ fontSize: '1.2rem' }}>LOGOUT</h4>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-between align-items-center gap-2 position-relative '>
                    <div className='w-100'>
                        <Outlet />
                    </div>

                    <VscThreeBars className='fs-3 me-3 fs-1 mb-3 position-absolute end-0 top-0 m-3 mt-4 '
                        onClick={() => {
                            setMyprofile((prev) => !prev)
                        }}
                    />
                </div>



            </div>
        </div>

    )
}

export default MyProfile
