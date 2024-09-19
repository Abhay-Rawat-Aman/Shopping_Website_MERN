const mongoose = require('mongoose');
const Category = require('../models/Category.js');
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const ApiResponse = require('../utils/ApiResponse');

module.exports = {
    // Create a new category
    createCategory: async (req, res) => {
        try {
            const { name, description, parentCategoryId } = req.body;

            if (!name) {
                throw new ApiErrorHandler(400, "Category name is required");
            }

            // Check if the category with the same name already exists
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                throw new ApiErrorHandler(400, "Category with this name already exists");
            }

            // Validate parentCategoryId if provided
            if (parentCategoryId) {
                if (!mongoose.Types.ObjectId.isValid(parentCategoryId)) {
                    throw new ApiErrorHandler(400, "Invalid parent category ID");
                }

                const parentCategoryExists = await Category.findById(parentCategoryId);
                if (!parentCategoryExists) {
                    throw new ApiErrorHandler(404, "Parent category not found");
                }
            }

            const category = new Category({
                name,
                description,
                parentCategoryId
            });

            await category.save();

            console.log("Category saved successfully");

            return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));

        } catch (error) {
            console.error("Error creating category:", error);  // Log the actual error
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error creating category"));
        }
    },

    // Fetch all categories
    getCategories: async (req, res , next) => {
        try {
            const categories = await Category.find({});

            return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));

        } catch (error) {
            console.error("Error fetching categories:", error); 
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error fetching categories"));
        }
    },

    // Fetch a single category by ID
    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ApiErrorHandler(400, "Invalid category ID");
            }

            const category = await Category.findById(id);
            if (!category) {
                throw new ApiErrorHandler(404, "Category not found");
            }

            return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));

        } catch (error) {
            console.error("Error fetching category:", error);  // Log the actual error
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error fetching category"));
        }
    },
    getCategoryByName: async (req, res) => {
        try {
            const { name } = req.params;

            if (!name) {
                throw new ApiErrorHandler(400, "Category name is required");
            }

            const category = await Category.findOne({ name: name });
            if (!category) {
                throw new ApiErrorHandler(404, "Category not found");
            }

            return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));

        } catch (error) {
            console.error("Error fetching category by name:", error);  // Log the actual error
            return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "Error fetching category"));
        }
    }
};
