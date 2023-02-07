const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async function (toEmail){
    const token = jwt.sign({ allowedToreset: true, email: toEmail }, process.env.JWT_SECRET);
    const transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
            }
        });

        const options = { 
            from: process.env.EMAIL_FROM_ADDRESS, 
            to: toEmail, 
            subject: "Reset password", 
            html: `Please click on this <a href="${process.env.EMAIL_VERIFICATION_CLIENT_URL}/resetPassword/${token}">link</a> in order to reset your password`
        };
        
        const sendMail = await transport.sendMail(options);
        return;
}