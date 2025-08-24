import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
    return (
        <div className='footer d-flex justify-content-center align-items-center w-100 flex-wrap m-0 p-2 py-5  text-start bg-dark text-white'>
            <div style={{width:'20%'}}>
                <div  className='d-flex justify-content-center align-items-center py-4'>

            <img src="/imgs/new/logo1.png" alt="" className="" style={{width:'50px', height:'50px', }} />

                <h3 className='text-center'>W- shop</h3>
                </div>
                <div className='w-100 d-flex justify-content-center align-items-center gap-4'>
                    <FaFacebookF className='fs-3'/>
                    <FaTwitterSquare className='fs-3'/>
                    <FaYoutube className='fs-3'/>
                    <FaLinkedinIn className='fs-3'/>
                    <IoLogoInstagram className='fs-3'/>
                </div>
            </div>
            <div style={{width:'20%'}}>

                <h4>Brand name</h4>
                <p className='text-secondary'>About us</p>
                <p className='text-secondary'>Conditions</p>
                <p className='text-secondary'>Our Journals</p>
                <p className='text-secondary'>Careers</p>
                <p className='text-secondary'>Affiliate Programme</p>
                <p className='text-secondary'>Ultras Press</p>
            </div>
            <div style={{width:'20%'}}>
                <h4>Quick Links</h4>
                <p className='text-secondary'>Offers  </p>
                <p className='text-secondary'>Discount Coupons</p>
                <p className='text-secondary'>Stores</p>
                <p className='text-secondary'>Track Order</p>
                <p className='text-secondary'>Shop</p>
                <p className='text-secondary'> Info</p>

            </div>
            <div style={{width:'20%'}}>
                <h4>Customer Service

                </h4>
                <p className='text-secondary'>FAQ</p>
                <p className='text-secondary'>Contact</p>
                <p className='text-secondary'>Privacy Policy</p>
                <p className='text-secondary'>Returns & Refunds</p>
                <p className='text-secondary'>Cookie Guidelines</p>
                <p className='text-secondary'>Delivery Information</p>
            </div>
            <div style={{width:'20%'}}>
                <h4 className='text-center'>Subscribe Us</h4>
                <p className='text-secondary'>   Subscribe to our newsletter to get updates about our grand offers.</p>
                <div className='d-flex justify-content-between align-items-center gap-2'>
                    <input type="email" placeholder='Enter your email...' className='form-control' />
                    <button className=' btn btn-white bg-secondary text-bg-dark'>Suscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Footer
