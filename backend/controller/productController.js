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
    },

    getProductById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json(new ApiResponse(404, id, "Product Not Found"));
            }

            return res.status(200).json(new ApiResponse(200, product, "Product Found"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error getting Product"));

        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const update = req.body;
            const product = await Product.findByIdAndUpdate(id, update, { new: true, runValidators: true });
            if (!product) {
                return res.status(404).json(new ApiResponse(404, id, "Product with this id not found"));
            }

            return res.status(200).json(new ApiResponse(200, product, "Products retrieved successfully"));

        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error Updating Product"));
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json(new ApiResponse(404, id, "Product with this id not found"));
            }

            return res.status(200).json(new ApiResponse(200, product, "Products retrieved successfully"));

        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error Updating Product"));
        }
    },

    createVariationType: async (req, res, next) => {
        try {
            const { type, variation_id } = req.body;

            const variationType = new VariationType({ type, variation_id });

            await variationType.save();

            res.status(201).json(new ApiResponse(201, variationType, "Variation Type successfully created"));
        } catch (error) {
            res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message));
        }
    },

    createVariationValue: async (req, res, next) => {
        try {

            const { variation_type_id, value } = req.body;

            if (!variation_type_id || !value) {
                throw new ApiErrorHandler(400, "Variation Type ID and Value are required");
            }

            const variationValue = new VariationValue({ variation_type_id, value });

            await variationValue.save();

            return res.status(201).json(new ApiResponse(201, variationValue, "Variation Value created successfully"));
        } catch (error) {
            console.error("Error creating Variation Value:", error);
            return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || "Error creating Variation Value"));
        }
    },

    getProductByCategory: async (req, res, next) => {
        try {
            const categoryId = req.params.id;

            const products = await Product.find({ categoryId });

            if (products.length === 0) {
                return res.status(404).json(new ApiResponse(404, null, "No products found for this category"));
            }

            // Send successful response with retrieved products
            return res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || "Error retrieving products"));
        }
    },

    getProductByBrandId: async (req, res, next) => {
        try {
            const brandId  = req.params.id;
            const products = await Product.find({ brandId });
            if (products.length === 0) {
                return res.status(404).json(new ApiResponse(404, null, "No products found for this category"));
            }

            return res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || "Error retrieving products"));
        }

    },
};
