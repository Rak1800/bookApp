const { createBook, allBook, updatebook, deletebook } = require('../controllers/bookController');
const { createSeller, loginseller } = require('../controllers/sellerController');
const { createUser, loginUser } = require('../controllers/userConroller');
const { checkAuth } = require('../midleware/auth');
const router=require('express').Router()



//============customer API ======================
router.post("/registruser",createUser);
router.post('/loginuser',loginUser);
//=============seller API =======================
router.post('/registerseller',createSeller); 
router.post('/loginseller',loginseller)
//==============book API========================
router.post('/newBok',checkAuth,createBook)
router.get('/allbooks/:sellerId',checkAuth,allBook)
router.put('/updatebook/:bookId',checkAuth,updatebook)
router.delete('/deletebook/:bookId',checkAuth,deletebook)
module.exports=router