const Market = require('../marketplace/marketplace-model')

const validateOffer = (req, res, next) =>{
    const {product_name, price} = req.body
    if(!product_name || !price || product_name == '' || price == ''){
        res.status(400).json({message: "product name and price required"})
    }
    else{
        next();
    }
}

module.exports = {
    validateOffer
}