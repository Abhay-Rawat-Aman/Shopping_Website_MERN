import React, { useEffect, useState } from 'react';
import '../CategorySlider/CatSlider.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const CatSlider = (props) => {
    const [allData, setAllData] = useState([]);
    const [totalLength, setTotalLength] = useState([]);

    // Default background colors and images are no longer needed, so they can be removed.
    // Instead, use the data from props or the backend directly if available.

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 3000,
    };

    useEffect(() => {
        // Assuming `props.data` contains the backend JSON data for the categories
        if (props.data) {
            setAllData(props.data);

            let lengthArr = [];
            let catLength = 0;

            props.data.forEach((item) => {
                if (item.variations) {
                    item.variations.forEach((variation) => {
                        catLength += variation.stock; 
                    });
                }
                lengthArr.push(catLength);
                catLength = 0;
            });

            const uniqueLengths = lengthArr.filter((item, index) => lengthArr.indexOf(item) === index);
            setTotalLength(uniqueLengths);
        }
    }, [props.data]);

    return (
        <>
            <div className='catSliderSection'>
                <div className='container-fluid'>
                    <h2 className='hd'>Featured Category</h2>
                    <Slider {...settings} className='cat_slider_main'>
                        {allData.length > 0 &&
                            allData.map((item, index) => (
                                <div className='item' key={index}>
                                    <Link to={`/cat/${item.subCategory.toLowerCase()}`}>
                                        <div className='info' style={{ background: '#D9D9D9' /* You can set a dynamic color here if needed */ }}>
                                            <img src={item.mainImage} width="80" alt={item.name} />
                                            <h5 className='text-capitalize mt-3'>{item.name}</h5>
                                            <p>{totalLength[index] || 0} items</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default CatSlider;
