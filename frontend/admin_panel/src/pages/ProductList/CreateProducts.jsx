import React, { useEffect, useState } from "react";
import { RiGalleryLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
import InfoIcon from "@mui/icons-material/Info";
import { createProduct } from "../../Api/authApi";

const CreateProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    discount: "",
    total: "",
    sales: "0",
    categoryId: "60d5f485f5f6b3e7b4a4e7c3",
    subCategory: "",
    stock: "",
    brandId: "60d5f4a3f5f6b3e7b4a4e7c4",
    weight: "",
    dimensions: "",
    image: null,
    mainImage: null,
    colors: "",
    rating: "",
    sizes: "",
  });

  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateProduct = async () => {
    setIsLoading(true);
    setError(null);

     const formattedVariations = variations.map((variant, index) => ({
       _id: index + 1,
       additional_price: parseFloat(variant.additional_price) || 0,
       stock: parseInt(variant.stock, 10) || 0,
       details: [
         {
           variation_value_id:
             variant.details?.[0]?.variation_value_id || index + 1,
         },
       ],
     }));


    const productData = {
      ...formData,
      oldPrice: parseFloat(formData.oldPrice),
      newPrice: parseFloat(formData.newPrice),
      discount: formData.discount,
      stock: parseInt(formData.stock, 10),
      rating: parseFloat(formData.rating),
      image: formData.image ? URL.createObjectURL(formData.image) : null,
      mainImage: formData.mainImage
        ? URL.createObjectURL(formData.mainImage)
        : null,
      variations : formattedVariations,
    };

    console.log(productData);

    try {
      const result = await createProduct(productData);
      console.log("Product created successfully:", result);
    } catch (err) {
      console.error("Error creating product:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    generateVariants();
  }, [formData.colors, formData.sizes]);

  const generateVariants = () => {
    const colors = formData.colors.split(",").map((color) => color.trim());
    const sizes = formData.sizes.split(",").map((size) => size.trim());

    if (colors.length && sizes.length) {
      const newVariants = colors.flatMap((color, colorIndex) =>
        sizes.map((size, sizeIndex) => ({
          id: `${color}_${size}`, 
          color,
          size,
          additional_price: "", 
          stock: "", 
          details: [
            {
              variation_value_id: colorIndex * sizes.length + sizeIndex + 1,
            },
          ],
        }))
      );
      setVariations(newVariants);
    } else {
      setVariations([]);
    }
  };


  const handlePriceChange = (id, price) => {
    setVariations((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, additional_price: price } : variant
      )
    );
  };

  const handleStockChange = (id, stock) => {
    setVariations((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, stock } : variant
      )
    );
  };



  const deleteVariant = (id) => {
    setVariations((prev) => prev.filter((variant) => variant.id !== id));
  };

  const calculatePrices = (oldPrice, newPrice) => {
    const old = parseFloat(oldPrice);
    const new_ = parseFloat(newPrice);
    if (isNaN(old) || isNaN(new_)) return { discount: "0.00", total: "0.00" };

    const discount = old > 0 ? (((old - new_) / old) * 100).toFixed(2) : "0.00";
    const total = new_.toFixed(2);

    return { discount, total };
  };

  const [subCategories, setSubCategories] = useState([]);

  const categoryMap = {
    electronics: ["Smartphones", "Laptops", "Accessories"],
    clothing: ["Men's Wear", "Women's Wear", "Children's Wear"],
    books: ["Fiction", "Non-fiction", "Educational"],
    home: ["Furniture", "Decor", "Kitchen"],
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => {
      let newValue = files ? files[0] : value;

      if (name === "oldPrice" || name === "newPrice") {
        const oldPrice = name === "oldPrice" ? value : prevState.oldPrice;
        const newPrice = name === "newPrice" ? value : prevState.newPrice;

        const { discount, total } = calculatePrices(
          parseFloat(oldPrice) || 0,
          parseFloat(newPrice) || 0
        );
        newValue = value;
        return {
          ...prevState,
          [name]: newValue,
          discount,
          total,
        };
      }

      if (name === "categoryId") {
        newValue = value;
        setSubCategories(categoryMap[newValue] || []);
      }

      return {
        ...prevState,
        [name]: newValue,
      };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateProduct();
  };

  return (
    <>
      <div className="card shadow my-4 border-0 flex flex-center p-4">
        <div className="flex justify-between flex-col">
          <div className="flex items-center justify-between">
            <h3>Add New Product</h3>
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

              <Typography color="textPrimary">Add Product List</Typography>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className="card shadow-2xl my-4 border-0 flex flex-center p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="w-full" method="post">
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
                      htmlFor="brandId"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Brand ID
                    </label>
                    <input
                      type="text"
                      id="brandId"
                      disabled
                      name="brandId"
                      value={formData.brandId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
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
                      Weight (kg)
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 1.2 kg"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dimensions"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Dimensions (LxWxH cm)
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 20x10x5 cm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mainImage"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Main Image
                    </label>
                    <input
                      type="file"
                      id="mainImage"
                      name="mainImage"
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="bg-gray-100 p-6 rounded-lg shadow-md">
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
                    </label>
                    <input
                      type="number"
                      id="oldPrice"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
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
                      required
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
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
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
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="bg-gray-50 p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="mb-4">
                  Categories & Variants
                </Typography>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="categoryId"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="categoryId"
                      name="category"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {Object.keys(categoryMap).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="subCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sub Category
                    </label>
                    <select
                      id="subCategory"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>
                        Select a sub-category
                      </option>
                      {subCategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="colors"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Colors
                    </label>
                    <input
                      type="text"
                      id="colors"
                      name="colors"
                      value={formData.colors}
                      onChange={handleVariantChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Black, White"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sizes"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sizes
                    </label>
                    <input
                      type="text"
                      id="sizes"
                      name="sizes"
                      value={formData.sizes}
                      onChange={handleVariantChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., S, M, L, XL"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sales"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sales
                    </label>
                    <input
                      type="number"
                      id="sales"
                      name="sales"
                      value={formData.sales}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Rating
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>

          <Box className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-md mt-8">
            <Typography variant="h6" className="mb-4 text-gray-700 font-bold">
              Variants
            </Typography>
            <TableContainer
              component={Paper}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <Table>
                <TableHead>
                  <TableRow className="bg-gradient-to-r from-gray-500 to-gray-600">
                    <TableCell className="font-bold text-white">
                      Variant
                    </TableCell>
                    <TableCell align="center" className="font-bold text-white">
                      Additional Price
                    </TableCell>
                    <TableCell align="center" className="font-bold text-white">
                      stock
                    </TableCell>
                    <TableCell align="center" className="font-bold text-white">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variations.map((variant, index) => (
                    <TableRow
                      key={variant.id}
                      className={
                        index % 2 === 0
                          ? "bg-gray-50"
                          : "bg-white hover:bg-gray-100 transition-colors duration-200"
                      }
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="font-medium text-gray-700"
                      >
                        {variant.color} / {variant.size}
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="number"
                          value={variant.additional_price}
                          onChange={(e) =>
                            handlePriceChange(variant.id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-center"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="number"
                          value={variant.stock}
                          onChange={(e) =>
                            handleStockChange(variant.id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-center"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => deleteVariant(variant.id)}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <RiDeleteBinLine />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <div className="mt-6 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProduct}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Product"}
            </Button>

            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProducts;
