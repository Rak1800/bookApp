const userModel = require("../models/userModel")


const createUser = async function (req, res) {
    try {
        let data = req.body
        const { fullName, gender, phone, email, password } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, meessage: "provide some data" })
        if (!fullName) return res.status(400).send({ status: false, meessage: "enter your fullName" })
        if (!gender) return res.status(400).send({ status: false, meessage: "enter your gender" })
        if (!phone) return res.status(400).send({ status: false, meessage: "enter your phone" })
        let checkphone =await userModel.findOne({ phone: phone })
        if (checkphone) return res.status(400).send({ status: false, meessage: "phone is already exist" })
        if (!email) return res.status(400).send({ status: false, meessage: "enter your email" })
        let checkmail = await userModel.findOne({ email: email })
        if (checkmail) return res.status(400).send({ status: false, meessage: "email is already exist" })
        if (!password) return res.status(400).send({ status: false, meessage: "enter your password" })


        const userData = await userModel.create(data)
        res.status(201).send({ status: false, message: "user created succussful", data: userData })
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

const loginUser = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, meessage: "provide some data" })
        if (!email) return res.status(400).send({ status: false, meessage: "enter your email" })
        if (!password) return res.status(400).send({ status: false, meessage: "enter your password" })
        let checkuser = await userModel.findOne({ email: email, password: password })
        if (!checkuser) return res.status(404).send({ status: false, message: "user not found" })
        res.status(200).send({ status: true, message: "login succuss" })
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

module.exports = { createUser, loginUser }