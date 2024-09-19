import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/SideBar/SideBar';
import Product from '../../components/Product/Product';
import { Button } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { getProductByCategoryId } from '../../Api/authAPI';
import { MyContext } from '../../App';

const Listing = (props) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenDropDown2, setIsOpenDropDown2] = useState(false);
  const [showPerPage, setShowPerPage] = useState(3);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const context = useContext(MyContext);
  const { id, subId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(data);

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        try {
          const response = await getProductByCategoryId(id);
          console.log('Fetched response:', response); 
          if (response && Array.isArray(response.data)) {
            setData(response.data);
          } else {
            console.error('Expected an array in the data key but got:', response);
            setData([]);
          }
        } catch (error) {
          console.error('Error fetching products by category ID:', error);
          setData([]);
        }
      }
    };

    fetchProducts();
  }, [id]);

  const handleBrandFilter = (brand) => {
    // logic to filter by brand
  };

  const handleRatingFilter = (rating) => {
    // logic to filter by rating
  };

  const handlePriceFilter = (minValue, maxValue) => {
    const filtered = data.filter(product => {
      if (product.price) {
        const price = parseInt(product.price.toString().replace(/,/g, ""), 10);
        return !isNaN(price) && price >= minValue && price <= maxValue;
      }
      return false;
    });
    setFilteredProducts(filtered);
  };

  const catName = sessionStorage.getItem('cat');


  return (
    <>
      {context.windowWidth < 992 && (
        <>
          {context.isopenNavigation === false && (
            <Button className='btn-g btn-lg w-100 filterBtn' onClick={() => context.openFilters()}>
              Filters
            </Button>
          )}
        </>
      )}

      <section className='listingPage'>
        <div className='container-fluid'>
          <div className='breadcrumb flex-column'>
            <h1 className="text-capitalize">{catName}</h1>
            <ul className='list list-inline mb-0'>
              <li className='list-inline-item'>
                <Link to={'/'}>Home </Link>
              </li>
              <li className='list-inline-item'>
                <Link to={`/cat/${id}`}  className='text-capitalize'>{catName} </Link>
              </li>
              {subId && (
                <li className='list-inline-item'>
                  <Link to={''} className="text-capitalize">{subId.split('-').join(' ')}</Link>
                </li>
              )}
            </ul>
          </div>

          <div className='listingData'>
            <div className='row'>
              <div className={`col-md-3 sidebarWrapper ${context.isOpenFilters === true && 'click'}`}>
                <Sidebar
                  data={categories}
                  // currentCatData={products}
                  filterByBrand={handleBrandFilter}
                  filterByRating={handleRatingFilter}
                  filterByPrice={handlePriceFilter}
                />

              </div>

              <div className='col-md-9 rightContent homeProducts pt-0'>
                <div className='topStrip d-flex align-items-center'>
                  <p className='mb-0'>We found <span className='text-success'>{data.length}</span> items for you!</p>
                  <div className='ms-auto d-flex align-items-center'>
                    <div className='tab_ position-relative'>
                      <Button className='btn_' onClick={() => setIsOpenDropDown(!isOpenDropDown)}>
                        <GridViewOutlinedIcon /> Show: {showPerPage * 5}
                      </Button>
                      {isOpenDropDown && (
                        <ul className='dropdownMenu'>
                          {[5, 10, 15, 20].map(num => (
                            <li key={num}>
                              <Button className='align-items-center' onClick={() => {
                                setIsOpenDropDown(false);
                                setShowPerPage(num);
                              }}>
                                {num}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className='tab_ ms-3 position-relative'>
                      <Button className='btn_' onClick={() => setIsOpenDropDown2(!isOpenDropDown2)}>
                        <FilterListOutlinedIcon /> Sort by: Featured
                      </Button>
                      {isOpenDropDown2 && (
                        <ul className='dropdownMenu'>
                          {['Featured', 'Price: Low to High', 'Price: High to Low', 'Release Date', 'Avg. Rating'].map(option => (
                            <li key={option}>
                              <Button className='align-items-center' onClick={() => setIsOpenDropDown2(false)}>
                                {option}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className='productRow pl-4 pr-3'>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => (
                      <div className='item' key={index}>
                        <Product tag={item.type} item={item} />
                      </div>
                    ))
                  ) : (
                    <p>No products found</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
