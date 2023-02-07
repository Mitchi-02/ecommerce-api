const ProductRepository = require('../repositories/ProductRepository');
const { sendSuccess, sendError} = require('../utils/responses');


const index = async (req, res) => {
    const data = await ProductRepository.all();
    return sendSuccess(res, 'Products retreived successfully', {
        products: data
    })
}

const show_product = async (req, res) => {
    const { data } = await ProductRepository.getProductById(req);
    if( !data ) return sendError(res, 500, "No product found")
    return sendSuccess(res, 'Product retreived successfully', {
        product: data
    })
}




module.exports = { index, show_product }