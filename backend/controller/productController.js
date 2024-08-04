const { Product, VariationType, VariationValue } = require('../models/product.js');
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const ApiResponse = require('../utils/ApiResponse');

module.exports = {
    createProduct: async (req, res) => {
        try {

            const { categoryId, brandId, name, description, price, mainImage, variations } = req.body;
            if (!Array.isArray(variations)) {
                throw new ApiErrorHandler(400, "Variations must be an array");
            }


            const product = new Product({
                categoryId,
                brandId,
                name,
                description,
                price,
                mainImage,
                variations
            });

            await product.save();
            return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
        } catch (error) {

            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error creating product"));
        }
    },

    getAllProducts: async (req, res, next) => {
        try {
            const products = await Product.find({});
            return res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error retrieving products"));
        }
    }
};
