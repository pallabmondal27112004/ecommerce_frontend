import { Outlet } from "react-router-dom";
import Header from "../header/header";
import { createUser } from "../../reduxToolKit/userSlice";
import { useEffect } from "react";
// import createUser from '../../reduxToolKit/userSlice'
import Footer from "../footer/Footer";
const Layout = () => {

    // const dispatch=useDispatch();
    // useEffect(()=>{
    //     console.log("pallab app")
    //     dispatch(createUser())
    //   },[dispatch])
    return (
        <div className="bg-white">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Layout