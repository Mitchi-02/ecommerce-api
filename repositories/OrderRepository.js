const { Order, User } = require('../models');
const validations = require('../utils/validations');


const canModifyOrder = (auth, order) => {
    if(auth.role == User.adminRole) return null
    if(order.status != Order.pendingStatus) return "Can't update order. It's already "+order.status
    if(order.user.id != auth.id ) return "You're not allowed to update this order"
    return null
}

const all = async () => {
    const orders = await Order.find();
    return orders
}

const getOrderById = async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return {
        error: "No order found"
     }
    const order = await Order.findById(req.params.id);
    if (!order) return {
        error: "No order found"
    }

    if(req.user.role!=User.adminRole && req.user.id!=order.user.id) return {
        error: "Not allowed to view this order"
    }
    return {
        data: order
    }
}

const addOrder = async (req) => {
    const { error } = validations.validateOrder(req.body);  
    if (error) return { 
        error: error.details[0].message
    }
    const user = await User.findById(req.user.id);
    const order = await Order.create({
        user: {
            id: user._id,
            name: user.name
        },
        address: req.body.address.trim(),
        total_price: req.body.total_price,
        products: req.body.products
    });

    return {
        data: order
    }

}

const updateOrderById = async (req) => {
    let { error } = validations.hasValidId(req.params);
    if (error) return { 
        error: "No order found with specified id"
    }
    error = validations.validateOrder(req.body).error;  
    if (error) return { 
        error: error.details[0].message
    }
    const order = await Order.findById(req.params.id);
    if (!order) return { 
        error: "No order found with specified id"
    }
    error = canModifyOrder(req.user, order);
    if(error) return {
        error: error
    }
    await order.update({
        address: req.body.address.trim(),
        total_price: req.body.total_price,
        products: req.body.products
    });
    return {
        data: order
    }
}

const deleteOrderById = async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }

    const order = await Order.findById(req.params.id);
    if (!order) return { 
        error: "No order found with specified id"
    }
    error = canModifyOrder(req.user, order);
    if(error) return {
        error: error
    }
    await order.delete();
    return {
        data: order
    }
}

const updateOrderStatus = async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }

    if(req.status!=Order.delivringStatus && req.status!=Order.deliveredStatus) return {
        error: "Please provide a valid status"
    }
    const order = await Order.findById(req.params.id);
    if (!order) return { 
        error: "No order found with specified id"
    }
    order.status = req.status;
    await order.save();
    return {
        data: order
    }          
}

const getAuthOrders = async (req) => {
    const orders = await Order.findByUserId(req.user.id);
    return {
        data: orders
    }
}

const getOrdersByUserId = async (req) => {
    const orders = await Order.findByUserId(req.params.id);
    if(!orders) return { }
    return {
        data: orders
    }     
}



module.exports = { all, getOrderById, addOrder, updateOrderById, deleteOrderById, updateOrderStatus, getAuthOrders, getOrdersByUserId }
