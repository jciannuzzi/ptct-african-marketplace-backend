const router = require('express').Router();
const Market = require('./marketplace-model')
const {restricted, restrictedOwner, checkIfStoreOwner} = require('../middleware/auth-middleware')
const {validateOffer} = require('../middleware/market-middleware')

//get a list of stores, will probably delete this
// on the off chacne I don't, this will need to be restricted to owners and users
router.get('/stores', (req, res, next) => {
   Market.getStores()
    .then(stores => {
        res.status(200).json(stores)
    })
    .catch(next)
} )

//[GET] /user/:username/stores Using the username, this brings up an array all of the selected owner's stores with store_ids
// example: should return formatted like this [{"store_id": 1 "store_name": "Local Market"}]
// this should be restricted to owners and users only
router.get('/user/:username/stores', restricted, (req, res, next) => {
    Market.getStoresByUser(req.params.username)
        .then(stores => {
            res.status(200).json(stores)
        })
        .catch(next)
})

//[GET] api/market/stores/:store_id Using the store_id, brings up the store name and what products that store is currently offering
// this should be restricted to only users and owners
router.get('/stores/:store_id', restricted, (req, res, next) => {
    Market.getStoreOffers(req.params.store_id)
     .then(offers => {
         res.status(200).json(offers)
     })
     .catch(next)
 } )
//[GET] api/market/products Returns a list of all products in the database
// with respective category names. Should be restricted to owners only
 router.get('/products', restricted, restrictedOwner, (req,res,next) => {
     Market.getProducts()
        .then(prod => {
            res.status(200).json(prod)
        })
        .catch(next)
 })

//[POST] api/market/stores Adds a new store to the owners account
// this should be restricted only to business owner accounts
router.post('/stores', restricted, restrictedOwner, (req,res,next) =>{
    const {store_name} = req.body
    const {user_id} = req.decodedToken
    Market.addStore({store_name, user_id})
        .then(store => {
            res.status(201).json(store)
        })
        .catch(next)
})
 
//[POST] api/market/stores/:store_id Adds a new offer to the store
// this should be restricted only to the owner of the respective store
// products can only be added if they are already in database
// if new product needs to be added, see next endpoint below
 router.post('/stores/:store_id', 
        restricted, 
        restrictedOwner, 
        checkIfStoreOwner, 
        validateOffer, (req,res,next) => {

     Market.addOffer(req.body, req.params.store_id)
        .then(offer => {
            res.status(210).json(offer)
        })
        .catch(next)

 })

 //[POST] /api/market/products Adds a new product to the database
 // requires product_name and cat_name. If product_name already exists, returns error
 // if cat_name already exists, assigns existing cat_id to product
 //if cat_name does not exist, creates new category in database and assigns that cat_id
 // schema example: {product_name: Pear, cat_name: Fruit}
 // this actions is restricted to business owners
 router.post('/products', restricted, restrictedOwner, (req,res,next) => {
    Market.addProduct(req.body)
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(next)
 })

module.exports = router;