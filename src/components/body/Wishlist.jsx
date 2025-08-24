import React from 'react'
import { useState } from 'react';
import img from '../../../public/imgs/facebook.png'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteWishList, getwishListProduct } from '../../reduxToolKit/wishListSlice';
import { getProductFromApi } from '../../reduxToolKit/productSlice';
import store from '../../reduxToolKit/mainStore';
import { MdDelete } from "react-icons/md";

const Wishlist = () => {
 const isLogin=useSelector((store)=>store.auth)
    const dispatch = useDispatch()
    const wishlists = useSelector((store) => store.wishlist.wishlist)
    const totalProduct = useSelector((store) => store.products.products)
const [itemCount, setitemscount]=useState(0)


    const fetchdata= async()=>{
        await dispatch(getwishListProduct())
    await dispatch(getProductFromApi())
    }
    console.log(wishlists,"mywishlist")
        useEffect( () => {
           
            fetchdata()
        }, [dispatch])
        
        
        console.log(
            "this is account section",
            isLogin?.singleUser?.id ? isLogin : "User ID not available yet"
          );
    
        const deletedata = async(id)=>{
            try{
    
                await dispatch(deleteWishList(id))
            
                await  dispatch(getwishListProduct())
            }catch(error){
                console.log(error)
            }
        }
        useEffect(() => {
            let count = 0;
            wishlists?.forEach((list) => {
                const singleProduct = totalProduct?.filter(
                    (product) => parseInt(product.id) === parseInt(list.product)
                );
    
                if (singleProduct.length > 0 && isLogin.singleUser.id == list.user) {
                    count++;
                }
            });
    
            setitemscount(count);
        }, [wishlists, totalProduct, isLogin]);
  return (
    <div>
        <div className='wishList w-100 text-start pt-4 bg-white mt-3'>
                
                <span className='ms-3 d-flex justify-content-between align-items-center'>
                
                <h4 className='ps-5 heading '  style={{width:'50vw'}}>My wish List ({itemCount})</h4>
                
                </span>
                <hr />
                { wishlists?.map((list) => {
                    const singleProduct = totalProduct?.filter(
                        (product) => parseInt(product.id) === parseInt(list.product)
                        
                    );
                    
                    console.log(totalProduct)
                    
                    if (singleProduct.length > 0  && isLogin.singleUser.id == list.user) {
                        // setitemscount(itemCount+1)

                        // return (
                    return (
                        <>
                        
                        <div className='d-flex justify-content-start align-items-center w-100'>
                                <div className='' style={{ width: '20%' }}>
                                    <img src={singleProduct[0].image} alt="" className='w-50 ps-3' />
                                </div>
                                <div style={{ width: '80%' }}>
                                    <p>{singleProduct[0].name}</p>
                                    <p className='text-secondary'>{singleProduct[0].description}</p>
                                    <div className=" mb-2 text-start ">
                                        <span className="fs-4 fw-bold price text-start"><FaIndianRupeeSign /> {singleProduct[0].price}</span>
                                        <span className="text-secondary mx-2"><FaIndianRupeeSign /> <del>{(parseInt(singleProduct[0].price)+parseInt(singleProduct[0].price)/30).toFixed(1)}</del></span>
                                        <button className="btn btn-danger fw-bold p-0 px-1">{singleProduct[0].offer}% off</button>
                                    </div>
                                </div>
                                    <MdDelete className='m-4 fs-3 text-secondary' 
                                    onClick={ ()=>{
                                    
                                       
                                        deletedata(list.id)
                                    }}
                                    />
                            </div>
                            <hr />
                        </>
                            
                        )
                    }
                    })}
            </div>
    </div>
  )
}

export default Wishlist
