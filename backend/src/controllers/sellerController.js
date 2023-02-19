const sellerModel = require("../models/sellerModel")
const jwt = require('jsonwebtoken')

const createSeller = async function (req, res) {
    try {
        let data = req.body
        const { fullName, gender, phone, email, password } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, meessage: "provide some data" })
        if (!fullName) return res.status(400).send({ status: false, meessage: "enter your fullName" })
        if (!gender) return res.status(400).send({ status: false, meessage: "enter your gender" })
        if (!phone) return res.status(400).send({ status: false, meessage: "enter your phone" })
        let  findphone =await sellerModel.findOne({phone:phone})
        console.log(findphone)
        if(findphone) return res.status(400).send({ status: false, meessage: "phone is already exist" })
       
        if (!email) return res.status(400).send({ status: false, meessage: "enter your email" })
        let checkmail = await sellerModel.findOne({ email: email })
        if (checkmail) return res.status(400).send({ status: false, meessage: "email is already exist" })
        if (!password) return res.status(400).send({ status: false, meessage: "enter your password" })


      
        const sellData= await sellerModel.create(data)
        res.status(201).send({ status: false, message: "user created succussful", data: sellData })
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

const loginseller = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, meessage: "provide some data" })
        if (!email) return res.status(400).send({ status: false, meessage: "enter your email" })
        if (!password) return res.status(400).send({ status: false, meessage: "enter your password" })
        let checkuser = await sellerModel.findOne({ email: email, password: password })
        if (!checkuser) return res.status(404).send({ status: false, message: "user not found" })

        const token = jwt.sign({                //jsonwebtoken use token create and use of aauthentication part midleware
            sellerId: checkuser._id.toString()
        }, "secretkeys")

        res.setHeader('x-api-key', token)
        res.status(200).send({ status: true, message: "login succuss", sellerId: checkuser._id, token })
    } catch (error) {
        res.status(500).send({ status: false, message: error }) 
    }
}

module.exports = { createSeller, loginseller }