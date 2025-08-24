import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "/public/imgs/ecommerceLogin.png";
import facebook from "/public/imgs/facebook.png";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../reduxToolKit/userSlice";
import { login } from "../../reduxToolKit/userAuthSlice";
// import UserPage from "../body/UserPage";
const Login = () => {
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      nevigate("/");
    }
  }, [nevigate]);
  const { users, loding } = useSelector((store) => store.user)
  useEffect(() => {
    dispatch(getUsers())

  }, [dispatch])
  const handleInputChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const existingUser = users.find(
        (user) => user.username === formdata.username && user.password === formdata.password
      );
      const userIndex = users.findIndex(
        (user) => user.username === formdata.username && user.password === formdata.password
      );

      if (existingUser) {
        dispatch(login(users[userIndex]));
        setFormdata({ username: "", password: "" });
        nevigate('/');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="text-white login-container d-flex shadow-lg" style={{ margin: '5rem', background: ' radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', borderRadius: '2rem' }}>
      {/* Left Section */}
      <div className="login-left d-flex flex-column align-items-center justify-content-center p-5" style={{}}>
        <h2 className="text-white fw-bold h2" style={{ fontSize: '3rem' }}>Welcome to my website!</h2>
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
            {error ? <div className="text-danger"><h1>User not exsis</h1></div> : <div></div>}
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

                required />
              <i className="fa fa-eye password-toggle"></i>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100">
              <input type="checkbox" />
              <a href="#" className="text-decoration-none text-muted">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 custom-btn fw-bold" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="social-login text-center ">
            <p className="text-muted">Or Login with</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-light btn-social d-flex justify-content-center align-items-center gap-2" >
                <FcGoogle /> Google
              </button>
              <button className="btn btn-light btn-social d-flex justify-content-center gap-1">
                <img src={facebook} alt="" className="" style={{ width: '20px' }} /> Facebook
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
  );
};

export default Login;
