const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/responses');
const User = require('../models/User');
require('dotenv').config();


const getAuthUser = (req) => {
    const token = req.header('x-auth-token');
    if(!token) return null;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        return null;        
    }
}

const auth = (req, res, next) => {
    user = getAuthUser(req);
    if(!user) return sendError(res, 401, "Unauthentificated");
    req.user = user;
    next()
}

const guest = (req, res, next) => {
    user = getAuthUser(req);
    if(user) return sendError(res, 401, "You're already logged in");
    next()
}

const verified = (req, res, next) => {
    if (!req.user.is_verified) return sendError(res, 401, "Must be verfified");
    next();
}

const admin = (req, res, next) => {
    if (req.user.role != User.adminRole) return sendError(res, 401, "Must be admin to do this action");
    next();
}


module.exports = { auth, guest, admin, verified }
