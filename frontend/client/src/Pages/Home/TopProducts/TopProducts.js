import React from 'react';
import '../TopProducts/TopProducts.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const TopProducts = ({ title, products }) => {
  return (
    <div className='topSelling_box'>
      <h3>{title}</h3>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div className='items d-flex align-items-center' key={index}>
            <div className='img'>
              <Link to={`/Product/${product.id}`}>
                <img src={product.catImg} className='w-100' alt={product.productName} />
              </Link>
            </div>
            <div className='info px-3'>
              <Link to={`/Product/${product.id}`}>
                <span className='prodName'>{product.productName}</span>
              </Link>
              <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
              <div className='d-flex align-items-center mt-3'>
                <span className='price font-weight-bold'>Rs{product.price} </span>
                {product.oldPrice && <span className='oldPrice'>Rs{product.oldPrice}</span>}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default TopProducts;
