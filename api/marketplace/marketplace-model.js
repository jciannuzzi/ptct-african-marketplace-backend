const db = require('../../data/db-config');

const getStores = () => {
    return db('stores')
}

module.exports = {
    getStores
}