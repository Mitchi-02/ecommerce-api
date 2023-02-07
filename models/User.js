const mongoose = require('mongoose');
const schema = mongoose.Schema;


const UserSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 255,
    },
    verified_at: {
        type: Date,
        default: null
    },
    role:{
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

User.adminRole = "admin";
User.customerRole = "customer";


module.exports = User