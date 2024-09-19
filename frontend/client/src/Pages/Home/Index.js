import React, { useState, useEffect } from 'react';
import SliderContainer from './Slider/Slider';
import Banner from '../../components/Banner/Banner';
import Product from '../../components/Product/Product';
import Banner4 from '../../assets/Images/banner4.png';
import Slider from 'react-slick';
import '../Home/style.css';

const Home = (props) => {
  const [prodData, setProdData] = useState(props.data || []);
  const [bestSells, setBestSells] = useState([]);
  const [showSlider, setShowSlider] = useState(window.innerWidth > 768);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  useEffect(() => {
    setBestSells(props.data);
  }, [prodData]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setShowSlider(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="home-container">
      
      {showSlider && <SliderContainer />}
      
      <Banner />
      <div className='homeProducts homeProductWrapper'>
        <div className='container-fluid'>
          <div className='d-flex align-items-center'>
            <h2 className='hd'>Popular Products</h2>
          </div>
          <div className='productRow'>
            {prodData.length > 0 ? (
              prodData.map((item, index) => (
                <div className='item' key={index}>
                  <Product tag={item.type} item={item} />
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
      <section className='homeProducts homeProductsRow2 p-0'>
        <div className='container-fluid'>
          <div className='d-flex align-items-center'>
            <h2 className='hd'>Daily Best Sales</h2>
          </div>
          <div className='row'>
            <div className='col-md-3'>
              <img src={Banner4} className='w-100' alt="Banner" />
            </div>
            <div className='col-md-9'>
              <Slider {...settings}>
                {bestSells.map((item, index) => (
                  <div key={index} className="slider-item">
                    <Product tag={item.type} item={item} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;