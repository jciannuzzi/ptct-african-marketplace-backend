const db = require('../../data/db-config');

    const findUser = (filter) =>{
        return db('users')
                .where(filter)
                .first()
    }

    const addUser = async (user) => {
        const [user_id] = await db('users')
                                .insert(user)
        return findUser({user_id: user_id})
    }
module.exports = {
    findUser,
    addUser
}