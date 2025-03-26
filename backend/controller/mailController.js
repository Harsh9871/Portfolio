const { sendMailService } = require('../services/mailService.js');

exports.sendMail = async (to, subject, message) => {
    try {
        const html = `<p>${message}</p>`;
        const info = await sendMailService(to, subject, html);
        console.log('Email sent:', info.messageId);
        return { statusCode: 200, body: JSON.stringify(info) };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { statusCode: 500, body: error };
    }
};
