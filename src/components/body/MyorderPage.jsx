import React, { useState, useEffect } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AOS from "aos";
import "aos/dist/aos.css";

const MyorderPage = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const isLogin = useSelector((store) => store.auth);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
            easing: "ease-in-out", // Easing function
        });

        // Load completed orders from localStorage and filter by current user
        const allOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
        const userOrders = allOrders.filter(order =>
            order.user === isLogin?.singleUser?.id
        );
        setCompletedOrders(userOrders);
    }, [isLogin?.singleUser?.id]);

    return (
        <div className='d-flex justify-content-center align-items-center flex-column gap-2' style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', padding: '2rem 10rem' }}>
            <style>
                {`
          ul li::marker {
            color: green;
          }
        `}
            </style>

            {!isLogin.isAuthenticated ? (
                <div className="text-center py-5">
                    <h3>Please login to view your orders</h3>
                </div>
            ) : completedOrders.length === 0 ? (
                <div className="text-center py-5">
                    <h3>No orders found</h3>
                    <p>You haven't placed any orders yet.</p>
                </div>
            ) : (
                completedOrders.map((order, index) => (
                    <div key={index} data-aos="zoom-in" data-aos-anchor-placement="top-bottom"
                        className='divHover bg-white d-flex justify-content-between align-items-center text-start p-3 rounded shadow-sm'
                        style={{ width: '100%', maxWidth: '1000px' }}>

                        <div className='d-flex justify-content-center align-items-center' style={{ width: '50%' }}>
                            <div style={{ width: '30%' }}>
                                <img
                                    src={order.items[0]?.image || 'https://via.placeholder.com/100x100?text=Product'}
                                    alt="Product"
                                    className='w-75 rounded'
                                    style={{ objectFit: 'cover', aspectRatio: '1' }}
                                />
                            </div>
                            <div style={{ width: '70%' }}>
                                <p className='p-0 m-0 fw-bold' style={{ fontSize: '.9rem' }}>
                                    Order #{order.orderId}
                                </p>
                                <p className='p-0 m-0 text-secondary' style={{ fontSize: '.8rem' }}>
                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                </p>
                                <p className='p-0 m-0 text-secondary' style={{ fontSize: '.8rem' }}>
                                    Payment: {order.paymentMethod.toUpperCase()}
                                </p>
                                <p className='p-0 m-0 text-primary' style={{ fontSize: '.8rem' }}>
                                    Status: {order.status.toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div style={{ width: '25%' }} className='text-center'>
                            <FaRupeeSign />{order.totalAmount}
                        </div>

                        <div style={{ width: '25%' }}>
                            <ul>
                                <li className='m-0 text-success'>
                                    Delivered on {new Date(order.orderDate).toLocaleDateString()}
                                </li>
                            </ul>
                            <p className='p-0 m-0 ps-3 text-success'>Your order has been delivered</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default MyorderPage