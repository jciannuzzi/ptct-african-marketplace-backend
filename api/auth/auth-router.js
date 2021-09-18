const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken')


router.get('/test', async (req, res, next) => {
    try{
        res.status(200).json({message: "auth-router is functioning correctly"})
    }
    catch(err){
        next(err)
    }
} )

//[POST] /register adds and returns a new user


//[POST] /login logs in to user using username and password 
// returns with a web token and user_id
// you will want to use the returned user_id and token to make sure this user only has access to
// their respective stores, and not the stores of others

//[GET] /logout logs the user out so that they no longer have access to restricted content

module.exports = router;