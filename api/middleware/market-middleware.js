const Market = require('../marketplace/marketplace-model')

//validates Offer data schema
const validateOffer = (req, res, next) =>{
    const {product_name, price} = req.body
    if(!product_name || !price || product_name === '' || price === ''){
        res.status(400).json({message: "product name and price required"})
    }
    else{
        next();
    }
}

//validates Store data schema
const validateStore = (req,res,next) => {
    const {store_name} = req.body
    if(!store_name || store_name === ''){
        res.status(400).json({message: "store name required"})
    }
    else{
        next();
    }
}

//validates product data schema
const validateProduct = (req,res,next) => {
    const {product_name, cat_name} = req.body
    if(!product_name || !cat_name || product_name == '' || cat_name == ''){
        res.status(400).json({message: "product and category name required"})
    }
    else{
        next();
    }
}

module.exports = {
    validateOffer,
    validateStore,
    validateProduct
}