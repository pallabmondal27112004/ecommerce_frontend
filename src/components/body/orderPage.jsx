import { useState, useEffect, useMemo, useCallback } from "react";
import { BiCartAdd, BiSolidBolt } from "react-icons/bi";
import { FaIndianRupeeSign, FaStar } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getProductFromApi } from "../../reduxToolKit/productSlice";
import { addProduct, getOrderProduct } from "../../reduxToolKit/orderItem";
import Example from "../models/BootstrapModels";
import { getReview } from "../../reduxToolKit/reviewSlice";
import PaymentGateway from "./PaymentGateway";

function OrderPage() {
    console.log("OrderPage component rendering...");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    // store state
    const users = useSelector((s) => s.user?.users || []);
    const orders = useSelector((s) => s.order?.order || []);
    const isLogin = useSelector((s) => s.auth);
    const reviews = useSelector((s) => s.review?.review || []);
    const products = useSelector((s) => s.products?.products || []);
    const productsLoading = useSelector((s) => s.products?.loading || false);
    const productsError = useSelector((s) => s.products?.error);

    // ui state
    const [productDetailsOpen, setProductDetailsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Load data with proper error handling and loading states
    useEffect(() => {
        const loadData = async () => {
            try {
                console.log("Loading essential data...");
                await Promise.all([
                    dispatch(getOrderProduct()),
                    dispatch(getProductFromApi()),
                    dispatch(getReview())
                ]);
                setDataLoaded(true);
                console.log("Data loaded successfully");
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        if (!dataLoaded) {
            loadData();
        }
    }, [dispatch, dataLoaded]);

    // Memoize product with better error handling and logging
    const product = useMemo(() => {
        console.log("=== Product Lookup Debug ===");
        console.log("ID from params:", id);
        console.log("Products array:", products);
        console.log("Products length:", products?.length);
        console.log("Data loaded:", dataLoaded);
        console.log("Products loading:", productsLoading);

        // Early returns with detailed logging
        if (!id) {
            console.log("No ID found in params");
            return null;
        }

        if (!products || !Array.isArray(products)) {
            console.log("Products is not an array or is null/undefined");
            return null;
        }

        if (products.length === 0) {
            console.log("Products array is empty");
            return null;
        }

        const numericId = Number(id);
        console.log("Numeric ID:", numericId);

        const foundProduct = products.find((p) => {
            const productId = Number(p?.id);
            console.log(`Comparing product ID ${productId} with ${numericId}`);
            return productId === numericId;
        });

        console.log("Found product:", foundProduct);
        console.log("=== End Product Lookup Debug ===");

        return foundProduct || null;
    }, [products, id, dataLoaded]);

    // Memoize user ID to prevent unnecessary recalculations
    const userId = useMemo(() => {
        return isLogin?.singleUser?.id;
    }, [isLogin?.singleUser?.id]);

    // Memoize can review check
    const canReview = useMemo(() => {
        if (!isLogin?.isAuthenticated || !reviews || !id || !userId) {
            return false;
        }
        return !reviews.some(
            (r) => Number(r.user) === Number(userId) && Number(r.product) === Number(id)
        );
    }, [isLogin?.isAuthenticated, reviews, userId, id]);

    // Memoize product reviews
    const productReviews = useMemo(() => {
        if (!Array.isArray(reviews) || !product?.id) {
            return [];
        }
        return reviews.filter((r) => Number(r.product) === Number(product.id));
    }, [reviews, product?.id]);

    // Use useCallback for event handlers to prevent unnecessary re-renders
    const addProductToCart = useCallback(async () => {
        if (!isLogin?.isAuthenticated) {
            navigate("/login");
            return false;
        }

        const already = orders?.some((o) => Number(o.product) === Number(id));
        if (already) {
            alert("Already in cart");
            return false;
        }

        if (!product) {
            console.error("No product found for cart addition");
            return false;
        }

        try {
            const order = {
                product: product.id,
                user: userId,
                quentity: 1,
                price: product.price,
            };
            await dispatch(addProduct(order));
            return true;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart. Please try again.");
            return false;
        }
    }, [isLogin?.isAuthenticated, orders, id, product, userId, dispatch, navigate]);

    const handleBuyNow = useCallback(() => {
        if (!isLogin?.isAuthenticated) {
            navigate("/login");
            return;
        }
        setShowPayment(true);
    }, [isLogin?.isAuthenticated, navigate]);

    const handleAddToCartAndNavigate = useCallback(async () => {
        const success = await addProductToCart();
        if (success) {
            navigate("/card");
        }
    }, [addProductToCart, navigate]);

    // Show loading state
    if (productsLoading || !dataLoaded) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="mt-3">Loading product details...</h3>
                </div>
            </div>
        );
    }

    // Show error state
    if (productsError) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <h2 className="text-danger">Error Loading Product</h2>
                    <p>There was an error loading the product. Please try again.</p>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // Show product not found state
    if (dataLoaded && !product) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <h2 className="text-danger">Product Not Found</h2>
                    <p>The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/')}
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // Calculate values with safe fallbacks
    const price = Number(product?.price) || 0;
    const mrp = price * 2;
    const ratingCount = Math.max(0, Math.round(Number(product?.rating) || 0));

    return (
        <div className="container-fluid py-4" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
            <div className="container">
                <div className="row g-4">
                    {/* LEFT COLUMN */}
                    <div className="col-lg-6 col-md-12">
                        <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                            <div className="text-center mb-4">
                                <img
                                    src={product.image}
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        height: "400px",
                                        objectFit: "contain",
                                        borderRadius: "12px"
                                    }}
                                    alt={product.name || "product"}
                                    className="shadow-sm"
                                />
                            </div>

                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <button
                                    onClick={handleAddToCartAndNavigate}
                                    className="btn btn-warning flex-fill text-white fw-bold py-3 rounded-3 shadow-sm"
                                    style={{
                                        background: 'linear-gradient(45deg, #ff9800, #f57c00)',
                                        border: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <BiCartAdd className="me-2 fs-5" /> ADD TO CART
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="btn btn-primary flex-fill text-white fw-bold py-3 rounded-3 shadow-sm"
                                    style={{
                                        background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                                        border: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <BiSolidBolt className="me-2 fs-5" /> BUY NOW
                                </button>
                            </div>

                            {!isLogin?.isAuthenticated && (
                                <div className="alert alert-info mt-4 rounded-3 border-0" style={{ background: 'linear-gradient(45deg, #e3f2fd, #bbdefb)' }}>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-info-circle-fill me-2 text-info"></i>
                                        <div>
                                            <strong>Please login</strong> to add items to cart or make purchases.
                                            <button className="btn btn-link p-0 ms-2 text-decoration-none fw-bold" onClick={() => navigate("/login")}>
                                                Login here →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="col-lg-6 col-md-12">
                        <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                            <div className="mb-4">
                                <h1 className="display-6 fw-bold text-dark mb-3">{product.name}</h1>
                                <p className="text-muted fs-6 lh-base">{product.description}</p>
                            </div>

                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-2">
                                    <span className="badge bg-success px-3 py-2 rounded-pill me-2">
                                        <i className="bi bi-tag-fill me-1"></i>Special Price
                                    </span>
                                </div>
                                <div className="d-flex align-items-center flex-wrap gap-2">
                                    <span className="display-6 fw-bold text-primary">
                                        <FaIndianRupeeSign className="fs-4" /> {price}
                                    </span>
                                    <span className="fs-5 text-muted text-decoration-line-through">
                                        <FaIndianRupeeSign className="fs-6" /> {mrp}
                                    </span>
                                    {product.offer != null && (
                                        <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
                                            {product.offer}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <div className="d-flex align-items-center bg-success text-white px-3 py-2 rounded-pill me-3">
                                    <span className="fw-bold me-1">{product.rating}</span>
                                    <FaStar className="fs-6" />
                                </div>
                                <div className="d-flex">
                                    {Array.from({ length: ratingCount }).map((_, i) => (
                                        <FaStar key={i} className="text-warning fs-5 me-1" />
                                    ))}
                                </div>
                                <span className="text-muted ms-2">({product.numOfReview} reviews)</span>
                            </div>

                            {/* Product Details Toggle */}
                            <div className="mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 cursor-pointer"
                                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                                    onClick={() => setProductDetailsOpen(v => !v)}
                                >
                                    <h5 className="mb-0 fw-bold text-primary">
                                        <i className="bi bi-info-circle me-2"></i>Product Details
                                    </h5>
                                    {productDetailsOpen ?
                                        <RiArrowDropUpLine className="fs-2 text-primary" /> :
                                        <RiArrowDropDownLine className="fs-2 text-primary" />
                                    }
                                </div>
                                {productDetailsOpen && (
                                    <div className="mt-3 animate__animated animate__fadeIn">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                    <table className="table table-hover mb-0">
                                                        <tbody>
                                                            <tr className="border-bottom">
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Product Name</th>
                                                                <td className="py-3 px-4">{product.name}</td>
                                                            </tr>
                                                            <tr className="border-bottom">
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Rating</th>
                                                                <td className="py-3 px-4">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="me-2">{product.rating}</span>
                                                                        <FaStar className="text-warning" />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className="border-bottom">
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Discount</th>
                                                                <td className="py-3 px-4">
                                                                    <span className="badge bg-success px-3 py-2">{product.offer}% OFF</span>
                                                                </td>
                                                            </tr>
                                                            <tr className="border-bottom">
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Delivery</th>
                                                                <td className="py-3 px-4">
                                                                    {product.isFreeDelevary ?
                                                                        <span className="badge bg-success px-3 py-2">
                                                                            <i className="bi bi-truck me-1"></i>Free Delivery
                                                                        </span> :
                                                                        <span className="badge bg-warning px-3 py-2">₹30 Delivery Fee</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr className="border-bottom">
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Stock</th>
                                                                <td className="py-3 px-4">
                                                                    <span className="badge bg-info px-3 py-2">{product.countInStack} Available</span>
                                                                </td>
                                                            </tr>
                                                            <tr className="border-bottom">
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Price</th>
                                                                <td className="py-3 px-4">
                                                                    <span className="fs-5 fw-bold text-primary">
                                                                        <FaIndianRupeeSign /> {price}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="py-3 px-4 bg-light text-primary fw-bold">Reviews</th>
                                                                <td className="py-3 px-4">
                                                                    <span className="badge bg-primary px-3 py-2">{product.numOfReview} Reviews</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Reviews Section */}
                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="mb-0 fw-bold text-primary">
                                        <i className="bi bi-chat-dots me-2"></i>Customer Reviews
                                    </h4>
                                    <span className="badge bg-primary ms-3 px-3 py-2">{productReviews.length} Reviews</span>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    {productReviews.map((r) => {
                                        const reviewUser = users?.find((u) => Number(u.id) === Number(r.user));
                                        return (
                                            <div key={`${r.user}-${r.product}-${r.id || Math.random()}`}
                                                className="card border-0 shadow-sm hover-shadow">
                                                <div className="card-body p-4">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={reviewUser?.image || "https://via.placeholder.com/50"}
                                                                alt={reviewUser?.name || "user"}
                                                                className="rounded-circle me-3 shadow-sm"
                                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                            />
                                                            <div>
                                                                <h6 className="mb-1 fw-bold">{r.name || reviewUser?.name || "Anonymous User"}</h6>
                                                                <small className="text-muted">Verified Purchase</small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center bg-primary text-white px-3 py-2 rounded-pill">
                                                            <span className="fw-bold me-1">{r.rating}</span>
                                                            <FaStar className="fs-6" />
                                                        </div>
                                                    </div>
                                                    <p className="text-muted mb-0 lh-base">{r.comment}</p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {productReviews.length === 0 && (
                                        <div className="text-center py-5">
                                            <i className="bi bi-chat-dots fs-1 text-muted mb-3"></i>
                                            <h5 className="text-muted">No reviews yet</h5>
                                            <p className="text-muted">Be the first to review this product!</p>
                                        </div>
                                    )}

                                    {canReview && (
                                        <div className="card border-2 border-primary border-dashed">
                                            <div className="card-body p-4">
                                                <h6 className="text-primary mb-3">
                                                    <i className="bi bi-plus-circle me-2"></i>Add Your Review
                                                </h6>
                                                <Example
                                                    name="Add review"
                                                    username={userId}
                                                    product={product.id}
                                                    comment={<textarea placeholder="Share your experience with this product..." className="form-control" style={{ height: "100px" }} name="comment" />}
                                                    rating={<input type="number" min="1" max="5" placeholder="Rate this product (1-5)" className="form-control" name="rating" />}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Gateway Modal */}
            {showPayment && product && (
                <PaymentGateway
                    show={showPayment}
                    onHide={() => setShowPayment(false)}
                    product={product}
                    user={isLogin?.singleUser}
                />
            )}
        </div>
    );
}

export default OrderPage;