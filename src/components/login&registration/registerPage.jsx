import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import register from "/public/imgs/registerEcommerce.png";
import facebook from "/public/imgs/facebook.png";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { createUser } from "../../reduxToolKit/userSlice";
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem("user")) {
      navigate("/");
    }
  })
  const [formdata, setFormdata] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    image: "",
    state: "",
    country: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });
  const [showError, setShowError] = useState(false)

  const addFormData = (e) => {

    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log(formdata.confirm_password, formdata.password);

    // Check if passwords match
    if (formdata.password !== formdata.confirm_password) {
      setShowError(true);
      return;
    }

    // Create a FormData object for file uploads
    const userData = new FormData();

    // Add all form fields except confirm_password
    for (let key in formdata) {
      if (key !== "confirm_password" && formdata[key]) {
        userData.append(key, formdata[key]);
      }
    }

    // Dispatch the action with FormData
    dispatch(createUser(userData));

    console.log([...userData]); // Debugging: Check what is being sent

    // Reset the form
    setFormdata({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      image: "",
      address: "",
      city: "",
      state: "",
      country: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
    });

    setShowError(false);
  };

  // console.log("store",users)

  return (
    <div
      className="text-white register-container d-flex shadow-lg"
      style={{
        borderRadius: "2rem",
        margin: "5rem",
        background: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
      }}
    >
      {/* Left Section */}
      <div className="register-left d-flex flex-column align-items-center justify-content-center p-5">
        <h2 className="text-white fw-bold">Join Us & Explore More!</h2>
        <p className="text-white text-center">
          Create an account to start shopping with the best deals and experience seamless service.
        </p>
        <img src={register} alt="Logo" className="img" />
      </div>

      {/* Right Section (Form) */}
      <div className="register-right d-flex flex-column align-items-center justify-content-center w-100 px-5">
        <div className="register-box shadow-lg p-4 rounded-4 w-100">
          <h3 className="text-center fw-bold mb-4">Create your account</h3>

          {/* Form Fields */}
          <form onSubmit={submitForm}>
            {showError ? <div className="fw-bold text-danger my-2 border border-danger  p-2" focus >Your password don's matched</div> : <div></div>}
            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control input-style"
                  name="first_name"
                  value={formdata.first_name}
                  placeholder="First Name"
                  onChange={addFormData}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control input-style"
                  name="last_name"
                  value={formdata.last_name}
                  placeholder="Last Name"
                  onChange={addFormData}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control input-style"
                name="username"
                value={formdata.username}
                placeholder="Username"
                onChange={addFormData}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control input-style"
                name="email"
                value={formdata.email}
                placeholder="Email"
                onChange={addFormData}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control input-style"
                name="image"
                onChange={(e) => setFormdata({ ...formdata, image: e.target.files[0] })}
              />
            </div>


            <div className="mb-3">
              <input
                type="text"
                className="form-control input-style"
                name="phone_number"
                value={formdata.phone_number}
                placeholder="Phone Number"
                onChange={addFormData}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control input-style"
                name="address"
                value={formdata.address}
                placeholder="Address"
                onChange={addFormData}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control input-style"
                  name="city"
                  value={formdata.city}
                  placeholder="City"
                  onChange={addFormData}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control input-style"
                  name="state"
                  value={formdata.state}
                  placeholder="State"
                  onChange={addFormData}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control input-style"
                  name="country"
                  value={formdata.country}
                  placeholder="Country"
                  onChange={addFormData}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  className="form-control input-style"
                  name="date_of_birth"
                  value={formdata.date_of_birth}
                  onChange={addFormData}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control input-style"
                name="password"
                value={formdata.password}
                placeholder="Password"
                onChange={addFormData}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control input-style"
                name="confirm_password"
                value={formdata.confirm_password}
                placeholder="Confirm Password"
                onChange={addFormData}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3 custom-btn fw-bold">
              Register
            </button>
          </form>

          {/* Social Logins */}
          <div className="social-login text-center">
            <p className="text-muted">Or Login with</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-light btn-social d-flex justify-content-center align-items-center gap-2">
                <FcGoogle /> Google
              </button>
              <button className="btn btn-light btn-social d-flex justify-content-center gap-1">
                <img src={facebook} alt="" className="" style={{ width: "20px" }} /> Facebook
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link className="text-white" onClick={() => navigate("/login")}>
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;
