const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderSchema = new schema({
    user: {
        type: {
            id: {
                type: schema.Types.ObjectId,
                required: true,
                unique:true
            },
            name:{
                type: String,
                required: true,
                minlength: 3,   
                maxlength: 30,
            },
            _id: false
        },
        required:true
    },
    address: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "delivring", "delivered"],
        default: "pending",
        required: true
    },
    products: {
        type: [{
            id: {
                type: schema.Types.ObjectId,
                required: true,
                unique:true
            },
            name:{
                type: String,
                required: true,
                minlength: 3,   
                maxlength: 30,
            },
            _id: false
        }],
        required: true,
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

Order.pendingStatus = "pending";
Order.delivringStatus = "delivring";
Order.deliveredStatus = "delivered";

Order.findByUserId = async (id) => {
    try {
        const orders = await Order.find({ "user.id": id});
        return orders
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = Order