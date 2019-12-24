var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raichy@gmail.com',
        pass: 'par0ll1218'
        // pass: process.env.RAICHY_PASS
    }
})

var mailOptions = {
    // from: 'yad2helper@gmail.com',
    to: 'shmigelsky@gmail.com',
    subject: 'yad2helper',
    text: 'New item is available'
}

exports.transporter = transporter
exports.mailOptions = mailOptions