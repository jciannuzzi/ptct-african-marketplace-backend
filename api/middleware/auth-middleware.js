const Auth = require('../auth/auth-model.js')
const Market = require('../marketplace/marketplace-model')
const Users = require('../auth/auth-model')


// a middleware to check if the current user is the owner of the store
const checkIfStoreOwner = async (req,res,next) =>{
    const {username, store_id} = req.params

    const store = await Market.findStoreById(store_id)
    const user = await Users.findUser({username: username})

    if(!store || !user) {
        res.status(404).json({message: "Invalid Store or User"})
    }
    const user_id = user.user_id
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