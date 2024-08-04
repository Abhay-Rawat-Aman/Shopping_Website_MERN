const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    parentCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
