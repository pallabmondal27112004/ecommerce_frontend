import { FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomDropdown from "./threeDotIcon";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaFirstOrder } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { RiCoupon4Line } from "react-icons/ri";
import { MdCardGiftcard } from "react-icons/md";
import { SiBitcoinsv } from "react-icons/si";
import { CiLogout } from "react-icons/ci";

import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../reduxToolKit/userAuthSlice";
import AccountDetails from "./AccountDetails";
import { FaHeart } from "react-icons/fa";

function Header() {
    const isLogin = useSelector((store) => store.auth)

    const threeDotList = [
        { icon: <IoIosNotificationsOutline />, text: "Notification Preferences" },
        { icon: <TfiHeadphoneAlt />, text: "24x7 Customer Care" },
        { icon: <FaChartLine />, text: "Dashboard" },
        { icon: <FaDownload />, text: "Download App" }
    ];


    const user = JSON.parse(localStorage.getItem("user"));
    console.log("nev")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(login(user))
    }, [dispatch])
    return (
        <div className="d-flex justify-content-center align-content-center gap-5 p-2 fw-bold position-sticky top-0 start-0 w-100 z-3" id='nevbar' style={{ background: ' linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }}>
            <Link to="" className=" m-0 text-decoration-none rounded-circle "  >
                {/* <p className="link-115 responsive-logo pb-3 text-white p-0 m-0">Ecommerce</p> */}
                <img src="/imgs/new/logo1.png" alt="" className="" style={{ width: '50px', height: '50px', }} />

            </Link>
            <div style={{ width: '500px' }} className="  position-relative">
                <FaSearch className="headerinput position-absolute top-0 start-0 mt-2 ms-3 fs-4 text-secondary" />
                <input type="text" className="form-control w-100 ps-5 headerinput" placeholder='search here.......' />
            </div>
            <Link className="text-decoration-none">
                {isLogin.isAuthenticated ? <AccountDetails /> :
                    <Link to="/login" className=" btn btn-info text-decoration-none fw-bold d-flex justify-content-center align-items-center pb-2s">
                        <p className="  text-white fw-bold  p-0 m-0 ">Sign in </p>
                    </Link>}


            </Link>
            <div>
                <Link to="card/" className=" link-115 d-flex justify-content-center align-items-center pb-3">
                    <BsFillCartPlusFill className="responsive-icon fs-4 text-white mx-2" />
                    <p className="responsive-text m-0 p-0 text-white ">card</p>
                </Link>
            </div>
            <div>
                <Link to='/myprofile/wishlist' className="  link-115 d-flex justify-content-center align-items-center pb-3">
                    <   FaHeart className=" responsive-icon ms-4 fw-bold fs-4 text-white mx-2" />
                    <p className="responsive-text m-0 text-white">Wish List</p>
                </Link>
            </div>

            <div>
                <CustomDropdown component={[{ icon: <BsThreeDotsVertical />, text: "" }]} action={threeDotList} />
            </div>
        </div>
    );
}

export default Header;
