const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async function (user){
    const token = jwt.sign({ id: user._id, role: user.role, is_verified: true }, process.env.JWT_SECRET);
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
            to: user.email, 
            subject: "Email Verification", 
            html: `Please click on this <a href="${process.env.EMAIL_VERIFICATION_CLIENT_URL}/${token}">link</a> in order to verify your email`
        };
        
        await transport.sendMail(options);
        return;
}