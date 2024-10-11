import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { getCategories } from '../../../Api/authAPI';

const Nav = () => {
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setNavData(categories.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const catName = sessionStorage.getItem('cat');

  return (
    <div className='nav d-flex align-items-center'>
      <div className='container d-flex align-items-center justify-center'> 
        <div className='row align-items-center'>

          <div className='col-sm-2 part1 d-flex align-items-center' style={{width : "100px"}} ><Button className='bg-g text-white catTab'><GridViewOutlinedIcon />&nbsp;
            Browse All Categories &nbsp;
            <KeyboardArrowDownIcon /></Button>
          </div>

          <div className='col-12 col-md-8'>
            <div className="slider-container">
              <nav>
                <ul className='list list-inline mb-0'>
                  <li className='list-inline-item'>
                    <Button>
                      <Link to="/">Home</Link>
                    </Button>
                  </li>

                  {navData.map((item, index) => {
                    const catName = item.name ? item.name.toLowerCase() : '';

                    return item.name ? (
                      <li className='list-inline-item' key={index}>
                        <Button>
                          <Link to={`/cat/${item._id}`} onClick={() => sessionStorage.setItem('cat', catName)}>
                            {item.name}
                          </Link>
                        </Button>

                        {item.items && item.items.length > 0 && (
                          <div className='dropdown_menu'>
                            <ul>
                              {item.items.map((subItem, subIndex) => {
                                const subCatName = subItem.name ? subItem.name.replace(/\s/g, '-').toLowerCase() : '';
                                return subItem.name ? (
                                  <li key={subIndex}>
                                    <Button>
                                      <Link to={`/cat/${item._id}/${subCatName}`} onClick={() => sessionStorage.setItem('cat', catName)}>
                                        {subItem.name}
                                      </Link>
                                    </Button>
                                  </li>
                                ) : null;
                              })}
                            </ul>
                          </div>
                        )}
                      </li>
                    ) : null;
                  })}

                  <li className='list-inline-item'>
                    <Button>
                      <Link to="/contact">Contact</Link>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className='col-12 col-md-2 d-flex align-items-center justify-content-end' style={{whiteSpace : "nowrap"}}>
            <div className='phoneNum d-flex align-items-center'>
              <span><HeadphonesOutlinedIcon /></span>
              <div className='info ml-3'>
                <h3 className='text-g mb-0'>1900 - 888</h3>
                <p className='mb-0'>24/7 Support Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
