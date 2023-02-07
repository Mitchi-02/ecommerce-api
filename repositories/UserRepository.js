const { User } = require('../models');
const validations = require('../utils/validations')
const sendEmailVerification = require('../utils/sendEmailVerification')
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail')
const bcrypt = require('bcrypt');
const { delPasswordUser } = require('../utils/responses');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const registerUser = async (req) => {
    const { error } = validations.userRegister(req.body);  
    if (error) return { 
        error: error.details[0].message
    }
    let user = await User.findOne({
        email: req.body.email.trim()
    });
    if(user) return {
        error: "Email already used"
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = await User.create({
        name: req.body.name.trim(),
        email: req.body.email.trim(),   
        password: hashedPassword
    });

    const token = jwt.sign({id: user._id, role: user.role, is_verified: false}, process.env.JWT_SECRET);
    sendEmailVerification(user);
    return {
        data: {
            user: delPasswordUser(user),
            token: token,
        }
    }
}

const loginUser = async (req) => {
    const { error } = validations.userLogin(req.body);
    if (error) return { 
        error: error.details[0].message
    }
    const user = await User.findOne({
        email: req.body.email.trim(),
    });
    if(!user) return {
        error: "No user found with specified email and password"
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) return {
        error: "No user found with specified email and password"
    }
    const is_verified = user.verified_at ? true : false;
    const token = jwt.sign({id: user._id, role: user.role, is_verified}, process.env.JWT_SECRET);
    return {
        data: {
            user: delPasswordUser(user),
            token: token,
        }
    }
}

const updateName = async (req) => {
    const { error } = validations.userUpdate(req.body);  
    if (error) return { 
        error: error.details[0].message
    }
    const user = await User.findById(req.user.id, { password:0 });
    user.name = req.body.name.trim();
    await user.save();
    return {
        data: user
    }
}

const updatePassowrd = async (req) => {
    const { error } = validations.passwordUpdate(req.body);  
    if (error) return { 
        error: error.details[0].message
    }
    const user = await User.findById(req.user.id);
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) return {
        error: "Incorrect password"
    }
    const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
    user.password = hashedPassword;
    await user.save();
    return {
        data: delPasswordUser(user)
    }
}

const all = async () => {
    const users = await User.find({ }, { password:0 });
    return users
}

const deleteUserById = async (req, res) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }

    const user = await User.findByIdAndDelete(req.params.id, { password:0 });
    if(!user) return { }
    return {
        data: delPasswordUser(user)
    }
}

const getUserById = async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }

    const user = await User.findById(req.params.id, { password:0 });
    return {
        data: user
    }
}

const updateRoleById= async (req) => {
    const { error } = validations.hasValidId(req.params);
    if (error) return { }
    const user = await User.findById(req.params.id, { password:0 });
    if(!user) return { }
    user.role = User.adminRole;
    await user.save();
    return {
        data: user
    }
}

const verifyEmail = async(req) => {
    try {
        const payload = jwt.verify(req.body.verify_token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id, { password:0 });
        if(user.verified_at) return {
            error: "Your account is already verified"
        }
        user.verified_at = Date.now();
        await user.save();
        const new_auth_token = jwt.sign({id: user._id, role: user.role, is_verified: true}, process.env.JWT_SECRET);
        return {
            data: {
                user: user,
                token: new_auth_token
            }
        }

    } catch (error) {
        return {
            error:"Wrong link"
        }   
    }
}

const sendVerificationEmail= async (req) => {
    const user = await User.findById(req.user.id, { password:0 });
    if(user.verified_at) return {
        error: "Your account is already verified"
    }
    sendEmailVerification(user);
    return { }
}

const resetPassword = async(req) => {
    try {
        const payload = jwt.verify(req.body.reset_token, process.env.JWT_SECRET);
        console.log(payload);
        if(!payload.allowedToreset) return {
            error: "wrong link"
        }
        const { error } = validations.validateResetPassword(req.body);
        if(error) return {
            error: error.details[0].message
        }
        const user = await User.findOne({
            email: payload.email
        });
        const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
        user.password = hashedPassword;
        await user.save();
        return { }
    } catch (error) {
        return {
            error:"Wrong link"
        };        
    }
}

const sendResetPasswordMail= async (req) => {
    const { error } = validations.validateEmail(req.body);
    if(error) return {
        error: error.details[0].message
    }
    sendResetPasswordEmail(req.body.email);
    return { }
}

module.exports = { registerUser, loginUser, updateName, updatePassowrd, all, deleteUserById, getUserById, updateRoleById, 
    verifyEmail, sendVerificationEmail, resetPassword, sendResetPasswordMail
}

