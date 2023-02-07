const { Product } = require('../models');
const validations = require('../utils/validations')


const all = async () => {
    const products = await Product.find();
    return products
}

const getProductById = async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }

    const product = await Product.findById(req.params.id);
    return {
        data: product
    }
}

const addProduct = async (req) => {
    const { error } = validations.validateProduct(req.body);  
    if (error) return { 
        error: error.details[0].message
    }
    const product = await Product.create({
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        price: req.body.price,
    });

    return {
        data: product
    }

}

const updateProductById = async (req) => {
    let { error } = validations.hasValidId(req.params);
    if (error) return { 
        error: "No product found with specified id"
    }
    error = validations.validateProduct(req.body).error;  
    if (error) return { 
        error: error.details[0].message
    }
    const product = await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        price: req.body.price,
    });
    if (!product) return { 
        error: "No product found with specified id"
    }
    return {
        data: product
    }
}

const deleteProductById = async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }

    const product = await Product.findByIdAndDelete(req.params.id);
    return {
        data: product
    }
}

module.exports = { all, getProductById, addProduct, deleteProductById, updateProductById }
