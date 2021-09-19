const router = require('express').Router();
const Market = require('./marketplace-model')
const {restricted, restrictedOwner, checkIfStoreOwner} = require('../middleware/auth-middleware')
const {validateOffer, validateProduct, validateStore} = require('../middleware/market-middleware')

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
router.post('/stores', restricted, restrictedOwner, validateStore, (req,res,next) =>{
    const {store_name} = req.body
    const {user_id} = req.decodedToken
    Market.addStore({store_name, user_id})
        .then(store => {
            res.status(201).json(store)
        })
        .catch(next)
})
 
//[POST] api/market/stores/:store_id/offers Adds a new offer to the store
// this should be restricted only to the owner of the respective store
// products can only be added if they are already in database
// if new product needs to be added, see next endpoint below
 router.post('/stores/:store_id/offers', 
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
 router.post('/products', restricted, restrictedOwner, validateProduct, (req,res,next) => {
    Market.addProduct(req.body)
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(next)
 })

 //[PUT] /api/market/stores/:store_id 
 //Allows a business owner to edit a store name as long as they own store
router.put('/stores/:store_id', 
            restricted, 
            restrictedOwner, 
            checkIfStoreOwner,
            validateStore, (req,res,next) => {
            Market.editStore(req.params.store_id, req.body)
                .then(store => {
                    res.status(210).json(store)
                })
                .catch(next);  
})

 //[PUT] /api/market/stores/:store_id/offers/:offer_id
 // Allows a business owner to edit an offer in their store

router.put('/stores/:store_id/offers/:offer_id',
            restricted,
            restrictedOwner,
            checkIfStoreOwner,
            validateOffer, (req,res,next)=>{
                const {store_id, offer_id} = req.params
                Market.editOffer(store_id, offer_id, req.body)
                    .then(offer => {
                        res.status(210).json(offer)
                    })
                    .catch(next)
            })

 //[DELETE] /api/market/stores/:store_id
 //Allows a business owner to delete a store
 router.delete('/stores/:store_id',
                restricted,
                restrictedOwner,
                checkIfStoreOwner, (req,res,next)=> {
                    Market.deleteStore(req.params.store_id)
                        .then(deleted => {
                            res.status(200).json({message: "This store has been deleted:", deleted})
                        })
                        .catch(next)
                })

 //[DELETE] /api/market/stores/offers/:offer_id
 //Allows a business owner to delete an offer as long as it is in one of their stores

 router.delete('/stores/:store_id/offers/:offer_id',
                restricted,
                restrictedOwner,
                checkIfStoreOwner, (req,res,next) =>{
                    Market.deleteOffer(req.params.offer_id)
                        .then(deleted => {
                            res.status(200).json({message: "This offer has been deleted:", deleted})
                        })
                        .catch(next)
                })

module.exports = router;