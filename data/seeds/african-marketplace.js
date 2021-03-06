const bcrypt = require('bcryptjs')
exports.seed = async function(knex) {
  //authorization database
  await knex('users').truncate()
  await knex('roles').truncate()

  await knex('roles').insert([
    {role_name: 'owner'},
    {role_name: 'user'}
  ])

  await knex('users').insert([
    {
      username: 'testOwner',
      password: bcrypt.hashSync('testPass', 10),
      role_id: 1
    },
    {
      username: "testUser",
      password: bcrypt.hashSync('testPass', 10),
      role_id: 2
    },
    {
      username: "Quark",
      password: bcrypt.hashSync('odosmells', 10),
      role_id: 1
    }
  ])

  //Marketplace database

  await knex('Stores').truncate()
  await knex('Offers').truncate()
  await knex('Products').truncate()
  await knex('Categories').truncate()

  await knex('Stores').insert([
    {store_name: 'Local Market', user_id: 1}, {store_name: 'Quarks', user_id: 3}, {store_name: 'International Local Market', user_id:1}    
  ])
  await knex('Offers').insert([
    {store_id: 2, product_id: 2, price: '10.99'}, {store_id: 1, product_id: 3, price: '3.99'}, {store_id: 1, product_id: 1, price: '1.99'}
  ])
  await knex('Products').insert([
    {product_name: 'Milk', cat_id: 3}, {product_name: 'Chicken', cat_id: 2}, {product_name: 'Leek', cat_id: 1}
  ])
  await knex('Categories').insert([
    {cat_name: 'Produce'}, {cat_name: 'Meat'}, {cat_name: 'Dairy'}
  ])
};
