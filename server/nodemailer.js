const nodemailer = require('nodemailer');
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your email',
        pass: 'your APP password'
    },
    tls: {
        rejectUnauthorized: false
    }
})
const sendPassMail = (email,userName,token) => {
    const details = {
        from: 'your email',
        to: email,
        subject: 'Forgot Password',
        html: `<h1>Hello ${userName}!</h1><p>Forgot your password? No worries! Click the link below to change your password:-</p><br><a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`
    }

    mailTransporter.sendMail(details, (e) => {
        if (e) {
            console.log('error sending mail',e)
        }
        else {
            console.log('successfully sent mail');
        }
    })
}

const sendAuthMail = (email,userName,token) => {
    const details = {
        from: 'reiineiangar@gmail.com',
        to: email,
        subject: 'Confirm Your Email',
        html: `<h1>Hello ${userName}!</h1><p>Please click the link below to confirm your account:-</p><br><a href='http://localhost:3001/confirm-register?token=${token}'>Click Here</a>`
    }

    mailTransporter.sendMail(details, (e) => {
        if (e) {
            console.log('error sending mail',e)
        }
        else {
            console.log('successfully sent mail');
        }
    })
}

module.exports = {sendPassMail,sendAuthMail};
