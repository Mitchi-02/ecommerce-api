const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);


const hasValidId = (data) => {
    return joi.object({
        id: joi.objectId().required()
    }).validate(data)
}

const validateProduct = (product) => {
    return joi.object({
        name: joi.string().trim().min(3).max(30).required(),
        description: joi.string().trim().alphanum().min(10).max(255).required(),
        price:  joi.number().positive().required()
    }).validate(product)
}

const userRegister = (user) => {
    return joi.object({
        name: joi.string().trim().min(5).max(20).required(),
        email: joi.string().trim().email().required(),
        password: joi.string().min(8).max(255).required(),
        confirm_password: joi.ref('password'),
        role: joi.string(),
        verified_at: joi.date()
    }).with("password", "confirm_password").validate(user)
}

const userLogin = (user) => {
    return joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }).validate(user)
}

const userUpdate = (user) => {
    return joi.object({
        name: joi.string().trim().min(5).max(20).required()
    }).validate(user)
}

const passwordUpdate = (data) => {
    return joi.object({
        password: joi.string().required(),
        new_password: joi.string().min(8).max(255).required(),
    }).validate(data)
}

const validateOrder = (order) => {
    return joi.object({
        address: joi.string().trim().alphanum().required(),
        products: joi.array().items({
            id: joi.objectId().required(),
            name: joi.string().trim().min(3).max(30).required(),
        }),
        total_price: joi.number().positive().required()
    }).validate(order)
}

const validateResetPassword = (data) => {
    return joi.object({
        reset_token: joi.required(),
        new_password: joi.string().min(8).max(255).required(),
        confirm_new_password: joi.ref('new_password'),
    }).validate(data)
}

const validateEmail = (data) => {
    return joi.object({
        email: joi.string().trim().email().required(),
    }).validate(data)
}



module.exports = { hasValidId, validateProduct, userRegister, userLogin, userUpdate, passwordUpdate, validateOrder, validateResetPassword, validateEmail }



