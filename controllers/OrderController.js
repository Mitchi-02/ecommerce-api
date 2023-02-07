const OrderRepository = require('../repositories/OrderRepository');
const { sendSuccess, sendError} = require('../utils/responses');


const show_order = async (req, res) => {
    const { error, data } = await OrderRepository.getOrderById(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Order retreived successfully', {
        order: data
    })
}

const create_order = async (req, res) => {
    const { error, data } = await OrderRepository.addOrder(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Order created successfully', {
        order: data
    })
}

const update_order = async (req, res) => {
    const { error, data } = await OrderRepository.updateOrderById(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Order updated successfully', {
        order: data
    })
}

const delete_order = async (req, res) => {
    const { error, data } = await OrderRepository.deleteOrderById(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Order deleted successfully', {
        order: data
    })
}

const show_personal_orders = async (req, res) => {
    const { data } = await OrderRepository.getAuthOrders(req);
    return sendSuccess(res, 'Personal orders retreived successfully', {
        orders: data
    })
}


module.exports = { show_order, create_order, delete_order, update_order, show_personal_orders }