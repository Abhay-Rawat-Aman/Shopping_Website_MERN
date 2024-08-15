const mongoose = require('mongoose');
const { Schema } = mongoose;


const variationTypeSchema = new Schema({
    variation_id: { type: Number, required: true },
    type: { type: String, required: true }
});

const variationValueSchema = new Schema({

    variation_type_id: { type: Number, required: true, ref: 'VariationType' },
    value: { type: String, required: true }
});

const productVariationDetailsSchema = new Schema({
    variation_value_id: { type: Number, required: true, ref: 'VariationValue' }
});

const productVariationSchema = new Schema({
    _id: { type: Number, required: true },
    additional_price: { type: Number, required: true },
    stock: { type: Number, required: true },
    details: [productVariationDetailsSchema],
});

const productSchema = new Schema({
    categoryId: {
        type: String,
        required: true,
        ref: 'Category'
    },
    brandId: {
        type: String,
        required: true,
        ref: 'Brand'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    sales: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    discount: {
        type: String
    },
    total: {
        type: String
    },
    subCategory: {
        type: String
    },
    weight: {
        type: String
    },
    dimensions: {
        type: String
    },
    colors: {
        type: String
    },
    sizes: {
        type: String
    },
    mainImage: {
        type: String
    },
    variations: [productVariationSchema]

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
const VariationType = mongoose.model('VariationType', variationTypeSchema);
const VariationValue = mongoose.model('VariationValue', variationValueSchema);

module.exports = { Product, VariationType, VariationValue };
