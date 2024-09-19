const mongoose = require('mongoose');
const Brand = require('../models/Brand'); // Ensure the correct path
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const ApiResponse = require('../utils/ApiResponse');

module.exports = {
    createBrand: async (req, res) => {
        try {
            const { brandName, description } = req.body;

            if (!brandName) {
                throw new ApiErrorHandler(400, "Brand name is required");
            }

            const brand = new Brand({
                brandName,
                description
            });

            await brand.save();

            return res.status(201).json(new ApiResponse(201, brand, "Brand created successfully"));

        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error creating brand"));
        }
    },
    getBrands: async (req, res) => {
        try {
            const brands = await Brand.find();
            return res.status(200).json(new ApiResponse(200, brands, "Brands fetched successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error fetching brands"));
        }
    }

};
