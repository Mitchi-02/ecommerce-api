const UserRepository = require('../repositories/UserRepository');
const { sendSuccess, sendError } = require('../utils/responses');


const register = async (req, res) => {
    const { error, data } = await UserRepository.registerUser(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'User registered successfully. An verification link has been sent to your email', {
        user: data.user,
        token: data.token
    })
}

const login = async (req, res) => {
    const { error, data } = await UserRepository.loginUser(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'User logged in successfully', {
        user: data.user,
        token: data.token
    })
}

const update_infos = async (req, res) => {
    const { error, data } = await UserRepository.updateName(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'User name updated successfully', {
        user: data
    })
}

const update_password = async (req, res) => {
    const { error, data } = await UserRepository.updatePassowrd(req);
    if( error ) return sendError(res, 500, error)
    return sendSuccess(res, 'User password updated successfully', {
        user: data
    })
}





module.exports = { register, login, update_infos, update_password }