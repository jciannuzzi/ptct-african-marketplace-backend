const Market = require('../marketplace/marketplace-model')
const jwt =  require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/index.js')


//checks to make sure the user is logged in
const restricted = (req,res,next) => {
    const token = req.headers.authorization
    if(!token){
        res.status(401).json({message: "Token required"})
    } else{
        jwt.verify(token,JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({message: "Token invalid"})
            } else{
                req.decodedToken = decoded
                next()
            }
        })
    }
}

//checks to make sure that the user that is logged in is a business owner and not just a regular user
const restrictedOwner = (req,res,next) => {
    const {role_id} = req.decodedToken
    if(role_id == 1){
        next();
    } else{
        res.status(401).json({message: "Invalid account type"})
    }
}

// a middleware to check if the current user is the owner of the store
const checkIfStoreOwner = async (req,res,next) =>{
    //New code that uses the decoded token to determine store ownership
    const {user_id} = req.decodedToken
    const {store_id} = req.params
    const store = await Market.findStoreById(store_id)
    if(!store){
        res.status(404).json({message: "store not found"})
    }
    if (store.user_id == user_id){
        next();
    }
    else{
        res.status(400).json({message: "Invalid user"})
    }

    //Old code that uses url params to determine store ownership
    // const {username, store_id} = req.params

    // const store = await Market.findStoreById(store_id)
    // const user = await Users.findUser({username: username})

    // if(!store || !user) {
    //     res.status(404).json({message: "Invalid Store or User"})
    // }
    // const user_id = user.user_id
    // const checkId = store.user_id   
    // if(user_id == checkId) {
    //         next();
    // } 
    // else{
    //         res.status(400).json({message: "Invalid User"})
    // }   
}

module.exports = {
    restricted,
    restrictedOwner,
    checkIfStoreOwner
}