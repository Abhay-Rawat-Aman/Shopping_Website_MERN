import React, { useContext, useEffect, useState } from 'react';
import '../Cart/Cart.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from '@mui/material';
import Quantity from '../../components/QuantityBox/Quantity';

import { MyContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const context = useContext(MyContext);
    const history = useNavigate(); 

    useEffect(() => {
        if(context.isLogin === 'true'){
            getCartData('http://localhost:3000/cartItems');
        }else{
            history('/signIn')
        }
    }, [])

    const getCartData = async (url) => {
        try {

            await axios.get(url).then((response) => {
                setCartItems(response.data);
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteItem = async (id) => {
        try {

            const response = await axios.delete(`http://localhost:3000/cartItems/${id}`);

            if (response !== null) {
                context.getCartData("http://localhost:3000/cartItems");
                context.removeItemsFromCart(id);
            } else {
                console.log(response)
            }

        } catch (error) {
            console.log({ mesage: error.response.data, error })
        }

    }



    return (
        <>

            <div class="breadcrumbWrapper">
                <div class="container-fluid">
                    <div class="breadcrumb">
                        <ul class="list list-inline mb-0 flex-row">
                            <li class="list-inline-item">
                                <strong>
                                    <a href="/">Home </a>
                                </strong>
                            </li>
                            <li class="list-inline-item me-2">
                                <span>→</span>
                            </li>
                            <li class="list-inline-item">
                                <strong>
                                    Shop
                                </strong>
                            </li>
                            <li class="list-inline-item me-2">
                                <span>→</span>
                            </li>
                            <li class="list-inline-item">
                                Cart
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <section className='cartSection mb-4'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='d-flex align-items-center'>
                                <div className='left'>
                                    <h1 className='hd mb-0'>Your Cart</h1>
                                    <p>There are <span className='text-g'>3</span> Product in your cart</p>
                                </div>

                                <span className='ms-auto clearCart d-flex align-items-center cursor'> <DeleteOutlinedIcon /> Clear Cart</span>
                            </div>


                            <div class='cartWrapper mt-4'>
                                <div class='table-responsive'>
                                    <table className='table table-striped table-hover ' style={{ zoom: '85%', width: '100%' }}>
                                        <thead >
                                            <tr>
                                                <th scope='col' className='text-center first' style={{ width: '50%' }}>Product</th>
                                                <th scope='col' className='text-center'>Unit Price</th>
                                                <th scope='col' className='text-center'>Quantity</th>
                                                <th scope='col' className='text-center'>Subtotal</th>
                                                <th scope='col' className='text-center end'>Remove</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartItems.length !== 0 &&
                                                cartItems.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td >
                                                                <div className='d-flex align-items-center'>
                                                                    <div className='img'>
                                                                        <Link to={`/product/${item.id}`}>
                                                                            <img src={item.catImg + '?im=Resize=(100,100)'} className='w-100' />
                                                                        </Link>
                                                                    </div>

                                                                    <div className='info ps-4'>
                                                                        <Link to={`/product/${item.id}`}><h5>{item.productName}</h5></Link>
                                                                        <Rating name="half-rating-read" value={parseFloat(item.rating)} precision={0.5} readOnly />({parseFloat(item.rating)})

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='text-center'>
                                                                <span>Rs.{parseInt(item.price.split(',').join(''))}</span>
                                                            </td>

                                                            <td className='text-center'>
                                                                <Quantity />
                                                            </td>

                                                            <td className='text-center'><span className='text-g'>$2.51</span></td>

                                                            <td align='center' onClick={() => deleteItem(item.id)} ><span  ><DeleteOutlinedIcon className='cursor' /></span></td>
                                                        </tr>
                                                    )
                                                })

                                            }


                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4 ps-5 cartRightBox'>
                            <div className='card p-3 shadow card-hover '>
                                <div className='d-flex align-items-center '>
                                    <h5 className="mb-0 tableInfo">Subtotal</h5>
                                    <h3 className='ms-auto mb-0 tableInfoDetail'><span className='text-g'>$13.15</span></h3>
                                </div>

                                <hr />

                                <div className='d-flex align-items-center '>
                                    <h5 className="mb-0 tableInfo">Shipping</h5>
                                    <h3 className='ms-auto mb-0 tableInfoDetail'><span className='text-g'>$Free</span></h3>
                                </div>

                                <hr />

                                <div className='d-flex align-items-center '>
                                    <h5 className="mb-0 tableInfo">Estimate for</h5>
                                    <h3 className='ms-auto mb-0 tableInfoDetail'><span className='text-g'>United Kingdom</span></h3>
                                </div>

                                <hr />

                                <div className='d-flex align-items-center mb-2'>
                                    <h5 className="mb-0 tableInfo">Total</h5>
                                    <h3 className='ms-auto mb-0 tableInfoDetail'><span className='text-g'>$12.31</span></h3>
                                </div>

                                <hr />

                                <Button className='btn-g w-100 addToCartBtn mt-3 mr-3'><ShoppingCartOutlinedIcon />Proceed to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>


    )
}

export default Cart