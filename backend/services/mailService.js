// controller/mailController
const transporter = require('../config/mailer');

exports.sendMailService = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html,
    };

    // Correct usage: transporter.sendMail
    return await transporter.sendMail(mailOptions);
};