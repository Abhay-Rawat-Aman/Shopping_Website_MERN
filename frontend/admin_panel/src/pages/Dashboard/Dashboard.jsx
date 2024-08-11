import React, { PureComponent, useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Rating from "@mui/material/Rating";
import {
  FiSearch,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import DashboardGraph from "../../components/DashboardCard/DashboardGraph";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchBar from "../../components/SearchBar/SearchBar";

const Dashboard = () => {

  const [page, setPerPage] =useState("");

  const handleChange = (event) => {
    setPerPage(event.target.value);
  };

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className=" min-h-screen pl-[2rem] pr-[0]">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Users"
          count="1,234"
          icon={<FiUsers className="text-white w-6 h-6" />}
          color="bg-blue-500"
          trend={{
            icon: <FiTrendingUp />,
            value: "12%",
            color: "text-green-500",
          }}
        />
        <DashboardCard
          title="Orders"
          count="567"
          icon={<FiShoppingCart className="text-white w-6 h-6" />}
          color="bg-green-500"
          trend={{
            icon: <FiTrendingDown />,
            value: "5%",
            color: "text-red-500",
          }}
        />
        <DashboardCard
          title="Revenue"
          count="$12,345"
          icon={<FiDollarSign className="text-white w-6 h-6" />}
          color="bg-yellow-500"
          trend={{
            icon: <FiTrendingUp />,
            value: "8%",
            color: "text-green-500",
          }}
        />
      </div>

      <div className="chartContainer container md:mx-auto flex gap-5 p-4">
        <DashboardGraph />
      </div>

      <div className="card shadow my-2 ">
        <div className="flex items-center justify-between mb-4 pt-4 px-4 pyy-3">
          <h4 className="font-bold font-mono text-center mb-0">Products</h4>

          <div className="ml-auto flex items-center justify-center gap-3">
            <SearchBar />

            <div className="">
              <div className="flex font-bold text-sm ">Show By</div>
            </div>
          </div>
        </div>

        <div className="table-responsive px-3">
          <table className="w-[100%] table-striped table-auto table table-hover text-center">
            <thead>
              <tr>
                <th>O.Id</th>
                <th>Products</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Order Sales</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="table-group-divider ">
              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-2 w-[300px] justify-center  productWrapper productWrapper">
                    <div className="imageWrapper shadow overflow-hidden w-[20%] h-[20%] lg">
                      <img
                        src="https://react-demo.tailadmin.com/assets/product-01-c483c307.png"
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="info w-[75%]">
                      <h6>Apple Watch Series 7 </h6>
                    </div>
                  </div>
                </td>
                <td>Women</td>
                <td>Richmen</td>
                <td>
                  <div className="w-[70px]">
                    <del className="old">$21.00</del>
                    <span className="new text-danger"> $25.00 </span>
                  </div>
                </td>
                <td>
                  <Rating
                    name="read-only"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </td>
                <td>350</td>
                <td>$35k</td>
                <td>
                  <div className="action flex items-center gap-2">
                    <Tooltip title="Add" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdOutlineModeEdit />
                      </button>
                    </Tooltip>

                    <Tooltip title="View" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <FaRegEye />
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdDeleteOutline />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-2 w-[300px] justify-center  productWrapper">
                    <div className="imageWrapper shadow overflow-hidden w-[20%] h-[20%] rounded-lg">
                      <img
                        src="https://react-demo.tailadmin.com/assets/product-04-89ad00c9.png"
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="info w-[75%]">
                      <h6>Apple Watch Series 7 </h6>
                    </div>
                  </div>
                </td>
                <td>Women</td>
                <td>Richmen</td>
                <td>
                  <div className="w-[70px]">
                    <del className="old">$21.00</del>
                    <span className="new text-danger"> $25.00 </span>
                  </div>
                </td>
                <td>
                  <Rating
                    name="read-only"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </td>
                <td>350</td>
                <td>$35k</td>
                <td>
                  <div className="action flex items-center gap-2">
                    <Tooltip title="Add" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdOutlineModeEdit />
                      </button>
                    </Tooltip>

                    <Tooltip title="View" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <FaRegEye />
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdDeleteOutline />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-2 w-[300px] justify-center  productWrapper">
                    <div className="imageWrapper shadow overflow-hidden w-[20%] h-[20%] rounded-lg">
                      <img
                        src="https://react-demo.tailadmin.com/assets/product-03-16b7c2c9.png"
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="info w-[75%]">
                      <h6>Apple Watch Series 7 </h6>
                    </div>
                  </div>
                </td>
                <td>Women</td>
                <td>Richmen</td>
                <td>
                  <div className="w-[70px]">
                    <del className="old">$21.00</del>
                    <span className="new text-danger"> $25.00 </span>
                  </div>
                </td>
                <td>
                  <Rating
                    name="read-only"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </td>
                <td>350</td>
                <td>$35k</td>
                <td>
                  <div className="action flex items-center gap-2">
                    <Tooltip title="Add" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdOutlineModeEdit />
                      </button>
                    </Tooltip>

                    <Tooltip title="View" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <FaRegEye />
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdDeleteOutline />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-2 w-[300px] justify-center  productWrapper">
                    <div className="imageWrapper shadow overflow-hidden w-[20%] h-[20%] rounded-lg">
                      <img
                        src="https://react-demo.tailadmin.com/assets/product-02-7399ae73.png"
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="info w-[75%]">
                      <h6>Apple Watch Series 7 </h6>
                    </div>
                  </div>
                </td>
                <td>Women</td>
                <td>Richmen</td>
                <td>
                  <div className="w-[70px]">
                    <del className="old">$21.00</del>
                    <span className="new text-danger"> $25.00 </span>
                  </div>
                </td>
                <td>
                  <Rating
                    name="read-only"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </td>
                <td>350</td>
                <td>$35k</td>
                <td>
                  <div className="action flex items-center gap-2">
                    <Tooltip title="Add" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdOutlineModeEdit />
                      </button>
                    </Tooltip>

                    <Tooltip title="View" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <FaRegEye />
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdDeleteOutline />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-2 w-[300px] justify-center  productWrapper">
                    <div className="imageWrapper shadow overflow-hidden w-[20%] h-[20%] rounded-lg">
                      <img
                        src="https://react-demo.tailadmin.com/assets/product-01-c483c307.png"
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="info w-[75%]">
                      <h6>Apple Watch Series 7 </h6>
                    </div>
                  </div>
                </td>
                <td>Women</td>
                <td>Richmen</td>
                <td>
                  <div className="w-[70px]">
                    <del className="old">$21.00</del>
                    <span className="new text-danger"> $25.00 </span>
                  </div>
                </td>
                <td>
                  <Rating
                    name="read-only"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </td>
                <td>350</td>
                <td>$35k</td>
                <td>
                  <div className="action flex items-center gap-2">
                    <Tooltip title="Add" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdOutlineModeEdit />
                      </button>
                    </Tooltip>

                    <Tooltip title="View" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <FaRegEye />
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete" arrow placement="top">
                      <button
                        variant="outlined"
                        className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300"
                      >
                        <MdDeleteOutline />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-footer flex items-center justify-between py-3 px-3">
          <div className="flex items-center justify-center gap-3">
            <h6 className="mb-0 text-sm">Show Row Per Pages</h6>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Page</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={page}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Pagination
            count={10}
            color="primary"
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
            className="ml-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
