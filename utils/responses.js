const sendSuccess = (res, message, data=null) => {
    const response = {
        success: true,
        message: message
    }
    if(data) response.data = data;

    return res.status(200).json(response)
}

const sendError = (res, status, message, errors=null) => {
    const response = {
        success: false,
        message: message
    }
    if(errors) response.errors = errors;
    
    return res.status(status).json(response)
}

const delPasswordUser = (user) => {
    const { password, ...newUser } = user._doc;
    return newUser;
}

module.exports = {sendSuccess, sendError, delPasswordUser}