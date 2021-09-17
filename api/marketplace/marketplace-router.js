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

//[GET] Using the store_id, brings up the store name and what products that store is currently offering
router.get('/stores/:id/offers', (req, res, next) => {
    Market.getStoreOffers(req.params.id)
     .then(offers => {
         res.status(200).json(offers)
     })
     .catch(next)
 } )
//[POST] Adds a new offer to the store
 router.post('/stores/:id/offers', (req,res,next) => {
     Market.addOffer(req.body, req.params.id)
        .then(offer => {
            res.status(210).json(offer)
        })
        .catch(next)
 })

module.exports = router;