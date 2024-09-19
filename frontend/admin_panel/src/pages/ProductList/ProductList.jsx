import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Button, Pagination, Rating } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllProduct, deleteProduct , } from "../../Api/authApi";
import Model from "../../components/Model/model";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteClick = (id) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };


  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productIdToDelete)
        );
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      } finally {
        setShowModal(false);
        setProductIdToDelete(null);
      }
    }
  };

  return (
    <>
      <div className="card shadow my-4 border-0 flex flex-center p-4">
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
            <Breadcrumbs aria-label="breadcrumb" className="breadcrum">
              <Link to="/">
                <HomeIcon fontSize="inherit" className="mr-2" />
                Home
              </Link>
              <Link to="/products/productList">
                <FaCartShopping fontSize="inherit" className="mr-2" />
                Products
              </Link>
              <Link className="activePage">Product List</Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="card shadow mt-[12px] w-full">
        <div className="flex items-center justify-between mb-4 pt-4 px-4">
          <h4 className="font-bold font-mono text-center mb-0">Products</h4>
          <div className="ml-auto flex items-center justify-center gap-3">
            <SearchBar />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <CircularProgress color="secondary" size={100} />
            </div>
          ) : products.length > 0 ? (
            <table
              className="min-w-full divide-y divide-gray-200 table-auto min-h-[500px]"
              style={{ zoom: "85%" }}
            >
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Order Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-16 bg-gray-200 overflow-hidden rounded">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h6 className="font-semibold text-black">
                            {product.name}
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-950 font-semibold">
                      {product.categoryId ? product.categoryId.name : "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <del className="text-gray-600">
                          Rs.{product.oldPrice}
                        </del>
                        <span className="text-black font-semibold ml-1">
                          Rs.{product.newPrice}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-bold">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Rating
                        name="read-only"
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Link to={`/products/editProduct/${product._id}`}>
                          <Tooltip title="Edit" arrow placement="top">
                            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-200 text-slate-700 hover:text-black">
                              <MdOutlineModeEdit />
                            </button>
                          </Tooltip>
                        </Link>
                        <Tooltip title="View" arrow placement="top">
                          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-200 text-gray-500 hover:text-gray-700">
                            <FaRegEye />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete" arrow placement="top">
                          <button
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                            onClick={() => handleDeleteClick(product._id)}
                          >
                            <MdDeleteOutline />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-4 text-center">No products found.</div>
          )}
        </div>
      </div>
      {showModal && (
        <Model
          handleConfirmDelete={handleConfirmDelete}
          setShowModal={setShowModal}
          errorTitle={"Are you sure you want to delete this product?"}
          Yes={"Yes, I'm sure"}
          No={"No, I'm not sure"}
        />
      )}
      ;
    </>
  );
};

export default ProductList;
