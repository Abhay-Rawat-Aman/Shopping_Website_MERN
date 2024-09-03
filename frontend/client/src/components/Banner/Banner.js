import React from 'react'
import Banner1 from '../../assets/Images/banner1.png';
import Banner2 from '../../assets/Images/banner2.png';
import Banner3 from '../../assets/Images/banner3.png';
import '../Banner/Banner.css';


const Banner = () => {
    return (
        <div className='bannerSection'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='box'>
                            <img src={Banner1} className='w-100 transition' />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='box'>
                            <img src={Banner2} className='w-100 transition' />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='box'>
                            <img src={Banner3} className='w-100 transition' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner