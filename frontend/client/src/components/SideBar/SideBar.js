import React, { useEffect, useState, useContext, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { MyContext } from '../../App';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Link, useParams } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const Sidebar = (props) => {
    const [value, setValue] = useState([100, 60000]);
    const [value2, setValue2] = useState(0);
    const [brandFilters, setBrandFilters] = useState([]);
    const [ratingsArr, setRatings] = useState([]);
    const [totalLength, setTotalLength] = useState([]);

    const context = useContext(MyContext);
    const { id } = useParams();


    // Filter by price
    const handlePriceFilter = useCallback(() => {
        if (props.filterByPrice) {
            props.filterByPrice(value[0], value[1]);
        }
    }, [value, props.filterByPrice]);


    // Filter by brand
    const filterByBrand = useCallback((keyword) => {
        if (props.filterByBrand) {
            props.filterByBrand(keyword);
        }
    }, [props.filterByBrand]);

    // Filter by rating
    const filterByRating = useCallback((keyword) => {
        if (props.filterByRating) {
            props.filterByRating(parseFloat(keyword));
        }
    }, [props.filterByRating]);

    return (
        <div className={`sidebar ${context.isOpenFilters ? 'open' : ''}`}>
            <div className='card border-0 shadow res-hide'>
                <h3>Category</h3>
                <div className='catList'>
                    {props.data.length > 0 ? (
                        props.data.map((item, index) => (
                            <Link to={`/cat/${item.cat_name.toLowerCase()}`} key={index}>
                                <div className='catItem d-flex align-items-center'>
                                    <span className='img'>
                                        <img src='https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg' width={30} alt='Category Icon' />
                                    </span>
                                    <h4 className='mb-0 ms-3 mr-3 text-capitalize'>{item.cat_name}</h4>
                                    <span className='d-flex align-items-center justify-content-center rounded-circle ms-auto'>
                                        {totalLength[index]}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
            </div>

            <div className='card border-0 shadow'>
                <h3>Filter by Price</h3>
                <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5} />
                <div className='d-flex pt-2 pb-2 priceRange'>
                    <span>From: <strong className='text-success'>Rs: {value[0]}</strong></span>
                    <span className='ms-auto'>To: <strong className='text-success'>Rs: {value[1]}</strong></span>
                </div>

                <div className='filters pt-5'>
                    <h5>Filter by Brand</h5>
                    <ul className='mb-0'>
                        <RadioGroup aria-labelledby="brand-radio-group" name="radio-buttons-group">
                            {brandFilters.length > 0 ? (
                                brandFilters.map((item, index) => (
                                    <li key={index}>
                                        <FormControlLabel
                                            value={item}
                                            control={<Radio onChange={() => filterByBrand(item)} />}
                                            label={item}
                                        />
                                    </li>
                                ))
                            ) : (
                                <p>No brands available</p>
                            )}
                        </RadioGroup>
                    </ul>
                </div>

                <div className='filters pt-0'>
                    <h5>Filter by Ratings</h5>
                    <ul>
                        <RadioGroup aria-labelledby="rating-radio-group" name="radio-buttons-group">
                            {ratingsArr.length > 0 ? (
                                ratingsArr.map((item, index) => (
                                    <li key={index}>
                                        <FormControlLabel
                                            value={item}
                                            control={<Radio onChange={() => filterByRating(item)} />}
                                            label={item}
                                        />
                                    </li>
                                ))
                            ) : (
                                <p>No ratings available</p>
                            )}
                        </RadioGroup>
                    </ul>
                </div>

                <div className='d-flex filterWrapper'>
                    <Button className='btn btn-g w-100' onClick={() => context.openFilters()}>
                        <FilterAltOutlinedIcon /> Filter
                    </Button>
                </div>
            </div>

            {/* <img src={bannerImg} className='w-100' alt='Banner' /> */}
        </div>
    );
};

export default Sidebar;
