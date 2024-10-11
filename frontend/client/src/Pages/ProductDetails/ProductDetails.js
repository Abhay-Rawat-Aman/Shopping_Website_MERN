import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, createOrder , verifyPayment } from '../../Api/authAPI';
import { Alert, Rating } from '@mui/material';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetails.css';
import { ShoppingCart } from '@mui/icons-material';
import axios from 'axios';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const ProductDetails = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeAttributes, setActiveAttributes] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const data = await getProductById(productId);
                setProductData(data);
                const initialAttributes = {};
                ['weight', 'RAM', 'SIZE'].forEach(attr => {
                    if (data[attr] && data[attr].length > 0) {
                        initialAttributes[attr] = 0;
                    }
                });
                setActiveAttributes(initialAttributes);
            } catch (error) {
                showSnackbar('Error fetching product data', 'error');
            }
        };

        fetchProductData();
    }, [productId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    const handleAttributeClick = (attr, index) => {
        setActiveAttributes((prev) => ({
            ...prev,
            [attr]: index,
        }));
    };

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleBuyNow = async () => {
        if (!productData) return;

        setLoading(true);

        try {
            const orderResponse = await createOrder(productId, quantity);

            const { order } = orderResponse;

            const options = {
                key: "rzp_test_zR3Hw3haQMWYC9",
                amount: order.amount,
                currency: "INR",
                name: "Nest Mart & Grocery",
                description: `Purchase of ${productData.name}`,
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const verificationResponse = await verifyPayment(
                            response.razorpay_order_id,
                            response.razorpay_payment_id,
                            response.razorpay_signature
                        );


                        if (verificationResponse.success) {
                            showSnackbar("Payment Successful! Thank you for your purchase.", "success");
                        } else {
                            showSnackbar("Payment verification failed. Please try again.", "error");
                        }
                    } catch (error) {
                        showSnackbar("An error occurred during payment verification. Please try again.", "error");
                    }
                },
                prefill: {
                    name: "Pawan",
                    email: "Pawan12@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!productData) {
        return (
            <div className="product-details-page">
                <div className="container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading product details...</p>
                </div>
            </div>
        );
    }

    const categories = [
        { name: 'Home', link: '/' },
        {
            name: productData.categoryId,
            link: `/cat/${productData.categoryId.split(" ").join("-").toLowerCase()}`
        },
        {
            name: productData.subCategory,
            link: `/cat/${productData.categoryId.split(" ").join("-").toLowerCase()}/${productData.subCategory.split(" ").join("-").toLowerCase()}`
        },
        { name: productData.name, link: null },
    ];

    const attributes = ['weight', 'RAM', 'SIZE'];

    return (
        <div className="product-details-page">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb" className="breadcrumb-wrapper">
                <div className="container">
                    <ol className="breadcrumb">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className={`breadcrumb-item ${!category.link ? 'active' : ''}`}
                                aria-current={!category.link ? 'page' : undefined}
                            >
                                {category.link ? <Link to={category.link}>{category.name}</Link> : category.name}
                            </li>
                        ))}
                    </ol>
                </div>
            </nav>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Product Details */}
            <div className="container my-5">
                <div className="row">
                    {/* Product Image */}
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="product-image-wrapper">
                            {productData.mainImage ? (
                                <InnerImageZoom
                                    src={productData.mainImage}
                                    zoomType="hover"
                                    zoomScale={2.6}
                                    className="product-image"
                                    alt={productData.name}
                                />
                            ) : (
                                <img
                                    src="/path/to/default-image.jpg"
                                    alt="Default Product"
                                    className="product-image"
                                />
                            )}
                        </div>
                    </div>

                    {/* Product Information and Details */}
                    <div className="col-lg-8">
                        <div className="product-info-details-box p-4">
                            {/* Product Information */}
                            <div className="product-info mb-4">
                                <h1 className="product-title">{productData.name}</h1>
                                <div className="product-rating">
                                    <Rating
                                        name="product-rating"
                                        value={parseFloat(productData.rating) || 0}
                                        precision={0.5}
                                        readOnly
                                    />
                                    <span className="rating-value">({productData.rating || 'N/A'})</span>
                                </div>
                                <div className="product-price">
                                    <span className="current-price">Rs. {productData.newPrice}</span>
                                    {productData.discount && (
                                        <span className="price-info">
                                            <span className="discount">{productData.discount} Off</span>
                                            <del className="old-price">Rs. {productData.oldPrice}</del>
                                        </span>
                                    )}
                                </div>
                                <p className="product-description">{productData.description}</p>

                                {/* Product Attributes */}
                                {attributes.map((attr) => (
                                    Array.isArray(productData[attr]) && productData[attr].length > 0 && (
                                        <div className="product-attribute" key={attr}>
                                            <h6 className="attribute-title">{attr.charAt(0).toUpperCase() + attr.slice(1)}:</h6>
                                            <div className="attribute-options">
                                                {productData[attr].map((item, index) => (
                                                    <button
                                                        key={index}
                                                        className={`attribute-option ${activeAttributes[attr] === index ? 'active' : ''}`}
                                                        onClick={() => handleAttributeClick(attr, index)}
                                                        aria-pressed={activeAttributes[attr] === index}
                                                    >
                                                        {item}{attr === 'weight' ? 'g' : attr === 'RAM' ? 'GB' : ''}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}

                                {/* Quantity Selector */}
                                <div className="quantity-wrapper">
                                    <h6 className="attribute-title">Quantity:</h6>
                                    <div className="quantity-input">
                                        <button
                                            className="quantity-btn"
                                            onClick={decrementQuantity}
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            aria-label="Quantity"
                                        />
                                        <button
                                            className="quantity-btn"
                                            onClick={incrementQuantity}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="product-actions">
                                    <button
                                        className="btn-add-to-cart"
                                        onClick={handleBuyNow}
                                        disabled={loading}
                                    >
                                        <ShoppingCart style={{ marginRight: '8px' }} />
                                        {loading ? 'Processing...' : 'Buy Now'}
                                    </button>
                                    <button className="btn-wishlist">Add to Wishlist</button>
                                </div>
                            </div>

                            {/* Product Details Table */}
                            <ul className="product-details">
                                <li><strong>Category:</strong> {productData.subCategory}</li>
                                <li><strong>Brand:</strong> {productData.brandId}</li>
                                <li><strong>Description:</strong> {productData.description}</li>
                                <li><strong>Price:</strong> Rs. {productData.price}</li>
                                <li><strong>Discount:</strong> {productData.discount}</li>
                                <li><strong>Stock:</strong> {productData.stock}</li>
                                <li><strong>Rating:</strong> {productData.rating} / 5</li>
                                <li><strong>Sales:</strong> {productData.sales}</li>
                                <li><strong>Weight:</strong> {productData.weight}</li>
                                <li><strong>Dimensions:</strong> {productData.dimensions}</li>
                                <li><strong>Colors:</strong> {productData.colors}</li>
                                <li><strong>Sizes:</strong> {productData.sizes}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;