const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProductSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product