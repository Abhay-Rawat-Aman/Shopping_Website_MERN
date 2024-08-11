import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Rating, SliderValueLabel } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Slider from "react-slick";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";


const ViewProduct = () => {


    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      fade: false,
      arrow: true,
    };

    var settings2 = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false,
      arrow: false,
    };

    var relatedProductsSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      fade: false,
      arrow: true,
      autoplay: 2000,
      centerMode: true,
    };

  return (
    <div className="detailsPage">
      <div className="container-fluid mb-5 detailsContainer pt-3 pb-3">
        <div className="row">
          <div className="col-md-5 ">
            <div className="ProductZoom">
              <Slider
                {...settings2}
                className="zoomSliderBig"
                
              >
                <div className="item" >
                  <InnerImageZoom
                    src={`https://www.jiomart.com/images/product/original/491432711/moong-dal-2-kg-product-images-o491432711-p491432711-0-202205191636.jpg?im=Resize=(1500,1500)`}
                    zoomType="hover"
                    zoomScale={1}
                    className="w-100"
                  />
                </div>
              </Slider>
            </div>

            <Slider {...settings} className="zoomSlider" >
              <div className="item">
                <img
                  className="w-100"
                  src={`https://www.jiomart.com/images/product/original/491432711/moong-dal-2-kg-product-images-o491432711-p491432711-0-202205191636.jpg?im=Resize=(1500,1500)`}
                  
                />
              </div>
            </Slider>
          </div>

          <div className="col-md-7 ProductInfo">
            <h1>heading</h1>

            <div className="d-flex align-items-center mb-4">
              <Rating
                name="half-rating-read"
                value={parseFloat(2)}
                precision={0.5}
                readOnly
              />
              {/* <span className='text-light'>(32 Ratings)</span> */}
            </div>

            <div className="priceSec d-flex align-items-center mb-3">
              <span className="text-g priceLarge">
                Rs.205
              </span>
              <div className="ms-2 d-flex flex-column">
                <span className="text-org">1.65% Off</span>
                <span className="text-light oldPrice">
                  Rs. 220
                </span>
              </div>
            </div>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatem nobis vel asperiores! </p>

            <div className="productSize d-flex align-items-center">
              <span>Size / Weight:</span>
              <ul className="list list-inline  pl-4">
                <li className="list-inline-item">
                  <Link to="">g</Link>
                </li>
              </ul>
            </div>

            <div className="productSize d-flex align-items-center">
              <span>RAM</span>
              <ul className="list list-inline  pl-4">
                <li className="list-inline-item">
                  <Link
                    to=""
                    
                    
                  >
                    Ram GB
                  </Link>
                </li>
              </ul>
            </div>

            <div className="productSize d-flex align-items-center">
              <span>SIZE</span>
              <ul className="list list-inline  pl-4">
                <li className="list-inline-item">
                  <Link
                    to=""
                    
                  >
                    10cm
                  </Link>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center">
              <div></div>

              <div className="d-flex align-items-center">
                <Button className="btn-g btn-lg addToCartBtn mr-3">
                  <ShoppingCartOutlinedIcon />
                  Add To Cart
                </Button>
                <Button className="move btn-lg likeBtn mr-3 btn-border">
                  <FavoriteOutlinedIcon />
                </Button>
                <Button className="move btn-lg compareBtn mr-3 btn-border">
                  <CompareArrowsOutlinedIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-3 p-5 detailsPageTab">
          <div className="customTabs">
            <ul className="list list-inline">
              <li className="list-inline-item">
                <Button>Description</Button>
              </li>
              <li className="list-inline-item">
                <Button>Additional Information</Button>
              </li>
              <li className="list-inline-item">
                <Button>Reviews (3)</Button>
              </li>
            </ul>

            <div className="tabContent">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quos nemo aliquam.</p>
            </div>

            <div className="tabContent">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr className="stand-up">
                      <th>Stand Up</th>
                      <td>
                        <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                      </td>
                    </tr>
                    <tr className="folded-wo-wheels">
                      <th>Folded (w/o wheels)</th>
                      <td>
                        <p>32.5″L x 18.5″W x 16.5″H</p>
                      </td>
                    </tr>
                    <tr className="folded-w-wheels">
                      <th>Folded (w/ wheels)</th>
                      <td>
                        <p>32.5″L x 24″W x 18.5″H</p>
                      </td>
                    </tr>
                    <tr className="door-pass-through">
                      <th>Door Pass Through</th>
                      <td>
                        <p>24</p>
                      </td>
                    </tr>
                    <tr className="frame">
                      <th>Frame</th>
                      <td>
                        <p>Aluminum</p>
                      </td>
                    </tr>
                    <tr className="weight-wo-wheels">
                      <th>Weight (w/o wheels)</th>
                      <td>
                        <p>20 LBS</p>
                      </td>
                    </tr>
                    <tr className="weight-capacity">
                      <th>Weight Capacity</th>
                      <td>
                        <p>60 LBS</p>
                      </td>
                    </tr>
                    <tr className="width">
                      <th>Width</th>
                      <td>
                        <p>24″</p>
                      </td>
                    </tr>
                    <tr className="handle-height-ground-to-handle">
                      <th>Handle height (ground to handle)</th>
                      <td>
                        <p>37-45″</p>
                      </td>
                    </tr>
                    <tr className="wheels">
                      <th>Wheels</th>
                      <td>
                        <p>12″ air / wide track slick tread</p>
                      </td>
                    </tr>
                    <tr className="seat-back-height">
                      <th>Seat back height</th>
                      <td>
                        <p>21.5″</p>
                      </td>
                    </tr>
                    <tr className="head-room-inside-canopy">
                      <th>Head room (inside canopy)</th>
                      <td>
                        <p>25″</p>
                      </td>
                    </tr>
                    <tr className="pa_color">
                      <th>Color</th>
                      <td>
                        <p>Black, Blue, Red, White</p>
                      </td>
                    </tr>
                    <tr className="pa_size">
                      <th>Size</th>
                      <td>
                        <p>M, S</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="tabContent">
              <div className="row">
                <div className="col-md-8">
                  <h3>Customer Questions And answers</h3>

                  <div className="card p-3 reviewCard flex-row">
                    <div className="image">
                      <div className="rounded-circle">
                        <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png" />
                      </div>

                      <span className="text-g d-block text-center font-weight-bold">
                        Sienna
                      </span>
                    </div>

                    <div className="info px-5">
                      <div className="d-flex align-items-center">
                        <h5 className="text-secondary">
                          December 4, 2022 at 3:12 pm
                        </h5>

                        <div className="mx-auto">
                          <Rating
                            name="half-rating"
                            value={2.5}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Delectus, suscipit exercitationem accusantium
                        obcaecati quos voluptate nesciunt facilis itaque modi
                        commodi dignissimos sequi repudiandae minus ab deleniti
                        totam officia id incidunt? Reply
                      </p>
                    </div>
                  </div>

                  <div className="card p-3 reviewCard flex-row">
                    <div className="image">
                      <div className="rounded-circle">
                        <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png" />
                      </div>

                      <span className="text-g d-block text-center font-weight-bold">
                        Sienna
                      </span>
                    </div>

                    <div className="info px-5">
                      <div className="d-flex align-items-center">
                        <h5 className="text-secondary">
                          December 4, 2022 at 3:12 pm
                        </h5>

                        <div className="mx-auto">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                          />
                        </div>
                      </div>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Delectus, suscipit exercitationem accusantium
                        obcaecati quos voluptate nesciunt facilis itaque modi
                        commodi dignissimos sequi repudiandae minus ab deleniti
                        totam officia id incidunt? Reply
                      </p>
                    </div>
                  </div>

                  <div className="card p-3 reviewCard flex-row">
                    <div className="image">
                      <div className="rounded-circle">
                        <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png" />
                      </div>

                      <span className="text-g d-block text-center font-weight-bold">
                        Sienna
                      </span>
                    </div>

                    <div className="info px-5">
                      <div className="d-flex align-items-center">
                        <h5 className="text-secondary">
                          December 4, 2022 at 3:12 pm
                        </h5>

                        <div className="mx-auto">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                          />
                        </div>
                      </div>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Delectus, suscipit exercitationem accusantium
                        obcaecati quos voluptate nesciunt facilis itaque modi
                        commodi dignissimos sequi repudiandae minus ab deleniti
                        totam officia id incidunt? Reply
                      </p>
                    </div>
                  </div>

                  <div className="card p-3 reviewCard flex-row">
                    <div className="image">
                      <div className="rounded-circle">
                        <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png" />
                      </div>

                      <span className="text-g d-block text-center font-weight-bold">
                        Sienna
                      </span>
                    </div>

                    <div className="info px-5">
                      <div className="d-flex align-items-center">
                        <h5 className="text-secondary">
                          December 4, 2022 at 3:12 pm
                        </h5>

                        <div className="mx-auto">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                          />
                        </div>
                      </div>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Delectus, suscipit exercitationem accusantium
                        obcaecati quos voluptate nesciunt facilis itaque modi
                        commodi dignissimos sequi repudiandae minus ab deleniti
                        totam officia id incidunt? Reply
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 px-5">
                  <h5>Customer Reviews</h5>
                  <br />
                  <div className="d-flex align-items-center ">
                    <Rating
                      name="half-rating-read"
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                    />
                    <strong className="mx-3">4.5 out of 5</strong>
                  </div>

                  <br />

                  <div className="progressBarBox d-flex align-items-center w-100">
                    <span className="mx-2">5 star</span>
                    <div
                      className="progress"
                      style={{ width: "80%", height: "20px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "85%" }}
                        aria-valuenow={"25"}
                        aria-valuemin={"0"}
                        aria-valuemax={"100"}
                      >
                        85%
                      </div>
                    </div>
                  </div>

                  <div className="progressBarBox d-flex align-items-center w-100">
                    <span className="mx-2">4 star</span>
                    <div
                      className="progress"
                      style={{ width: "80%", height: "20px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={"25"}
                        aria-valuemin={"0"}
                        aria-valuemax={"100"}
                      >
                        80%
                      </div>
                    </div>
                  </div>

                  <div className="progressBarBox d-flex align-items-center w-100">
                    <span className="mx-2">3 star</span>
                    <div
                      className="progress"
                      style={{ width: "80%", height: "20px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow={"25"}
                        aria-valuemin={"0"}
                        aria-valuemax={"100"}
                      >
                        60%
                      </div>
                    </div>
                  </div>

                  <div className="progressBarBox d-flex align-items-center w-100">
                    <span className="mx-2">2 star</span>
                    <div
                      className="progress"
                      style={{ width: "80%", height: "20px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "30%" }}
                        aria-valuenow={"25"}
                        aria-valuemin={"0"}
                        aria-valuemax={"100"}
                      >
                        30%
                      </div>
                    </div>
                  </div>

                  <div className="progressBarBox d-flex align-items-center w-100">
                    <span className="mx-2">1 star</span>
                    <div
                      className="progress"
                      style={{ width: "80%", height: "20px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow={"25"}
                        aria-valuemin={"0"}
                        aria-valuemax={"100"}
                      >
                        50%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="relatedProducts pt-3 pb-4">
          <h4 className="hd mb-0 mt-0">Related Products</h4>

          <Slider {...relatedProductsSettings} className="productSlider">
            
             <div className="item wide"></div>;
          </Slider>
        </div> */}
      </div>
    </div>
  );
};

export default ViewProduct;
