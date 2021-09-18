
exports.up = function(knex) {
    return knex.schema
        .createTable('Stores', stores => {
            stores.increments('store_id')
            stores.string('store_name', 255).notNullable().unique()
            stores.integer('user_id')
        })
        .createTable('Offers', offer => {
            offer.increments('offer_id')
            offer.integer('store_id')
            offer.integer('product_id')
            offer.string('price')
        })
        .createTable('Products', prod => {
            prod.increments('product_id')
            prod.string('product_name').notNullable().unique();
            prod.integer('cat_id')
        })
        .createTable('Categories', cat => {
            cat.increments('cat_id')
            cat.string('cat_name', 255).notNullable().unique();
        })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Categories')
        .dropTableIfExists('Products')
        .dropTableIfExists('Offers')
        .dropTableIfExists('Stores')
};
