const UserRepository = require('../repositories/UserRepository');
const ProductRepository = require('../repositories/ProductRepository');
const OrderRepository = require('../repositories/OrderRepository');
const { sendSuccess, sendError } = require('../utils/responses');


const create_product = async (req, res) => {
    const { error, data } = await ProductRepository.addProduct(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Product created successfully', {
        product: data
    })
}

const update_product = async (req, res) => {
    const { error, data } = await ProductRepository.updateProductById(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Product updated successfully', {
        product: data
    })
}

const delete_product = async (req, res) => {
    const { data } = await ProductRepository.deleteProductById(req);
    if( !data ) return sendError(res, 500, "Can not find product with specified id")
    return sendSuccess(res, 'Product deleted successfully', {
        product: data
    })
}

const index_users = async (req, res) => {
    const data = await UserRepository.all();
    return sendSuccess(res, 'Users retreived successfully', {
        users: data
    })
}

const delete_user = async (req, res) => {
    const { data } = await UserRepository.deleteUserById(req);
    if( !data ) return sendError(res, 500, "Can not find user with specified id")
    return sendSuccess(res, 'User deleted successfully', {
        user: data
    })
}

const show_user = async (req, res) => {
    const { data } = await UserRepository.getUserById(req);
    if( !data ) return sendError(res, 500, "No user found")
    return sendSuccess(res, 'User retreived successfully', {
        user: data
    })
}

const update_user_role = async (req, res) => {
    const { data } = await UserRepository.updateRoleById(req);
    if( !data ) return sendError(res, 500, "No user found")
    return sendSuccess(res, 'User role updated successfully', {
        user: data
    })
}

const index_orders = async (req, res) => {
    const data = await OrderRepository.all();
    return sendSuccess(res, 'Orders retreived successfully', {
        orders: data
    })
}

const show_order = async (req, res) => {
    const { error, data } = await OrderRepository.getOrderById(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Order retreived successfully', {
        order: data
    })
}

const update_order_infos = async (req, res) => {
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

const update_order_status = async (req, res) => {
    const { error, data } = await OrderRepository.updateOrderStatus(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'Order status updated successfully', {
        order: data
    })
}

const show_user_orders = async (req, res) => {
    const { data } = await OrderRepository.getOrdersByUserId(req);
    if( !data ) return sendError(res, 500, "No user orders found")
    return sendSuccess(res, 'User orders retreived successfully', {
        order: data
    })
}


module.exports = { index_users, delete_user, show_user, update_user_role, create_product, delete_product, update_product, index_orders,
    show_order, update_order_infos, delete_order, update_order_status, show_user_orders }