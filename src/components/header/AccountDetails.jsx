import React, {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdAccountCircle } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { RiCoupon4Line } from "react-icons/ri";
import { MdCardGiftcard } from "react-icons/md";
import { SiBitcoinsv } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { FaFirstOrder } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";

import { BsFillCartPlusFill } from "react-icons/bs";
import { logout } from '../../reduxToolKit/userAuthSlice';
import { useNavigate } from 'react-router-dom';
const AccountDetails = () => {
    const nevigate=useNavigate()
    const isLogin=useSelector((store)=>store.auth)
    console.log("this is accout section", isLogin.singleUser.id)
   
            const [show, setShow] = useState(false);
            const dropdownRef = useRef(null);
        
            // Close dropdown if clicked outside
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setShow(false);
                }
            };
        
            useEffect(() => {
                document.addEventListener("click", handleClickOutside);
                return () => {
                    document.removeEventListener("click", handleClickOutside);
                };
            }, []);
            const dispatch=useDispatch()
  return (
    <div
    ref={dropdownRef}
    className="d-inline-block"
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
>   
    {/* Hoverable area */}
  <div className="custom-dropdown-trigger px-2 cursor-pointer">
     
           
                <div className="  link-115 p-0 d-flex justify-content-center align-items-center" >
                    {isLogin.singleUser.image?
                    <img src={isLogin.singleUser.image} alt="" className='p-0 m-0 d-flex justify-content-end align-items-center rounded-circle mb-2 me-2 border border-3'
                    style={{width:'40px', height:'40px' }} />  :

                    <p className="px-2 fs-5 mb-3 cursor-pointer text-white"><MdAccountCircle/></p>
                }
                    
                  <p>
                  { isLogin.singleUser.first_namee}
                    </p> 
                    <p  className="  p-0  cursor-pointer responsive-text text-white m">{isLogin.singleUser.first_name} {isLogin.singleUser.last_name}</p>
                </div>
           
       
    </div>
    

    {/* Dropdown Menu */}
    <Dropdown show={show}>
        <Dropdown.Menu className="custom-dropdown">
        
                <Dropdown.Item 
                    onClick={()=>{
                        nevigate('/myprofile/home')
                    }}
                >
                     <MdAccountCircle /> My Profile
                </Dropdown.Item>
                <Dropdown.Item >
                     <FaFirstOrder /> Order
                </Dropdown.Item>
                <Dropdown.Item 
                onClick={()=>{
                    nevigate('/myprofile/wishlist')
                }}
                >
                     <CiHeart /> Wish List
                </Dropdown.Item>
                <Dropdown.Item >
                     <MdCardGiftcard /> Gift Card
                </Dropdown.Item>
                <Dropdown.Item >
                     <RiCoupon4Line /> Coupons
                </Dropdown.Item>
                <Dropdown.Item >
                     <SiBitcoinsv /> Super Coin
                </Dropdown.Item>
                <Dropdown.Item >
                     <IoIosNotificationsOutline />Notification
                </Dropdown.Item>
     
                <Dropdown.Item onClick={()=>{ 
                    dispatch(logout()) 
                    nevigate('/login')}}>
                     <CiLogout />Logout
                </Dropdown.Item>
                
            
        
        </Dropdown.Menu>
    </Dropdown>
</div>
  )
}

export default AccountDetails
