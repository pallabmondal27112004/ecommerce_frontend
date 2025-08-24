import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderProduct, updateOrderDetails, deleteOrderFromCard } from '../../reduxToolKit/orderItem';
import { getProductFromApi } from '../../reduxToolKit/productSlice';
import PaymentGateway from './PaymentGateway';

const CardPage = () => {
    console.log("CardPage component rendering...");
    const dispatch = useDispatch();

    // Redux state with safe fallbacks
    const orders = useSelector((store) => store.order?.order || []);
    const totalProduct = useSelector((store) => store.products?.products || []);
    const isLogin = useSelector((store) => store.auth);

    // Local state
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    // Load data and ensure both products and orders are available before setting dataLoaded
    useEffect(() => {
        const loadData = async () => {
            try {
                console.log("CardPage: Loading essential data...");
                await Promise.all([
                    dispatch(getProductFromApi()).unwrap(),
                    dispatch(getOrderProduct()).unwrap()
                ]);
                setDataLoaded(true);
                console.log("CardPage: Data loaded successfully");
            } catch (error) {
                console.error("CardPage: Error loading data:", error);
            }
        };

        loadData();
    }, [dispatch]);

    // Memoized values
    const userId = useMemo(() => isLogin?.singleUser?.id, [isLogin?.singleUser?.id]);

    const userOrders = useMemo(() => {
        if (!isLogin?.isAuthenticated || !userId || !Array.isArray(orders)) return [];
        return orders.filter(order => order && parseInt(order.user) === parseInt(userId));
    }, [orders, isLogin?.isAuthenticated, userId]);

    const userOrdersWithProducts = useMemo(() => {
        if (!Array.isArray(userOrders) || !Array.isArray(totalProduct) || userOrders.length === 0) return [];

        return userOrders.map(order => {
            const product = totalProduct.find(p => parseInt(p.id) === parseInt(order.product));
            return product ? { ...order, productDetails: product } : null;
        }).filter(Boolean);
    }, [userOrders, totalProduct]);

    const totalDiscount = useMemo(() => {
        return userOrdersWithProducts.reduce((sum, order) => sum + (order.productDetails?.offer ? parseInt(order.productDetails.offer) : 0), 0);
    }, [userOrdersWithProducts]);

    const totalMoney = useMemo(() => {
        return userOrdersWithProducts.reduce((sum, order) => {
            const price = parseInt(order.productDetails?.price) || 0;
            const quantity = parseInt(order.quentity) || 1;
            return sum + (price * quantity);
        }, 0);
    }, [userOrdersWithProducts]);

    const averageDiscountPercentage = useMemo(() => {
        return userOrdersWithProducts.length === 0 ? 0 : (totalDiscount / userOrdersWithProducts.length).toFixed(1);
    }, [totalDiscount, userOrdersWithProducts.length]);

    // Event handlers
    const handleRemoveItem = useCallback(async (orderId) => {
        try {
            await dispatch(deleteOrderFromCard(orderId));
            await dispatch(getOrderProduct());
        } catch (error) {
            console.error('CardPage: Error removing item:', error);
            alert('Failed to remove item. Please try again.');
        }
    }, [dispatch]);

    const handleUpdateQuantity = useCallback(async (order, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await dispatch(updateOrderDetails({ id: order.id, product: order.product, quentity: newQuantity }));
            await dispatch(getOrderProduct());
        } catch (error) {
            console.error('CardPage: Error updating quantity:', error);
            alert('Failed to update quantity. Please try again.');
        }
    }, [dispatch]);

    const handleShowPayment = useCallback(() => setShowPayment(true), []);
    const handleHidePayment = useCallback(() => setShowPayment(false), []);

    // Show loader until data is completely ready
    if (!dataLoaded) {
        return (
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '2rem 0' }} className='w-100'>
                <div className="container text-center">
                    <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                    <h3 className="mt-3 text-white">Loading your cart...</h3>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
            <div className='container'>
                <div className='row g-4'>
                    {/* Cart Items */}
                    <div className='col-lg-8 col-md-12'>
                        <div className='card border-0 shadow-lg rounded-4'>
                            <div className='card-header bg-primary text-white p-4 rounded-top-4'>
                                <h3 className='mb-0 fw-bold'>
                                    <i className='bi bi-cart3 me-2'></i>Shopping Cart
                                    <span className='badge bg-light text-primary ms-3'>
                                        {isLogin?.isAuthenticated ? userOrdersWithProducts.length : 0} items
                                    </span>
                                </h3>
                            </div>
                            <div className='card-body p-0'>
                                {!isLogin?.isAuthenticated ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-person-x fs-1 text-muted mb-3"></i>
                                        <h5 className="text-muted">Please login to view your cart</h5>
                                    </div>
                                ) : userOrdersWithProducts.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                                        <h5 className="text-muted">Your cart is empty</h5>
                                        <p className="text-muted">Add some products to get started!</p>
                                    </div>
                                ) : (
                                    userOrdersWithProducts.map(({ productDetails: product, ...order }) => (
                                        <div key={order.id} className='card border-0 shadow-sm mb-3 mx-3 mt-3'>
                                            <div className='card-body p-4'>
                                                <div className='row align-items-center'>
                                                    <div className='col-md-3 col-sm-4 text-center mb-3 mb-md-0'>
                                                        <img
                                                            src={product?.image || 'https://via.placeholder.com/120x120?text=No+Image'}
                                                            alt={product?.name || 'Product'}
                                                            className='img-fluid rounded-3 shadow-sm'
                                                            style={{ maxHeight: '120px', objectFit: 'cover' }}
                                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/120x120?text=No+Image'; }}
                                                        />
                                                    </div>
                                                    <div className='col-md-6 col-sm-8 mb-3 mb-md-0'>
                                                        <h6 className='fw-bold text-dark mb-2'>{product?.name || 'Unknown Product'}</h6>
                                                        <p className='text-muted small mb-3'>{product?.description || 'No description available'}</p>
                                                        <div className="d-flex align-items-center gap-2 mb-3">
                                                            <span className="h5 fw-bold text-primary"><FaIndianRupeeSign /> {product?.price || 0}</span>
                                                            <span className="text-muted text-decoration-line-through">
                                                                <FaIndianRupeeSign />{product?.price ? (parseInt(product.price) + product.price / 50).toFixed(1) : 0}
                                                            </span>
                                                            {product?.offer && <span className="badge bg-danger px-2 py-1">{product.offer}% OFF</span>}
                                                        </div>
                                                        <div className='d-flex gap-3'>
                                                            <button className='btn btn-outline-secondary btn-sm'>
                                                                <i className='bi bi-heart me-1'></i>Save for later
                                                            </button>
                                                            <button className='btn btn-outline-danger btn-sm' onClick={() => handleRemoveItem(order.id)}>
                                                                <i className='bi bi-trash me-1'></i>Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-3 col-sm-12 text-center'>
                                                        <div className='d-flex align-items-center justify-content-center gap-2 mb-2'>
                                                            <button className='btn btn-outline-secondary btn-sm rounded-circle' onClick={() => handleUpdateQuantity(order, order.quentity - 1)} disabled={order.quentity <= 1}>-</button>
                                                            <span className='btn btn-outline-secondary btn-sm px-3'>{order.quentity}</span>
                                                            <button className='btn btn-outline-secondary btn-sm rounded-circle' onClick={() => handleUpdateQuantity(order, order.quentity + 1)}>+</button>
                                                        </div>
                                                        <small className='text-muted'>Delivery by Wed Mar 19 | Free</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className='col-lg-4 col-md-12'>
                        <div className='card border-0 shadow-lg rounded-4' style={{ top: '2rem' }}>
                            <div className='card-header bg-success text-white p-4 rounded-top-4'>
                                <h4 className='mb-0 fw-bold'><i className='bi bi-receipt me-2'></i>Price Summary</h4>
                            </div>
                            <div className='card-body p-4'>
                                <div className='d-flex justify-content-between border-bottom mb-3 pb-3'>
                                    <span className='text-muted'>Items ({isLogin?.isAuthenticated ? userOrdersWithProducts.length : 0})</span>
                                    <span className='fw-bold'>₹{isLogin?.isAuthenticated ? totalMoney : 0}</span>
                                </div>
                                <div className='d-flex justify-content-between border-bottom mb-3 pb-3'>
                                    <span className='text-muted'>Discount</span>
                                    <span className='text-success fw-bold'>-{isLogin?.isAuthenticated ? averageDiscountPercentage : 0}%</span>
                                </div>
                                <div className='d-flex justify-content-between border-bottom mb-3 pb-3'>
                                    <span className='text-muted'>Delivery Charges</span>
                                    <span className='text-success fw-bold'><i className='bi bi-truck me-1'></i>FREE</span>
                                </div>
                                <div className='d-flex justify-content-between border-bottom mb-4 pb-3'>
                                    <span className='text-muted'>Service Fee</span>
                                    <span className='fw-bold'>₹{isLogin?.isAuthenticated ? 9 : 0}</span>
                                </div>
                                <div className='d-flex justify-content-between mb-4'>
                                    <h5 className='mb-0 fw-bold'>Total Amount</h5>
                                    <h4 className='mb-0 fw-bold text-primary'>₹{isLogin?.isAuthenticated ? totalMoney + 9 : 0}</h4>
                                </div>
                                {isLogin?.isAuthenticated && userOrdersWithProducts.length > 0 ? (
                                    <button className="btn btn-primary w-100 fw-bold py-3 rounded-3 shadow-sm" onClick={handleShowPayment} style={{ background: 'linear-gradient(45deg, #28a745, #20c997)', border: 'none' }}>
                                        <i className="bi bi-credit-card me-2"></i>Proceed to Checkout (₹{totalMoney + 9})
                                    </button>
                                ) : (
                                    <div className="text-center py-4">
                                        <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                                        <p className="text-muted">{!isLogin?.isAuthenticated ? 'Please login to checkout' : 'Your cart is empty'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPayment && isLogin?.isAuthenticated && userOrdersWithProducts.length > 0 && (
                <PaymentGateway
                    show={showPayment}
                    onHide={handleHidePayment}
                    product={{
                        name: `Cart Items (${userOrdersWithProducts.length} items)`,
                        price: totalMoney + 9,
                        image: userOrdersWithProducts[0]?.productDetails?.image || 'https://via.placeholder.com/100x100?text=Cart'
                    }}
                    user={isLogin.singleUser}
                    isCart={true}
                    cartItems={userOrders}
                />
            )}
        </div>
    );
};

export default CardPage;
