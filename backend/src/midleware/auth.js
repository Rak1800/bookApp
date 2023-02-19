const jwt=require('jsonwebtoken')
const checkAuth = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]; 
        if (!token) token = req.headers["X-API-KEY"];
        if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "secretkeys")

        req.sellerId = decodedToken.sellerId; //this part to  use of authorization in  productController 

        next();

    } catch (error) {
        res.status(500).send({ status: false, Error: error.message });
    }
};


module.exports = { checkAuth }