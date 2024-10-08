const nodemailer = require("nodemailer");

//sending logic 
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    //service: "Gmail",
    //host: "smtp.gmail.com",
    //port: 465,
    //secure: true,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS
    }
});

async function sendResetPassworEmail(userMail, message) {
    const mailOptions = {
        from: 'WaliaJobs support team <walias@cb.com',
        to: userMail,
        subject: 'Password change request recieved',
        text: message,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset link sent to:', userMail);
    } catch (error) {
        console.error('Error sending Reset link:', error);
    }
}
//console.log(`Sending OTP ${user.resetOtp} to ${email}`);
//}
module.exports = {
    sendResetPassworEmail
};
