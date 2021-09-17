const router = require('express').Router();
const Market = require('./marketplace-model')

router.get('/stores', (req, res, next) => {
   Market.getStores()
    .then(stores => {
        res.status(200).json(stores)
    })
    .catch(next)
} )

module.exports = router;