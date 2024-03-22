const createMailTransporter = require("./createMailTransporter");

const sendEmail = (user) => {
    const transporter = createMailTransporter();

    const message = {
        from: `"HacktivLearn" <bryanhacktiv8@outlook.com>`,
        to: user,
        subject: "Welcome to HacktivLearn",
        text: "Remember your username and password! We cannot help you to retrieve your password because our IT guy is not at that level yet! Thankyou for your participation at HacktivLearn. Goodluck with your studies!"

    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Sent Email!")
        }
    });
};

module.exports = { sendEmail }