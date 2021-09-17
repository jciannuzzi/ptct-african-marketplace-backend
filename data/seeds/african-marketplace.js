
exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('roles').truncate()

  await knex('roles').insert([
    {role_name: 'owner'},
    {role_name: 'user'}
  ])

  await knex('users').insert([
    {
      username: 'testOwner',
      password: 'testPass',
      role_id: 1
    },
    {
      username: "testUser",
      password: "testPass",
      role_id: 2
    }
  ])
};
