const router = require('express').Router();
const Market = require('./marketplace-model')
const {checkIfStoreOwner} = require('../middleware/auth-middleware')

//get a list of stores, will probably delete this
// on the off chacne I don't, this will need to be restricted to owners and users
router.get('/stores', (req, res, next) => {
   Market.getStores()
    .then(stores => {
        res.status(200).json(stores)
    })
    .catch(next)
} )

//[GET] Using the username, this brings up an array all of the selected owner's stores with store_ids
// example: should return formatted like this [{"store_id": 1 "store_name": "Local Market"}]
// this should be restricted to owners and users only
router.get('/user/:username/stores', (req, res, next) => {
    Market.getStoresByUser(req.params.username)
        .then(stores => {
            res.status(200).json(stores)
        })
        .catch(next)
})

//[GET] Using the store_id, brings up the store name and what products that store is currently offering
// this should be restricted to only users and owners
router.get('/stores/:store_id', (req, res, next) => {
    Market.getStoreOffers(req.params.store_id)
     .then(offers => {
         res.status(200).json(offers)
     })
     .catch(next)
 } )
//[POST] Adds a new offer to the store
// this should be restricted only to the owner of the respective store
 router.post('/user/:username/store/:store_id', checkIfStoreOwner, (req,res,next) => {
     Market.addOffer(req.body, req.params.store_id)
        .then(offer => {
            res.status(210).json(offer)
        })
        .catch(next)
 })

module.exports = router;