const db = require('../../data/db-config');

    const findUser = (filter) =>{
        return db('users')
                .where(filter)
                .first()
    }
module.exports = {
    findUser
}