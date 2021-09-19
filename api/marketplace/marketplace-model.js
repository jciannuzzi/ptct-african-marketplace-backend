const db = require('../../data/db-config');
const Users = require('../auth/auth-model')

const getStores = () => {
    return db('stores')
}

const getStoresByUser = async (username) => {
    const {user_id} = await Users.findUser({username: username})
    return db('Stores as S')
                .join('users as u', 'S.user_id', 'u.user_id')
                .where('S.user_id', user_id)
                .select('store_id', 'store_name')
}

const findStoreById = (store_id) => {
    return db('Stores')
            .where('store_id', store_id)
            .first();
}

const getStoreOffers = async (store_id) => {
    const offers = await db('Offers as O')
                            .join("Stores as S", "O.store_id", "S.store_id")
                            .join('Products as P', "O.product_id", "P.product_id")
                            .join("Categories as C", "P.cat_id", "C.cat_id")
                            .select('offer_id', 'product_name', 'cat_name', "price")
                            .where('O.store_id', store_id)
    const storeName = await db('stores')
                                .where('store_id', store_id)
                                .select('store_name')
    const store = {
        Name: storeName[0].store_name,
        Offers: offers
    }
    return store;    
}

const findOfferById = (offer_id) => {
    return db('Offers as O')
    .join('Products as P', "O.product_id", "P.product_id")
    .join("Categories as C", "P.cat_id", "C.cat_id")
    .select('offer_id', 'product_name', 'cat_name', "price")
    .where('offer_id', offer_id)
}

const addStore = async (store_name, user_id) => {
    const [store_id] = await db('Stores')
                                .insert({store_name, user_id})
    return findStoreById(store_id);
}

const addOffer = async (offer, store_id) =>{
    
    const {product_name, price} = offer;

    const [{product_id}] = await db('Products')
                                    .where('product_name', product_name)
                                    .select('product_id')
    const newOfferKeys = {
        store_id: store_id,
        product_id: product_id,
        price: price
    }
    const [offer_id] = await db('Offers')
                                .insert(newOfferKeys)
    return findOfferById(offer_id)
}

const getProducts = async() =>{
    return db('Products as P')
                .join('Categories as C', 'P.cat_id', "C.cat_id")
                .select('product_name', 'cat_name')
                .orderBy('cat_name')
}

const addProduct = async(product) =>{
    const{product_name, cat_name} = product
    console.log(cat_name)
    const checkCat = await db('Categories')
                                .where('cat_name', cat_name)
                                .first();
    
    if(!checkCat){
        const [cat_id] = await db('Categories')
                                .insert({cat_name})
        const [product_id] = await db('Products')
                                    .insert({product_name, cat_id})
        return db('Products as P')
                    .join('Categories as C', "P.cat_id", "C.cat_id")
                    .select("product_name", "cat_name")
                    .where('P.product_id', product_id)
    }
    else{
        const {cat_id} = checkCat;

        const [product_id] = await db('Products')
                                    .insert({product_name, cat_id})
        return db('Products as P')
                .join('Categories as C', "P.cat_id", "C.cat_id")
                .select("product_name", "cat_name")
                .where('P.product_id', product_id)
    }
}

const editStore = async (store_id, newName) =>{
    await db('Stores').where('store_id', store_id).update(newName)
    return findStoreById(store_id)
}

const editOffer = async (store_id, offer_id, newOffer) => {
    const {product_name, price} = newOffer

    const [{product_id}] = await db('Products')
                                    .where('product_name', product_name)
                                    .select('product_id')
    const newOfferKeys = {
        store_id: store_id,
        product_id: product_id,
        price: price
    }
    await db('Offers')
            .update(newOfferKeys)

    return findOfferById(offer_id)
}

const deleteStore = async (store_id) => {
    const toBeDelete = await findStoreById(store_id)
    await db("Stores").where('store_id', store_id).del();
    await db('Offers').where('store_id', store_id).del();
    return toBeDelete
}

const deleteOffer = async (offer_id) => {
    const toBeDelete = await findOfferById(offer_id)
    await db('Offers')
            .where('offer_id', offer_id)
            .del();
    return toBeDelete
}

module.exports = {
    getStores,
    getStoresByUser,
    findStoreById,
    getStoreOffers,
    findOfferById,
    addStore,
    addOffer,
    getProducts,
    addProduct,
    editStore,
    editOffer,
    deleteStore,
    deleteOffer
}