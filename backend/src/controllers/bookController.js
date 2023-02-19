const { default: mongoose } = require("mongoose")
const bookModel = require("../models/bookModel")
const sellerModel = require("../models/sellerModel")

const createBook = async function (req, res) {
    try {
        let data = req.body
        const { bookCover, title, category, sellerId } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, meessage: "provide some data" })
        if (!bookCover) return res.status(400).send({ status: false, meessage: "enter your fullName" })
        let checkbookCover = await bookModel.findOne({ bookCover: bookCover })
        if (checkbookCover) return res.status(400).send({ status: false, meessage: "bookCover is already exist" })
        if (!title) return res.status(400).send({ status: false, meessage: "enter your gender" })
        let checktitle =await bookModel.findOne({ title: title })
      
        if (checktitle) return res.status(400).send({ status: false, meessage: "title is already exist" })
        if (!category) return res.status(400).send({ status: false, meessage: "enter your phone" })
        
        if (!sellerId) return res.status(400).send({ status: false, meessage: "enter your email" })
        if (!mongoose.Types.ObjectId(sellerId)) return res.status(400).send({ status: false, msg: "provide valid userId" })
        let findsellerId = await sellerModel.findById({ _id: sellerId })
        if (!findsellerId) return res.status(404).send({ status: false, msg: "SellerId is not found" })

        if (findsellerId._id != req.sellerId) return res.status(400).send({ status: false, message: "you are unathorized" })

        const bookData= await bookModel.create(data)
        res.status(201).send({ status: false, message: "user created succussful", data: bookData })
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}



const allBook = async function (req, res) {
    try {
        let sellerId = req.params.sellerId
        if(!sellerId) return res.status(400).send({ status: false, meessage: "enter sellerId" })
        if(!mongoose.Types.ObjectId(sellerId)) return res.status(400).send({ status: false, meessage: "enter valid sellerId" })
        let seller=await sellerModel.findById({_id:sellerId})
        if(!seller) return res.status(404).send({status:false,message:"seller are not available"})
        let books=await bookModel.find()
        if(!books) return res.status(404).send({ status: false, meessage: "books are not available" })

        if (seller._id != req.sellerId) return res.status(400).send({ status: false, message: "you are unathorized" })
        res.status(200).send({status:true,data:books})
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

const updatebook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!bookId) return res.status(400).send({ status: false, meessage: "enter your bookId" })
        if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "provide valid bookId" })
        let bookData = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookData) return res.status(404).send({ status: false, meessage: "book not  found" })
        if (bookData.sellerId != req.sellerId) return res.status(401).send({ status: false, message: "you are unathorized" })
        let data = req.body
        const { bookCover, title, category } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, meessage: "provide some data" })
        let update = await bookModel.findOneAndUpdate({ _id: bookId }, {
            $set: {
                bookCover: bookCover,
                title: title,
                category: category,
            }
        }, { new: true })
        res.status(200).send({ status: true, message: "update succussful", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.meessage })
    }
}
const deletebook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!bookId) return res.status(400).send({ status: false, meessage: "enter your bookId" })
        if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "provide valid bookId" })
        let bookData = await bookModel.findOne({ _id: bookId })
        if (!bookData) return res.status(404).send({ status: false, meessage:"book  not  found" }) 
        let alreadydelete = await bookModel.findOne({ _id: bookId, isDeleted: true })
        if (alreadydelete) return res.status(400).send({ status: false, meessage: "already deleted book" })
        if (bookData.sellerId != req.sellerId) return res.status(401).send({ status: false, message: "you are unathorized" })
        let deleteData = await bookModel.findOneAndUpdate({ _id: bookId }, {
            $set: {
                isDeleted: true,
                deleteAt: new Date()
            }
        }, { new: true })
        res.status(200).send({ status: true, message: "product delete succussful", data: deleteData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.meessage })
    }
}


module.exports= {createBook,allBook,updatebook,deletebook}