import React from 'react'
import Slider from 'react-slick'
import '../Slider/Slider.css';
import Slide1 from '../../../assets/Images/slider-1.png';
import Slide2 from '../../../assets/Images/slider-2.png';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Newsletter from '../../../components/NewsLetter/Newsletter';

const SliderContainer = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrow: true
    };

    return (
        <div className='homeSlider'>
            <div className='container-fluid position-relative'>

                <Slider {...settings} className='home_slider_main'>
                    <div className='item'>
                        <img src={Slide1} className='w-100' />

                        <div className='info'>
                            <h2 className='mb-4'>
                                Don't Miss Amazing <br />
                                grocery deals
                            </h2>
                            <p>Sign up for daily NewsLetter</p>
                        </div>
                    </div>

                    <div className='item'>
                        <img src={Slide2} className='w-100' />
                        <div className='info'>
                            <h2 className='mb-4'>
                                Fresh Vegetables<br />
                                Big discount
                            </h2>
                            <p>Save up to 50% off on your first order</p>
                        </div>
                    </div>
                </Slider>

                <Newsletter/>
                
            </div>
        </div>
    )
}

export default SliderContainer