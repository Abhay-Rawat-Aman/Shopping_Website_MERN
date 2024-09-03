import React, { useState, useEffect } from 'react';
import SliderContainer from './Slider/Slider';
import CatSlider from '../../components/CategorySlider/CatSlider';
import Banner from '../../components/Banner/Banner';
import '../Home/style.css';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';
import Banner4 from '../../assets/Images/banner4.png';
import Slider from 'react-slick';

const Home = (props) => {
  const [prodData, setProdData] = useState(props.data || []);
  const [bestSells, setBestSells] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    autoplay: 2000,
    centerMode: true,
  };

  const isRecentlyAdded = (createdAt) => {
    const now = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(now.getDate() - 2);

    const productDate = new Date(createdAt);

    return productDate >= twoDaysAgo;
  };

  useEffect(() => {

    const bestSellsArr = [];
    const topSellingArr = [];
    const trendingProductsArr = [];
    const recentlyAddedArr = [];
    const topRatedArr = [];

    prodData.forEach(product => {
      if (product.price) {
        bestSellsArr.push(product);
        if (product.isTopSelling) topSellingArr.push(product);
        if (product.isTrending) trendingProductsArr.push(product);
        if (isRecentlyAdded(product.createdAt)) recentlyAddedArr.push(product);
        if (product.rating && product.rating >= 4) topRatedArr.push(product);
      }
    });


    setBestSells(bestSellsArr);
    setTopSelling(topSellingArr);
    setTrendingProducts(trendingProductsArr);
    setRecentlyAdded(recentlyAddedArr);
    setTopRated(topRatedArr);
    
  }, [prodData]);

  return (
    <>
      <SliderContainer />
      {/* <CatSlider data={prodData} /> */}
      <Banner />
      <div className='homeProducts homeProductWrapper'>
        <div className='container-fluid'>
          <div className='d-flex align-items-center'>
            <h2 className='hd'>Popular Product</h2>
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
              <Slider {...settings} className='productSlider'>
                {bestSells.length > 0 ? (
                  bestSells.map((item, index) => (
                    <div className='item wide' key={index}>
                      <Product tag={item.type} item={item} />
                    </div>
                  ))
                ) : (
                  <p>No best selling products available.</p>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
