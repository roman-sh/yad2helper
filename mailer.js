var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'raichy@gmail.com',
        pass: process.env.RAICHY_PASS
    }
})

var mailOptions = {
    from: 'yad2helper@gmail.com',
    to: 'shmigelsky@gmail.com',
    subject: 'yad2helper',
    text: 'New item is available'
}

exports.transporter = transporter
exports.mailOptions = mailOptions