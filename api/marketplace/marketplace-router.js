const router = require('express').Router();

router.get('/test', async (req, res, next) => {
    try{
        res.status(200).json({message: "market-router is functioning correctly"})
    }
    catch(err){
        next(err)
    }
} )

module.exports = router;