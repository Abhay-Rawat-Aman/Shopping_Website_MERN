import React, { useContext, useEffect, useState } from 'react';
import '../Cart/Cart.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from '@mui/material';
import Quantity from '../../components/QuantityBox/Quantity';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { getDataFromCart , removeFromCart } from '../../Api/authAPI';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userId = localStorage.getItem('UserId');
                if (!userId) {
                    console.error('User ID is not available in localStorage.');
                    history('/signIn');
                    return;
                }

                const cartData = await getDataFromCart(userId);
                console.log('cartData:', cartData);

                if (cartData && Array.isArray(cartData.cart)) {
                    setCartItems(cartData.cart);

                    // Calculate subtotal
                    const total = cartData.cart.reduce((acc, item) => acc + (item.productId.newPrice * item.quantity), 0);
                    setSubtotal(total);
                } else {
                    console.error('Cart data is not an array');
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [history]);


    console.log(cartItems)
    
    const handleRemoveItem = async (productId) => {
        try {
            const userId = localStorage.getItem('UserId');
            console.log(userId, productId);

            if (!userId) {
                console.error('User ID not found.');
                // You might want to redirect to login or show a message to the user
                return;
            }

            const response = await removeFromCart(userId, productId);

            if (response.success) {
                // Update the cartItems state
                setCartItems(prevItems => prevItems.filter(item => item.productId._id !== productId));

                // Recalculate the subtotal
                setSubtotal(prevSubtotal => {
                    const removedItem = cartItems.find(item => item.productId._id === productId);
                    return prevSubtotal - (removedItem.productId.newPrice * removedItem.quantity);
                });

                console.log("Item removed successfully");
            } else {
                console.error('Failed to remove item from the cart:', response.message);
                // Show an error message to the user
            }
        } catch (error) {
            console.error('Error removing item from the cart:', error);
            // Show an error message to the user
        }
    };



    return (
        <>
            <div className="breadcrumbWrapper">
                <div className="container-fluid">
                    <div className="breadcrumb">
                        <ul className="list list-inline mb-0 flex-row">
                            <li className="list-inline-item">
                                <strong>
                                    <a href="/">Home</a>
                                </strong>
                            </li>
                            <li className="list-inline-item me-2">
                                <span>→</span>
                            </li>
                            <li className="list-inline-item">
                                <strong>Shop</strong>
                            </li>
                            <li className="list-inline-item me-2">
                                <span>→</span>
                            </li>
                            <li className="list-inline-item">Cart</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="cartSection mb-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="d-flex align-items-center">
                                <div className="left">
                                    <h1 className="hd mb-0">Your Cart</h1>
                                    <p>There are <span className="text-g">{cartItems.length}</span> Products in your cart</p>
                                </div>

                                <span className="ms-auto clearCart d-flex align-items-center cursor">
                                    <DeleteOutlinedIcon /> Clear Cart
                                </span>
                            </div>

                            <div className="cartWrapper mt-4">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover" style={{ zoom: '85%', width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center first" style={{ width: '50%' }}>Product</th>
                                                <th scope="col" className="text-center">Unit Price</th>
                                                <th scope="col" className="text-center">Quantity</th>
                                                <th scope="col" className="text-center">Subtotal</th>
                                                <th scope="col" className="text-center end">Remove</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {cartItems.length !== 0 && cartItems.map((item, index) => (
                                                
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="img">
                                                                <Link to={`/product/${item.productId._id}`}>
                                                                    <img src={item.productId.image} className="w-100" alt={item.productId.name} />
                                                                </Link>
                                                            </div>
                                                            <div className="info ps-4">
                                                                <Link to={`/product/${item.productId._id}`}><h5>{item.productId.name}</h5></Link>
                                                                <Rating name="half-rating-read" value={parseFloat(item.productId.rating)} precision={0.5} readOnly />
                                                                ({parseFloat(item.productId.rating)})
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span>Rs. {item.productId.newPrice.toFixed(2)}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span>{item.quantity}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="text-g">Rs. {(item.productId.newPrice * item.quantity).toFixed(2)}</span>
                                                    </td>
                                                    <td className="text-center" onClick={() => handleRemoveItem(item.productId._id)}>
                                                        <DeleteOutlinedIcon className="cursor" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 ps-5 cartRightBox">
                            <div className="card p-3 shadow card-hover">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 tableInfo">Subtotal</h5>
                                    <h3 className="ms-auto mb-0 tableInfoDetail"><span className="text-g">${subtotal.toFixed(2)}</span></h3>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 tableInfo">Shipping</h5>
                                    <h3 className="ms-auto mb-0 tableInfoDetail"><span className="text-g">$Free</span></h3>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 tableInfo">Estimate for</h5>
                                    <h3 className="ms-auto mb-0 tableInfoDetail"><span className="text-g">United Kingdom</span></h3>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center mb-2">
                                    <h5 className="mb-0 tableInfo">Total</h5>
                                    <h3 className="ms-auto mb-0 tableInfoDetail"><span className="text-g">${subtotal.toFixed(2)}</span></h3>
                                </div>
                                <hr />
                                <Button className="btn-g w-100 addToCartBtn mt-3 mr-3">
                                    <ShoppingCartOutlinedIcon /> Proceed to checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
