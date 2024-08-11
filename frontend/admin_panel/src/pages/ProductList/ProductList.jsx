import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import {
  Button,
  Pagination,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

const ProductList = () => {
  const [page, setPage] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  return (
    <>
      <div className="card shadow my-4 border-0 flex flex-center p-4 ">
        <div className="flex justify-between flex-col">
          <div className="flex items-center justify-between">
            <h3>Products Lists</h3>
            <div className="flex ml-auto items-center gap-4">
              <Button
                variant="outlined"
                className="py-2 px-3 text-black border-black"
              >
                <PiExport className="mr-2" />
                Export
              </Button>
              <Link to="/products/createProduct">
                <Button variant="contained" className="py-2 px-3 btn-color">
                  <IoMdAdd className="mr-2" />
                  Add Products
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex mt-3">
            <Breadcrumbs aria-label="breadcrumb" className="breadcrum ">
              <Link to="/">
                <HomeIcon fontSize="inherit" className="mr-2" />
                Home
              </Link>
              <Link to="/products">
                <FaCartShopping fontSize="inherit" className="mr-2" />
                Products
              </Link>
              <Link className="activePage">Product List</Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className="card shadow mt-[12px] w-full">
        <div className="flex items-center justify-between mb-4 pt-4 px-4 pyy-3">
          <h4 className="font-bold font-mono text-center mb-0">Products</h4>
          <div className="ml-auto flex items-center justify-center gap-3">
            <SearchBar />
          </div>
        </div>

        <div className="table-responsive roboto-regular">
          <TableContainer
            component={Paper}
            className="shadow"
            sx={{ maxHeight: "600px" }}
          >
            <Table stickyHeader className="roboto-regular">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Order Sales</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  <TableBody>
                    <TableCell colSpan="9" className="text-center">
                      <div className="flex items-center justify-center">
                        <CircularProgress color="secondary" size={100} />
                      </div>
                    </TableCell>
                  </TableBody>
                </TableBody>
              ) : products.length > 0 ? (
                <TableBody className="table-group-divider">
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 w-[300px] justify-center">
                          <div className="imageWrapper shadow overflow-hidden w-[20%] h-[20%] lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full"
                            />
                          </div>
                          <div className="info w-[75%]">
                            <h6>{product.name}</h6>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>
                        <div className="w-[78px]">
                          <del className="old">Rs.{product.oldPrice}</del>
                          <span className="new text-danger">
                            Rs.{product.newPrice}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Rating
                          name="read-only"
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>
                        <div className="action flex items-center gap-2">
                          <Link to={`/products/editProduct/${product.id}`}>
                            <Tooltip title="Edit" arrow placement="top">
                              <button className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300 text-black  hover:text-gray-700 hover:bg-slate-200">
                                <MdOutlineModeEdit />
                              </button>
                            </Tooltip>
                          </Link>
                          <Tooltip title="View" arrow placement="top">
                            <button className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300 hover:text-gray-700 hover:bg-slate-200">
                              <FaRegEye />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete" arrow placement="top">
                            <button className="flex items-center justify-center w-[30px] h-[30px] rounded-full duration-300 text-black hover:text-gray-700 hover:bg-slate-200">
                              <MdDeleteOutline />
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <tr>
                    <TableCell colSpan="9" className="text-center">
                      No products found.
                    </TableCell>
                  </tr>
                </TableBody>
              )}
            </Table>
          </TableContainer>
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
    </>
  );
};

export default ProductList;
