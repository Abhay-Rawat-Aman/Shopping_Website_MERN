import React, { useEffect, useRef, useState } from 'react';
import '../Header/Header.css';
import Logo from '../../assets/Images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import Select from '../SelectDrop/Select';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WishlistIcon from '../../assets/Images/icon-heart.svg';
import Cart from '../../assets/Images/icon-cart.svg';
import Account from '../../assets/Images/icon-user.svg';
import Nav from './Nav/Nav';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const history = useNavigate();
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userName, setUserName] = useState(''); 
    const categories = [
        'Milks and Dairies',
        'Clothing Beauty',
        'Pet Foods Toy',
        'Baking material',
        'Fresh Fruit',
        'Wines Drinks',
        'Fresh Seafood',
        'Fast food',
        'Vegetables',
        'Bread and Juice'
    ];

    const countryList = [
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'Germany',
        'France',
        'Italy',
        'Spain',
        'India',
        'China'
    ];

    const HeaderRef = useRef(null);

    useEffect(() => {
        const user = localStorage.getItem('isLogin'); 
        const fname = localStorage.getItem('firstName');
        const lname = localStorage.getItem('lastName');
        if (user) {
            setIsLoggedIn(true);
            setUserName(fname+' '+lname); 
        }
    }, []);

    const SignOut = () => {
        localStorage.removeItem('isLogin'); 
        setIsLoggedIn(false);
        setUserName('');
        history('/');
    };

    return (
        <>
            <div className="headWrapper" ref={HeaderRef}>
                <header>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-sm-2 d-flex align-items-center justify-center'>
                                <img src={Logo} height="50px" alt="Logo" />
                            </div>

                            <div className='col-sm-5'>
                                <div className='headerSearch d-flex align-items-center'>
                                    <div className='selectBoxes'>
                                        <Select
                                            data={categories}
                                            placeholder={"All Categories"}
                                            icon={false}
                                        />
                                    </div>
                                    <div className='search'>
                                        <input type='text' placeholder='Search the Item' />
                                        <SearchIcon className='SearchIcon cursor' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-5 d-flex align-items-center'>
                                <div className='ms-auto d-flex align-items-center' style={{ width: '100%', gap: "30px" }}>
                                    <div className='coutryWrapper' style={{ background: '#fff' }}>
                                        <Select
                                            data={countryList}
                                            placeholder={"Your Location"}
                                            icon={<LocationOnOutlinedIcon style={{ opacity: '0.7' }} />}
                                        />
                                    </div>
                                    <ClickAwayListener onClickAway={() => setIsOpenDropdown(false)}>
                                        <ul className='list list-inline mb-0 headerTabs'>
                                            {/* <li className='list-inline-items'>
                                                <span>
                                                    <img src={WishlistIcon} alt="Wishlist" />
                                                    <span className='badge bg-success rounded-circle'>3</span>
                                                    Wishlist
                                                </span>
                                            </li> */}
                                            <li className='list-inline-items'>
                                                <span>
                                                    <img src={Cart} alt="Cart" />
                                                    <span className='badge bg-success rounded-circle'>
                                                        5
                                                    </span>
                                                    <Link to={'/cart'}><span className='text-black'>Cart</span></Link>
                                                </span>
                                            </li>
                                            <li className='list-inline-items'>
                                                {isLoggedIn ? (
                                                    <span onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                                                        <img src={Account} alt="Account" />
                                                        {userName}
                                                    </span>
                                                ) : (
                                                    <Button className='bg-g signIn m-0'>
                                                        <Link to={'/signIn'}>Sign In</Link>
                                                    </Button>
                                                )}
                                                {isOpenDropdown && isLoggedIn && (
                                                    <ul className='dropdownMenue'>
                                                        <li><Button className='align-items-center'><AccountCircleOutlinedIcon /> My Account</Button></li>
                                                        <li><Button className='align-items-center'><FmdGoodOutlinedIcon /> Tracking</Button></li>
                                                        <li><Button className='align-items-center'><FavoriteBorderOutlinedIcon /> My Voucher</Button></li>
                                                        <li><Button className='align-items-center'><CardGiftcardOutlinedIcon /> My Wishlist</Button></li>
                                                        <li><Button className='align-items-center'><SettingsOutlinedIcon /> Settings</Button></li>
                                                        <li><Button className='align-items-center' onClick={SignOut}><LogoutOutlinedIcon /> Logout</Button></li>
                                                    </ul>
                                                )}
                                            </li>
                                        </ul>
                                    </ClickAwayListener>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Nav data={[]} />
            </div>
        </>
    );
};

export default Header;
