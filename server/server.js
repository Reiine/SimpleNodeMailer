const express = require('express');
const cors = require('cors');
const randomstring = require('randomstring')
const app = express();
const register = require('../model/register');
const { sendPassMail, sendAuthMail } = require('./nodemailer');
const { default: mongoose } = require('mongoose');

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3001;
mongoose.set('strictQuery',false);

app.post('/register', async (req, res) => {
    const { name, email, pass } = req.body;
    const token = randomstring.generate();
    const regData = new register({
        name: name,
        email: email,
        pass: pass,
    });
    try {
        const regDataDB = await regData.save()
        res.json("regsuccess")
        const data = await register.updateOne({ email: email }, { $set: { token: token } })
        sendAuthMail(email, name, token)
    } catch (e) {
        console.log('error sending to mongo', e)
    }
})
app.get('/confirm-register', async (req, res) => {
    const { token } = req.query;
    const user = await register.findOne({ token: token });
    try {
        if (user) {
            const data = await register.updateOne({ token: token }, { $set: { verified: true } })
            res.send('<h1>Your email is verified!</h1><p>You can now login to your account.</p>')
        } else {
            res.send('<h1>user verification failed</h1>')
        }
    } catch (error) {
        res.json("can't validate");
    }
})

app.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    const user = await register.findOne({ email: email });
    try {
        if (user) {
            if (user.verified === true) {
                if (user.pass === pass) {
                    res.json({message:'logsuccess', name:user.name})
                } else {
                    res.json('passerror')
                }
            }else{
                res.json('unverified')
            }
        } else {
            res.json('nouserexist')
        }
    } catch (error) {
        res.json('Error occured. Please try again later.')
    }
})

app.post('/forgot-pass', async (req, res) => {
    const { email } = req.body;
    const randomString = randomstring.generate();
    const user = await register.findOne({ email: email });
    try {
        if (user) {
            const sendData = await register.updateOne({ email: email }, { $set: { token: randomString } })
            const userName = user.name;
            const token = randomString;
            sendPassMail(email, userName, token);
            res.json('success')
        } else {
            res.json('nouserexist')
        }
    } catch (error) {
        console.log('errorr')
    }
})

app.post('/reset-pass', async (req, res) => {
    const { token } = req.query;
    const { pass } = req.body;
    const user = await register.findOne({ token: token });
    try {
        if (user) {
            const userData = await register.updateOne({ token: token }, { $set: { pass: pass } });
            const data = await register.updateOne({ token: token }, { $unset: { token: 1 } });
            res.json('success');
        } else {
            res.json('error reseting the password');
        }
    } catch (error) {
        console.log('maserror');
    }
})

app.listen(PORT)