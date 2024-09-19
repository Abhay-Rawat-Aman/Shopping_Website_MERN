import React, { useEffect, useState, useContext } from 'react';
import '../Product/Product.css';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { addToCart } from '../../Api/authAPI';

const Product = (props) => {
    const [productData, setProductData] = useState(props.item || {});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarPosition] = useState({
        vertical: 'top',
        horizontal: 'right',
    });

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleBuyNowClick = () => {
        navigate(`/Product/${productData._id}`);
    };

    useEffect(() => {
        setProductData(props.item || {});
    }, [props.item]);

    const setProductCat = () => {
        sessionStorage.setItem('parentCat', productData.parentCatName || '');
        sessionStorage.setItem('subCatName', productData.subCatName || '');
    };

    const handleAddToCart = async () => {
        try {
            const userId = localStorage.getItem('UserId');
            if (!userId) {
                console.error('User not logged in');
                return;
            }

            const cartItem = {
                userId: userId,
                productId: productData._id,
                quantity: 1,
            };

            const response = await addToCart(cartItem);

            if (response.success) {
                context.addToCart(productData); 
                setSnackbarOpen(true);
            } else {
                console.error("Failed to add item to cart:", response.message);
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const value = parseFloat(productData.rating) || 0;
    const discount = productData.discount || 0;

    return (
        <div className='row productThumb' style={{ zoom: '90%' }} onClick={setProductCat}>
            {props.tag && <span className={`badge ${props.tag}`}>{props.tag}</span>}
            {productData._id ? (
                <>
                    <Link to={`/Product/${productData._id}`}>
                        <div className='imageWrapper'>
                            <div className='p-4 wrapper'>
                                <img src={productData.mainImage + '?im=Resize=(420,420)'} className='w-100' alt={productData.name || 'Product Image'} />
                                <span className='discount'>-{discount}</span>
                            </div>
                        </div>
                    </Link>
                    <div className='info'>
                        <span className='d-block CatName'>{productData.brandId || 'Unknown Brand'}</span>
                        <h4 className='title'>
                            <Link>{productData.name ? productData.name.substr(0, 70) + '...' : 'No Name'}</Link>
                        </h4>
                        <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
                        <span className='d-block brand'>By <Link className='text-g'>{productData.brandId || 'Unknown Brand'}</Link></span>
                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price font-weight-bold'>Rs{productData.newPrice || 'N/A'} </span>
                                {productData.oldPrice && <span className='oldPrice'>Rs{productData.oldPrice}</span>}
                            </div>
                        </div>
                        <div className='buttonContainer'>
                            <Button
                                className='addToCartButton'
                                variant="contained"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCartOutlinedIcon /> Add to cart
                            </Button>
                            <Button
                                className='buyNowButton'
                                variant="contained"
                                onClick={handleBuyNowClick}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div>No product data available</div>
            )}

            <Snackbar
                anchorOrigin={snackbarPosition}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Added to cart successfully!"
                ContentProps={{
                    className: 'animated-snackbar',
                }}
                style={{ zIndex: "10000" }}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />

            <style jsx>{`
                @keyframes borderAnimation {
                    0% {
                        border-image: linear-gradient(90deg, #FF0000 0%, #FF0000 0%, transparent 0%, transparent 100%) 1;
                    }
                    100% {
                        border-image: linear-gradient(90deg, #FF0000 0%, #FF0000 100%, transparent 100%, transparent 100%) 1;
                    }
                }

                .animated-snackbar {
                    border: 3px solid;
                    border-image: linear-gradient(90deg, #FF0000 0%, #FF0000 0%, transparent 0%, transparent 100%) 1;
                    animation: borderAnimation 3s linear;
                }

                .animated-snackbar .MuiSnackbarContent-message {
                    padding-right: 10px;
                }
            `}</style>
        </div>
    );
};

export default Product;
