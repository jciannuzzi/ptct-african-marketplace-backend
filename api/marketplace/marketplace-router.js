const router = require('express').Router();
const Market = require('./marketplace-model')

//get a list of stores, will probably delete this
router.get('/stores', (req, res, next) => {
   Market.getStores()
    .then(stores => {
        res.status(200).json(stores)
    })
    .catch(next)
} )

//[GET] Store Offers
router.get('/stores/offers/:id', (req, res, next) => {
    Market.getStoreOffers(req.params.id)
     .then(offers => {
         res.status(200).json(offers)
     })
     .catch(next)
 } )

module.exports = router;