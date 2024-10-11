import React from 'react'
import '../Footer/Footer.css';
import Icon1 from '../../assets/Images/icon-1.svg'
import Icon2 from '../../assets/Images/icon-2.svg'
import Icon3 from '../../assets/Images/icon-3.svg'
import Icon4 from '../../assets/Images/icon-4.svg'
import Icon5 from '../../assets/Images/icon-5.svg'
import Logo from '../../assets/Images/logo.svg';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import SendIcon from '@mui/icons-material/Send';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import AppStore from '../../assets/Images/app-store.jpg';
import GoogleStore from '../../assets/Images/google-play.jpg';
import PaymentMethod from '../../assets/Images/payment-method.png';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { FacebookOutlined } from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';
import { YouTube } from '@mui/icons-material';
import { Twitter } from '@mui/icons-material';
import { Pinterest } from '@mui/icons-material';
import Newsletter from '../../components/NewsLetter/Newsletter';
import NewsLetterPhoto from '../../assets/Images/newsletter.png';


const Footer = () => {
    return (
        <>

        <section className='newsLetterSection'>
        <div className='container-fluid'>
          <div className='box d-flex align-items-center'>
            <div className='info '>
              <h2 className='font-new'>Stay home & get your daily needs from our shop</h2>
              <p className='font-new'>Start You'r Daily Shopping with Nest Mart</p>
              <br/>
              <br/>
              <Newsletter/>
            </div>

            <div className='img'>
              <img src={NewsLetterPhoto} className='w-100' />
            </div>
          </div>
        </div>
      </section>

        <div className='footerWrapperr'>
            <div className='footerBoxes'>
                <div className='container-fluid'>
                    <div className='row align-items-center'>
                        <div className='col'>
                            <div className='box d-flex align-items-center w-100'>
                                <Link> <img src={Icon1} /> </Link>
                                <div className='info'>
                                    <h4>Best prices & offers</h4>
                                    <p>Orders $50 or more</p>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='box d-flex align-items-center w-100'>
                                <Link> <img src={Icon2} /> </Link>
                                <div className='info'>
                                    <h4>Free delivery</h4>
                                    <p>24/7 amazing services</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='box d-flex align-items-center w-100'>
                                <Link> <img src={Icon3} /> </Link>
                                <div className='info'>
                                    <h4>Great daily deal</h4>
                                    <p>When you sign up</p>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='box d-flex align-items-center w-100'>
                                <Link> <img src={Icon5} /> </Link>
                                <div className='info'>
                                    <h4>Easy returns</h4>
                                    <p>Within 30 days</p>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='box d-flex align-items-center w-100'>
                                <Link> <img src={Icon5} /> </Link>
                                <div className='info'>
                                    <h4>Easy returns</h4>
                                    <p>Within 30 days</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <hr />

            <footer>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3 parts1'>
                            <Link to=""><img src={Logo} /></Link>
                            <p>Awesome grocery store website template</p>
                            <p> <LocationOnOutlinedIcon /><strong className="Address">Address:</strong> 5171 W Campbell Ave undefined Kent, Utah 53127 United States</p>
                            <p> <HeadsetMicOutlinedIcon /><strong className="Address">Call Us:</strong>(+91) - 540-025-124553</p>
                            <p> <SendIcon /><strong className="Address">Email:</strong> sale@Nest.com</p>
                            <p> <AccessAlarmOutlinedIcon /><strong className="Address">Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
                        </div>


                        <div className='col-md-6 parts2'>
                            <div className='row'>
                                <div className='col'>
                                    <h3>Company</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0">
                                        <li><Link to="">About Us</Link></li>
                                        <li><Link to="">Delivery Information</Link></li>
                                        <li><Link to="">Privacy Policy</Link></li>
                                        <li><Link to="">Terms &amp; Conditions</Link></li>
                                        <li><Link to="">Contact Us</Link></li>
                                        <li><Link to="">Support Center</Link></li>
                                        <li><Link to="">Careers</Link></li>
                                    </ul>
                                </div>
                                <div className='col'>
                                    <h3>Account</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0">
                                        <li><Link to="#">Sign In</Link> </li>
                                        <li><Link to="#">View Cart</Link></li>
                                        <li><Link to="#">My Wishlist</Link></li>
                                        <li><Link to="#">Track My Order</Link></li>
                                        <li><Link to="#">Help Ticket</Link></li>
                                        <li><Link to="#">Shipping Details</Link></li>
                                        <li><Link to="#">Compare products</Link></li>
                                    </ul>
                                </div>
                                <div className='col'>
                                    <h3>Corporate</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0">
                                        <li><Link to="#">Become a Vendor</Link></li>
                                        <li><Link to="#">Affiliate Program</Link></li>
                                        <li><Link to="#">Farm Business</Link></li>
                                        <li><Link to="#">Farm Careers</Link></li>
                                        <li><Link to="#">Our Suppliers</Link></li>
                                        <li><Link to="#">Accessibility</Link></li>
                                        <li><Link to="#">Promotions</Link></li>
                                    </ul>
                                </div>
                                <div className='col'>
                                    <h3>Popular</h3>
                                    <ul className="footer-list mb-sm-5 mb-md-0">
                                        <li><Link to="#">Milk &amp; Flavoured Milk</Link></li>
                                        <li><Link to="#">Butter and Margarine</Link></li>
                                        <li><Link to="#">Eggs Substitutes</Link></li>
                                        <li><Link to="#">Marmalades</Link></li>
                                        <li><Link to="#">Sour Cream and Dips</Link></li>
                                        <li><Link to="#">Tea &amp; Kombucha</Link></li>
                                        <li><Link to="#">Cheese</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-3 parts3'>
                            <h3>Install App</h3>
                            <p>From App Store or Google Play</p>
                            <div className='d-flex download'>
                                <Link to=''> <img src={AppStore} width={150} /> </Link>
                                <Link to=''> <img src={GoogleStore} width={150} /> </Link>
                            </div>

                            <p>Secured Payment Gateways</p>
                            <img src={PaymentMethod} />
                        </div>

                        <hr />

                        <div className='row lastStrip'>

                            <div className='col-md-3'>
                                <p>© 2022, Nest - HTML Ecommerce Template
                                    All rights reserved</p>
                            </div>

                            <div className='col-md-6 d-flex'>
                                <div className='m-auto d-flex align-items-center'>
                                    <div className='phoneNum d-flex align-items-center  mx-3 '>
                                        <span><HeadphonesOutlinedIcon /></span>
                                        <div className='info ml-3'>
                                            <h3 className='text-g mb-0'>1900 - 888</h3>
                                            <p className='mb-0'>24/7 Support Center</p>
                                        </div>
                                    </div>
                                    <div className='phoneNum d-flex align-items-center mx-3'>
                                        <span><HeadphonesOutlinedIcon /></span>
                                        <div className='info ml-3'>
                                            <h3 className='text-g mb-0'>1900 - 888</h3>
                                            <p className='mb-0'>24/7 Support Center</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-3 parts3'>
                                <h5>Follow Us</h5>
                                <ul className='list list-inline d-flex align-items-center'>
                                    <li className='list-inline-items'> <Link to={''}> <FacebookOutlined /></Link></li>
                                    <li className='list-inline-items'> <Link to={''}> <Pinterest /></Link></li>
                                    <li className='list-inline-items'> <Link to={''}> <Instagram /></Link></li>
                                    <li className='list-inline-items'> <Link to={''}> <Twitter /></Link></li>
                                    <li className='list-inline-items'> <Link to={''}> <YouTube /></Link></li>
                                </ul>

                                <p>Up to 15% discount on your first subscribe</p>
                            </div>

                        </div>

                    </div>
                </div>
            </footer>
        </div>

        </>
    )
}

export default Footer