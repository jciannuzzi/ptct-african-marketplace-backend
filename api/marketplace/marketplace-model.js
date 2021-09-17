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

module.exports = {
    getStores,
    getStoreOffers
}