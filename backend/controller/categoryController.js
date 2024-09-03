const mongoose = require('mongoose');
const Category = require('../models/Category.js');
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const ApiResponse = require('../utils/ApiResponse');

module.exports = {
    createCategory: async (req, res) => {
        try {
            const { name, description, parentCategoryId } = req.body;

            if (!name) {
                throw new ApiErrorHandler(400, "Category name is required");
            }

            const category = new Category({
                name,
                description,
                parentCategoryId
            });

            // console.log("Category instance:", category);

            await category.save();

            console.log("Category saved successfully");

            return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));

        } catch (error) {
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error creating category"));
        }
    }

}
