const db = require('../../data/db-config');

const getStores = () => {
    return db('stores')
}

const getStoreOffers = async (store_id) => {
    const offers = await db('Offers as O')
                            .join("Stores as S", "O.store_id", "S.store_id")
                            .join('Products as P', "O.product_id", "P.product_id")
                            .join("Categories as C", "P.cat_id", "C.cat_id")
                            .select('product_name', 'cat_name', "price")
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

module.exports = {
    getStores,
    getStoreOffers,
    findOfferById,
    addOffer
}