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
import { getPoductById, updateProduct } from "../../Api/authApi";

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
        const productData = await getPoductById(id);

        if (productData) {
          setFormData({
            ...productData,
            // colors: productData.colors.join(" "),
            // sizes: productData.sizes.join(" "),
          });

          const categories = [
            ...new Set(productData.category ? [productData.category] : []),
          ];
          const subCategories = [
            ...new Set(
              productData.subCategory ? [productData.subCategory] : []
            ),
          ];

          setCategoryList(categories);
          setSubCategoryList(subCategories);
        } else {
          throw new Error("Product data not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

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
      await updateProduct(id, finalData);
      alert("Product updated successfully!");
      // Optionally redirect or handle successful update
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Failed to update product.");
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
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <Select
                      id="category"
                      name="category"
                      value={{
                        label: formData.category,
                        value: formData.category,
                      }}
                      onChange={(option) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: option.value,
                        }))
                      }
                      options={categoryList.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      className="w-full"
                      isClearable
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sub-Category
                    </label>
                    <Select
                      id="subCategory"
                      name="subCategory"
                      value={{
                        label: formData.subCategory,
                        value: formData.subCategory,
                      }}
                      onChange={(option) =>
                        setFormData((prev) => ({
                          ...prev,
                          subCategory: option.value,
                        }))
                      }
                      options={subCategoryList.map((subCategory) => ({
                        label: subCategory,
                        value: subCategory,
                      }))}
                      className="w-full"
                      isClearable
                    />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="bg-gray-400 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Pricing & Stock
                </Typography>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="oldPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Old Price
                    </label>
                    <input
                      type="number"
                      id="oldPrice"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Price
                    </label>
                    <input
                      type="number"
                      id="newPrice"
                      name="newPrice"
                      value={formData.newPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

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
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Total Price
                    </label>
                    <input
                      type="text"
                      id="total"
                      name="total"
                      value={formData.total}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    />
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>

          <Box className="bg-gray-200 p-6 rounded-lg shadow-md mt-8">
            <Typography variant="h6" className="mb-4">
              Variants
            </Typography>

            <div className="mb-4">
              <label
                htmlFor="colors"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Colors (comma-separated)
              </label>
              <input
                type="text"
                id="colors"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="sizes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                id="sizes"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Variant</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>{variant.variant}</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            handlePriceChange(variant.id, e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => deleteVariant(variant.id)}
                          color="error"
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

          <Box className="flex justify-end mt-8">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="px-6 py-2"
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
