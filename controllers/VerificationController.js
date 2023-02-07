const UserRepository = require('../repositories/UserRepository');
const { sendSuccess, sendError } = require('../utils/responses');


const verify_email = async (req, res) => {
    const { error, data } = await UserRepository.verifyEmail(req);
    if(error) return sendError(res, 500, error);
    return sendSuccess(res, 'Your email was verififed successfully', data)
}

const send_verification_email = async (req, res) => {
    const { error } = await UserRepository.sendVerificationEmail(req);
    if(error) return sendError(res, 500, error)
    return sendSuccess(res, 'Email verification sent successfully')
}

const reset_user_password = async (req, res) => {
    const { error } = await UserRepository.resetPassword(req);
    if(error) return sendError(res, 500, error);
    return sendSuccess(res, 'The password was reset successfully')
}

const send_password_reset_email = async (req, res) => {
    const { error } = await UserRepository.sendResetPasswordMail(req);
    if(error) return sendError(res, 500, error)
    return sendSuccess(res, 'Reset password email was sent successfully')
}




module.exports = { verify_email, send_verification_email, reset_user_password, send_password_reset_email }