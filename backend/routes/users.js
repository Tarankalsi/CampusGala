const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const twilio = require('twilio');
const Otp = require('../models/Otp');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid)
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
console.log(twilioPhoneNumber)
const JWT_SECRET = 'Taranisagoodboy'

//Route 1 : Create a User using :POST "/api/users/createuser"
router.post('/createuser', [
    body('fullName', "Enter a Valid Name (minimum : 3 Characters").isLength({ min: 3 }),
    body('mobileNumber', "Enter A Valid Mobile Number").isMobilePhone(),
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Passowrd Must be 5 Characters").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let userWithEmail = await User.findOne({ email: req.body.email })
        let userWithMobile = await User.findOne({ mobileNumber: req.body.mobileNumber })

        if (userWithMobile) {
            return res.status(400).json({ error: "User Already Exist with this Number " })
        }

        if (userWithEmail) {
            return res.status(400).json({ error: "User Already Exist with this Email" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            fullName: req.body.fullName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ authtoken: authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred");
    }
})

//Route 2 : User  Login :POST "/api/users/createuser

router.post('/login', [
    body('mobileNumber', "Enter a Valid Email").isMobilePhone(),
    body('password', "Passowrd cannot be blank").exists()
], async (req, res) => {

    let success = false
    //If there are errorss , return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { mobileNumber, password } = req.body;
    try {
        const user = await User.findOne({ mobileNumber })
        if (!user) {
            return res.status(400).json({ success, error: "Incorrect Credentials!" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Incorrect Password!" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET)
        success = true
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }

})

//Route 3 : Get Loggedin User Details using: POST "/api/user/getuser . Login Required"
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

//Route 4 :  Request OTP for mobile number authentication: POST "/api/user/otp" .
router.post('/otp', fetchuser ,async (req, res) => {
    try {

        //Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000)
        
        console.log(otp)
        const otpData = await Otp.create({
            mobileNumber: req.body.mobileNumber,
            otp: otp
        })
        const client = twilio(accountSid , authToken)

        //send OTP using twilio
        await client.messages.create({
            body: `CampusGala Verification . OTP For verification is : ${otp}`,
            from: twilioPhoneNumber,
            to: req.body.mobileNumber
        })

        res.status(200).send("OTP sent Succesffully")
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
})

//Route 5 :  Request OTP for mobile number authentication: POST "/api/user/otp-verification" .
module.exports = router