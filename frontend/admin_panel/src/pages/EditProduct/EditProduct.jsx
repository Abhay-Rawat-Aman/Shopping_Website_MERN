import React, { useEffect, useState } from "react";
import { RiGalleryLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Tooltip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import Select from "react-select";

import InfoIcon from "@mui/icons-material/Info";
const EditProduct = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    discount: "",
    total: "",
    category: "",
    subCategory: "",
    stock: "",
    brand: "",
    weight: "",
    dimensions: "",
    image: null,
    colors: "",
    sizes: "",
  });

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products?id=${id}`);

        const data = await response.json();
        // console.log("Fetched data:", data);

        if (Array.isArray(data) && data.length > 0) {
          const product = data[0];
          // console.log(product.id);

          if (product) {
            setFormData({
              name: product.name || "",
              description: product.description || "",
              oldPrice: product.oldPrice || "",
              newPrice: product.newPrice || "",
              discount: product.discount || "",
              total: product.total || "",
              category: product.category || "",
              subCategory: product.subCategory || "",
              stock: product.stock || "",
              brand: product.brand || "",
              weight: product.weight || "",
              dimensions: product.dimensions || "",
              colors: product.colors || "",
              sizes: product.sizes || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched product data:", data);

        if (Array.isArray(data)) {
          const categories = [
            ...new Set(data.map((product) => product.category)),
          ];
          const subCategories = [
            ...new Set(data.map((product) => product.subCategory)),
          ];

          setCategoryList(categories);
          setSubCategoryList(subCategories);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    generateVariants();
  }, [formData.colors, formData.sizes]);

  const generateVariants = () => {
    const colors = formData.colors
      .split(" ")
      .filter((color) => color.trim() !== "");
    const sizes = formData.sizes
      .split(" ")
      .filter((size) => size.trim() !== "");

    if (colors.length && sizes.length) {
      const newVariants = colors.flatMap((color) =>
        sizes.map((size) => ({
          id: `${color}_${size}`,
          color,
          size,
          variant: `${color}_${size}`,
          price: "",
        }))
      );
      setVariants(newVariants);
    } else {
      setVariants([]);
    }
  };

  const handlePriceChange = (id, price) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, price } : variant
      )
    );
  };

  const deleteVariant = (id) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  const calculatePrices = (oldPrice, newPrice) => {
    const old = parseFloat(oldPrice);
    const new_ = parseFloat(newPrice);
    if (isNaN(old) || isNaN(new_)) return { discount: "", total: "" };

    const discount = old > 0 ? (((old - new_) / old) * 100).toFixed(2) : "0.00";
    const total = new_.toFixed(2);

    return { discount, total };
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => {
      const newState = {
        ...prevState,
        [name]: files ? files[0] : value,
      };

      if (name === "oldPrice" || name === "newPrice") {
        const { discount, total } = calculatePrices(
          name === "oldPrice" ? value : prevState.oldPrice,
          name === "newPrice" ? value : prevState.newPrice
        );
        newState.discount = discount;
        newState.total = total;
      }
      return newState;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      variants,
    };
    console.log(finalData);

    try {
      const response = await fetch(`http://localhost:3000/products?id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      // You can add some user feedback here, like showing a success message
    } catch (error) {
      console.error("Error:", error);
      // You can add some user feedback here, like showing an error message
    }
  };

  return (
    <>
      <div className="card shadow my-4 border-0 flex flex-center p-4 ">
        <div className="flex  justify-between flex-col">
          <div className="flex items-center justify-between">
            <h3>Edit Product</h3>
          </div>

          <div className="flex mt-3">
            <Breadcrumbs aria-label="breadcrumb" className="breadcrum">
              <Link to="/">
                <HomeIcon fontSize="inherit" className="mr-2" />
                Home
              </Link>

              <Link to="/products/productList">
                <FaCartShopping fontSize="inherit" className="mr-2" />
                ProductsList
              </Link>

              <Link className="activePage">Edit Product</Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className="card shadow-2xl my-4 border-0 flex flex-center p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="bg-gray-400 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Basic Information
                </Typography>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="bg-gray-300 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Additional Details
                </Typography>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Weight
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 1.5 kg"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dimensions"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Dimensions
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10 x 20 x 5 cm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="bg-gray-300 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Pricing Information
                </Typography>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="oldPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Old Price
                      <Tooltip
                        title="Enter the original price of the product"
                        arrow
                      >
                        <InfoIcon
                          fontSize="small"
                          className="ml-1 text-gray-500"
                        />
                      </Tooltip>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        id="oldPrice"
                        name="oldPrice"
                        value={formData.oldPrice}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        required
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="newPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Price
                      <Tooltip title="Enter the new discounted price" arrow>
                        <InfoIcon
                          fontSize="small"
                          className="ml-1 text-gray-500"
                        />
                      </Tooltip>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        id="newPrice"
                        name="newPrice"
                        value={formData.newPrice}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        required
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="discount"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Discount (%)
                      </label>
                      <input
                        type="text"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="total"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Final Price
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          id="total"
                          name="total"
                          value={formData.total}
                          readOnly
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="bg-gray-400 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Category Information
                </Typography>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>

                    <Select
                      options={categoryList.map((category) => ({
                        value: category,
                        label: category,
                      }))}
                      value={{
                        value: formData.category,
                        label: formData.category,
                      }}
                      onChange={(selectedOption) =>
                        handleChange({
                          target: {
                            name: "category",
                            value: selectedOption.value,
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sub Category
                    </label>
                    <Select
                      options={subCategoryList.map((subCategory) => ({
                        value: subCategory,
                        label: subCategory,
                      }))}
                      value={{
                        value: formData.subCategory,
                        label: formData.subCategory,
                      }}
                      onChange={(selectedOption) =>
                        handleChange({
                          target: {
                            name: "subCategory",
                            value: selectedOption.value,
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className="bg-slate-200 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Product Variants
                </Typography>

                <div className="space-y-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="colors"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Colors (space-separated)
                      </label>
                      <input
                        type="text"
                        id="colors"
                        name="colors"
                        value={formData.colors}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g. red blue yellow"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sizes"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Sizes (space-separated)
                      </label>
                      <input
                        type="text"
                        id="sizes"
                        name="sizes"
                        value={formData.sizes}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g. S M L XL"
                      />
                    </div>
                  </div>
                </div>

                <TableContainer
                  component={Paper}
                  className="shadow"
                  sx={{ maxHeight: "600px" }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ backgroundColor: "bisque" }}>
                          Color
                        </TableCell>
                        <TableCell style={{ backgroundColor: "bisque" }}>
                          Size
                        </TableCell>
                        <TableCell style={{ backgroundColor: "bisque" }}>
                          Variant
                        </TableCell>
                        <TableCell style={{ backgroundColor: "bisque" }}>
                          Price
                        </TableCell>
                        <TableCell style={{ backgroundColor: "bisque" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="p-2">
                      {variants.map((variant) => (
                        <TableRow key={variant.id}>
                          <TableCell>{variant.color}</TableCell>
                          <TableCell>{variant.size}</TableCell>
                          <TableCell>{variant.variant}</TableCell>
                          <TableCell>
                            <input
                              type="number"
                              value={variant.price}
                              onChange={(e) =>
                                handlePriceChange(variant.id, e.target.value)
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter price"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => deleteVariant(variant.id)}
                              size="small"
                            >
                              <RiDeleteBinLine />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <button
                type="submit"
                className="w-full py-3 px-4 btn-color hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Product
              </button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
