import React,  {useState,useEffect }from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "/public/imgs/ecommerceLogin.png";
import facebook from "/public/imgs/facebook.png";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {dashboardlogin} from '../reduxToolKit/dashboardRTK/DashboardAuth'
import {dashboardlogout} from '../reduxToolKit/dashboardRTK/DashboardAuth'
import { getUsersFromDashboard } from "../reduxToolKit/dashboardRTK/LoginSlice";

const DashboardLogin = () => {
    const dispatch = useDispatch();
    const [formdata, setFormdata] = useState({ username: "", password: "" });
    const [error, setError] = useState(false);
    const nevigate = useNavigate()
    // if (localStorage.getItem("user")) {
    //   nevigate("/");
    // }
    useEffect(()=>{
        dispatch(getUsersFromDashboard())
        
    },[dispatch])
    const {users,loding }=useSelector((store)=>store.dashboardUser)
      const handleInputChange = (e) => {
        setFormdata((prev)=>({...prev,[e.target.name]:e.target.value}));
      };
    const handleLogin = (e) => {
      e.preventDefault();
      console.log(formdata)
      // Check if user exists
      const existingUser = users[0]?.find(
        (user) => user.username === formdata.username && user.password === formdata.password
      );
      const userIndex = users[0]?.findIndex(
        (user) => user.username === formdata.username && user.password === formdata.password
      );
      console.log("user",existingUser.is_superuser)
      console.log("userall",users,"dfsgfgd", userIndex)
      if (existingUser && existingUser.is_superuser) {
        dispatch(dashboardlogin(users[userIndex])); 
        setError(false)
        setFormdata({ username: "", password: "" })
        nevigate('/dashboard')
      } else {
        setError(true);
      }
    };
  return (
      <div className="text-white login-container d-flex shadow-lg" style={{margin:'3rem',  background:' radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',borderRadius:'2rem' }}>
          {/* Left Section */}
          <div className="login-left d-flex flex-column align-items-center justify-content-center p-3 w-50" style={{}}>
            <h2 className="text-white fw-bold h2" style={{fontSize:'2rem'}}>Welcome to my website!</h2>
            <p className="text-white text-center fs-5 fw-bold">
              
            Create an Account or Log In to Get Started.
            </p>
          
            <img src={loginImage} alt="Logo" className="img2" />
    
    
    
          </div>
    
          {/* Right Section (Form) */}
          <div className="login-right d-flex flex-column align-items-center justify-content-center  w-100 px-5 ">
            <div className="login-box shadow-lg p-4 rounded-4 w-100">
              <h3 className="text-center fw-bold">Login to account</h3>
    
              {/* Form Fields */}
              <form onSubmit={handleLogin}> 
                {error?<div className="text-danger"><h1>User not exsis</h1></div>:<div></div>}
                <div className="mb-3">
                  <input type="text"  
                  className="form-control input-style" 
                  placeholder="username" 
                  onChange={handleInputChange}
                  name="username"
                value={formdata.username}
    
                  required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input type="password"
                   className="form-control input-style"
                   placeholder="Password" 
                  name="password"
                value={formdata.password}
                  onChange={handleInputChange}
    
                   required/>
                  <i className="fa fa-eye password-toggle"></i>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <input type="checkbox" />
                  <a href="#" className="text-decoration-none text-muted">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3 custom-btn fw-bold">
                  Login
                </button>
              </form>
    
              {/* Social Logins */}
              <div className="social-login text-center ">
                <p className="text-muted">Or Login with</p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-light btn-social d-flex justify-content-center align-items-center gap-2" >
                  <FcGoogle  /> Google
                  </button>
                  <button className="btn btn-light btn-social d-flex justify-content-center gap-1">
                   <img src={facebook} alt="" className="" style={{width:'20px'}}  /> Facebook
                  </button>
                </div>
              </div>
    
              {/* Signup Link */}
              <p className="text-center mt-3 fw-bold">
                Don't have an account? <Link onClick={() => { nevigate('/register') }} className="text-white">Signup</Link>
              </p>
            </div>
          </div>
        </div>
   

  
  )
}

export default DashboardLogin;
