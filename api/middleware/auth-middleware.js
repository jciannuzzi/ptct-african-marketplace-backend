const Auth = require('../auth/auth-model.js')
const Market = require('../marketplace/marketplace-model')
const db = require('../../data/db-config')


// a middleware to check if the current user is the owner of the store
const checkIfStoreOwner = async (req,res,next) =>{
    const {user_id, store_id} = req.params

    const store = await Market.findStoreById(store_id)

    if(!store) {
        res.status(404).json({message: "Store not found"})
    }
    const checkId = store.user_id    
    if(user_id == checkId) {
            next();
    } 
    else{
            res.status(400).json({message: "Invalid User"})
    }   
}

module.exports = {
    checkIfStoreOwner
}