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

module.exports = router;