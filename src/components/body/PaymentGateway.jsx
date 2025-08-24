import { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaIndianRupeeSign, FaCreditCard, FaPaypal, FaGooglePay } from 'react-icons/fa6';
import { SiPhonepe, SiPaytm } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteOrderFromCard } from '../../reduxToolKit/orderItem';

const PaymentGateway = ({ show, onHide, product, user, isCart = false, cartItems = [] }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });

    const [upiDetails, setUpiDetails] = useState({
        upiId: ''
    });

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) return; // Limit to 16 digits + 3 spaces
        }

        // Format expiry date
        if (name === 'expiryDate') {
            formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
            if (formattedValue.length > 5) return;
        }

        // Limit CVV to 3-4 digits
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length > 4) return;
        }

        setCardDetails(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleUpiInputChange = (e) => {
        setUpiDetails({
            upiId: e.target.value
        });
    };

    const validateCardDetails = () => {
        const { cardNumber, expiryDate, cvv, cardholderName } = cardDetails;

        if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
            return 'Please enter a valid 16-digit card number';
        }

        if (!expiryDate || expiryDate.length !== 5) {
            return 'Please enter a valid expiry date (MM/YY)';
        }

        if (!cvv || cvv.length < 3) {
            return 'Please enter a valid CVV';
        }

        if (!cardholderName.trim()) {
            return 'Please enter cardholder name';
        }

        return null;
    };

    const validateUpiDetails = () => {
        const { upiId } = upiDetails;
        const upiRegex = /^[\w.-]+@[\w.-]+$/;

        if (!upiId || !upiRegex.test(upiId)) {
            return 'Please enter a valid UPI ID';
        }

        return null;
    };

    const processPayment = async () => {
        setError('');
        setLoading(true);

        try {
            // Validate based on payment method
            let validationError = null;

            if (paymentMethod === 'card') {
                validationError = validateCardDetails();
            } else if (paymentMethod === 'upi') {
                validationError = validateUpiDetails();
            }

            if (validationError) {
                setError(validationError);
                setLoading(false);
                return;
            }

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, we'll make payment always successful
            // In real implementation, this would integrate with actual payment gateway
            setSuccess(true);

            // Store order details in localStorage for demo purposes
            const orderDetails = {
                orderId: 'ORD' + Date.now(),
                items: isCart ? cartItems : [{ product: product.id, quantity: 1 }],
                totalAmount: isCart ? cartItems.reduce((sum, item) => sum + (item.price * item.quentity), 0) : product.price,
                paymentMethod,
                orderDate: new Date().toISOString(),
                status: 'confirmed',
                user: user?.id
            };

            const existingOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
            existingOrders.push(orderDetails);
            localStorage.setItem('completedOrders', JSON.stringify(existingOrders));

            // Clear cart items if this was a cart purchase
            if (isCart && cartItems.length > 0) {
                // Clear all cart items after successful payment
                for (const item of cartItems) {
                    await dispatch(deleteOrderFromCard(item.id));
                }
            }

            setTimeout(() => {
                onHide();
                navigate('/myorder');
            }, 2000);
        } catch (err) {
            setError('An error occurred during payment processing.');
        } finally {
            setLoading(false);
        }
    };

    const renderPaymentForm = () => {
        if (paymentMethod === 'card') {
            return (
                <div className="mt-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardInputChange}
                                    placeholder="MM/YY"
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleCardInputChange}
                                    placeholder="123"
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="cardholderName"
                            value={cardDetails.cardholderName}
                            onChange={handleCardInputChange}
                            placeholder="John Doe"
                            required
                        />
                    </Form.Group>
                </div>
            );
        }

        if (paymentMethod === 'upi') {
            return (
                <div className="mt-3">
                    <Form.Group className="mb-3">
                        <Form.Label>UPI ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={upiDetails.upiId}
                            onChange={handleUpiInputChange}
                            placeholder="yourname@paytm"
                            required
                        />
                    </Form.Group>
                </div>
            );
        }

        return (
            <div className="mt-3 text-center">
                <p>You will be redirected to {paymentMethod} for payment processing.</p>
            </div>
        );
    };

    if (success) {
        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Body className="text-center py-5">
                    <div className="text-success mb-3">
                        <div style={{ fontSize: '4rem' }}>✅</div>
                    </div>
                    <h4 className="text-success">Payment Successful!</h4>
                    <p>Your order has been placed successfully.</p>
                    <p>Redirecting to orders page...</p>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Complete Your Payment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Order Summary */}
                <div className="border rounded p-3 mb-4 bg-light">
                    <h6>Order Summary</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img
                                src={product?.image}
                                alt={product?.name}
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                className="rounded me-3"
                            />
                            <div>
                                <p className="mb-1 fw-bold">{product?.name}</p>
                                <small className="text-muted">Qty: 1</small>
                            </div>
                        </div>
                        <div className="text-end">
                            <h5 className="mb-0">
                                <FaIndianRupeeSign /> {product?.price}
                            </h5>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <h6>Select Payment Method</h6>
                <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                        <div
                            className={`border rounded p-3 text-center cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                            onClick={() => setPaymentMethod('card')}
                            style={{ cursor: 'pointer' }}
                        >
                            <FaCreditCard className="fs-3 mb-2" />
                            <p className="mb-0">Credit/Debit Card</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div
                            className={`border rounded p-3 text-center cursor-pointer ${paymentMethod === 'upi' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                            onClick={() => setPaymentMethod('upi')}
                            style={{ cursor: 'pointer' }}
                        >
                            <FaGooglePay className="fs-3 mb-2" />
                            <p className="mb-0">UPI</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div
                            className={`border rounded p-3 text-center cursor-pointer ${paymentMethod === 'phonepe' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                            onClick={() => setPaymentMethod('phonepe')}
                            style={{ cursor: 'pointer' }}
                        >
                            <SiPhonepe className="fs-3 mb-2" />
                            <p className="mb-0">PhonePe</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div
                            className={`border rounded p-3 text-center cursor-pointer ${paymentMethod === 'paytm' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                            onClick={() => setPaymentMethod('paytm')}
                            style={{ cursor: 'pointer' }}
                        >
                            <SiPaytm className="fs-3 mb-2" />
                            <p className="mb-0">Paytm</p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                {renderPaymentForm()}

                {/* Error Alert */}
                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={processPayment}
                    disabled={loading}
                    className="d-flex align-items-center"
                >
                    {loading && <Spinner animation="border" size="sm" className="me-2" />}
                    {loading ? 'Processing...' : `Pay ₹${product?.price}`}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentGateway;