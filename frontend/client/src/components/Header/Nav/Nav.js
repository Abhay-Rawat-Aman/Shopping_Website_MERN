import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';

const Nav = () => {
  // Static navigation data
  const navData = [
    {
      cat_name: 'Electronics',
      items: [
        { cat_name: 'Headphones' },
        { cat_name: 'Smartphones' },
        { cat_name: 'Laptops' },
      ]
    },
    {
      cat_name: 'Fashion',
      items: [
        { cat_name: 'Men' },
        { cat_name: 'Women' },
        { cat_name: 'Kids' },
      ]
    },
    {
      cat_name: 'Home & Garden',
      items: [
        { cat_name: 'Furniture' },
        { cat_name: 'Decor' },
        { cat_name: 'Garden' },
      ]
    }
  ];

  return (
    <div className='nav d-flex align-items-center'>
      <div className='container-fluid'>
        <div className='row position-relative'>
          <div className='col-sm-2 part1 d-flex align-items-center'>
            <Button className='bg-g text-white catTab'>
              <GridViewOutlinedIcon /> &nbsp; Browse All Categories &nbsp; <KeyboardArrowDownIcon />
            </Button>
          </div>

          <div className='col-sm-7 part2 position-static'>
            <nav>
              <ul className='list list-inline mb-0' style={{ width: 'max-content' }}>
                <li className='list-inline-item'>
                  <Button>
                    <Link to="/">Home</Link>
                  </Button>
                </li>

                {navData.map((item, index) => {
                  const catName = item.cat_name.toLowerCase();
                  return (
                    <li className='list-inline-item' key={index}>
                      <Button>
                        <Link to={`/cat/${catName}`}
                          onClick={() => sessionStorage.setItem('cat', catName)}>
                          {item.cat_name}
                        </Link>
                      </Button>

                      {item.items.length > 0 && (
                        <div className='dropdown_menu'>
                          <ul>
                            {item.items.map((subItem, subIndex) => {
                              const subCatName = subItem.cat_name.replace(/\s/g, '-').toLowerCase();
                              return (
                                <li key={subIndex}>
                                  <Button>
                                    <Link to={`/cat/${catName}/${subCatName}`}
                                      onClick={() => sessionStorage.setItem('cat', catName)}>
                                      {subItem.cat_name}
                                    </Link>
                                  </Button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}

                <li className='list-inline-item'>
                  <Button>
                    <Link to="/about">About</Link>
                  </Button>
                </li>

                <li className='list-inline-item position-static'>
                  <Button>
                    <Link to="#">Mega Menu <KeyboardArrowDownIcon /></Link>
                  </Button>
                  <div className='dropdown_menu mega-menu w-100'>
                    <div className='row'>
                      {navData.map((item, index) => (
                        <div className='col-3' key={index}>
                          <Link to={`/cat/${item.cat_name.toLowerCase()}`}>
                            <h4 className='text-g text-capitalize'>{item.cat_name}</h4>
                          </Link>
                          {item.items.length > 0 && (
                            <ul className='mt-4 mb-0'>
                              {item.items.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link to={`/cat/${item.cat_name.toLowerCase()}/${subItem.cat_name.replace(/\s/g, '-').toLowerCase()}`}>
                                    {subItem.cat_name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                      <div className='col-3 images'>
                        <img
                          src='https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-menu.png'
                          className='w-100'
                          alt='Banner'
                        />
                      </div>
                    </div>
                  </div>
                </li>

                <li className='list-inline-item'>
                  <Button>
                    <Link to="/blog">Blog</Link>
                  </Button>
                </li>

                <li className='list-inline-item'>
                  <Button>
                    <Link to="#">Pages <KeyboardArrowDownIcon /></Link>
                  </Button>
                  <div className='dropdown_menu'>
                    <ul>
                      <li><Button><Link to='/about'>About Us</Link></Button></li>
                      <li><Button><Link to='/contact'>Contact</Link></Button></li>
                      <li><Button><Link to='/account'>My Account</Link></Button></li>
                      <li><Button><Link to='/login'>Login</Link></Button></li>
                      <li><Button><Link to='/register'>Register</Link></Button></li>
                      <li><Button><Link to='/forgot-password'>Forget Password</Link></Button></li>
                      <li><Button><Link to='/reset-password'>Reset Password</Link></Button></li>
                      <li><Button><Link to='/purchase-guide'>Purchase Guide</Link></Button></li>
                      <li><Button><Link to='/privacy-policy'>Privacy Policy</Link></Button></li>
                      <li><Button><Link to='/terms-of-services'>Terms of Services</Link></Button></li>
                      <li><Button><Link to='/404'>404 Pages Not Found</Link></Button></li>
                    </ul>
                  </div>
                </li>

                <li className='list-inline-item'>
                  <Button>
                    <Link to="/contact">Contact</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>

          <div className='col-sm-2 part3 d-flex align-items-center'>
            <div className='phoneNum d-flex align-items-center ml-auto'>
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
