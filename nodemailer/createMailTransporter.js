const nodemailer = require(`nodemailer`);

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "bryanhacktiv8@outlook.com",
            pass: "BryanHactiv8"
        }
    });
    return transporter
}

module.exports = createMailTransporter