import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import { FaStar } from "react-icons/fa6";

// import { addProductToWishList } from "../../reduxToolKit/wishListSlice";
import { addProductToWishList, getwishListProduct } from "../../reduxToolKit/wishListSlice";
{/* <FaHeart /> */ }
const ProductItem = ({ productId = " ", image = "", name = "", desc = '', price = '', offer = '', delivery = false, rating = '' }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
            easing: "ease-in-out", // Easing function
        });
        AOS.refresh(); 
    }, []);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchWishlist = async () => {
            await dispatch(getwishListProduct());
        };
        fetchWishlist();
    }, [dispatch]);

    const wish = useSelector((store) => store.wishlist.wishlist)
    const nevigate = useNavigate()
    const [wishList, setWishLIst] = useState(false)
    const isLogin = useSelector((store) => store.auth)
    // console.log("this is accout section", isLogin.singleUser.id)
    // console.log(wish,"wishddbhfsdjfh")
    const addWishList = (id) => {

        const details = {
            user: isLogin.singleUser.id,
            product: id,
            iswishlist: true
        }
        // const isAddProduct = wish?.filter((order) => order.product === parseInt(id))
        // if (!isAddProduct.length > 0) {

            dispatch(addProductToWishList(details))
        // }
    }
    return (
        <div data-aos="fade-up" className=" position-relative responsive-productItem d-flex justify-content-start align-items-start bg-white flex-column" style={{ width: '300px', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
            <div className="position-absolute end-0 top-0 z-3"
                onClick={() => {
                    addWishList(productId);
                    setWishLIst(prev => !prev);
                }}
            >

                {wishList ? <FaHeart className=" m-3 fs-3 text-danger" /> : <FaRegHeart className=" m-3 fs-3 text-danger" />}
            </div>
            <img
                onClick={() => {
                    console.log("this is the product page ")
                    nevigate(`/product/${productId}`)
                }}
                src={image} className="w-100 image " style={{ height: "320px" }} alt="to iman" />
            <div
                onClick={() => {
                    console.log("this is the product page ")
                    nevigate(`/product/${productId}`)
                }}
                className="px-2 d-flex justify-content-start align-items-start flex-column itemCard bg-white w-100">
                <p className=" fw-bold p-0 m-0 price">{name.length <= 38 ? name : name.slice(0, 30) + '....'}</p>

                <p className="text-secondary p-0 m-0">{desc.length <= 38 ? desc : desc.slice(0, 30) + '....'}</p>
                <div className="">
                    <span className="fs-4 fw-bold price"><FaIndianRupeeSign /> {price}</span>
                    <span className="text-secondary mx-2"><FaIndianRupeeSign /> <del>{parseInt(price) + parseInt(price) / 2}</del></span>
                    <button className="btn btn-danger fw-bold p-0 px-1">{offer} % off</button>

                </div>
                <p className="text-success p-0 m-0">{delivery ? <span>Free delevary</span> : <span className="text-danger"> <FaIndianRupeeSign /> 30 delevary charge </span>}</p>
                <div>
                    {/* <p className="text-secondary p-0 m-0">size : {size && size.map((e) => <span> {e} </span>)}</p> */}
                    {/* {parseInt(rating)} */}
                    {Array.from({ length: rating }, () => (
        
                    <FaStar className="text-warning" />
      ))}
                </div>
            </div>
        </div>
    )
}

export default ProductItem;