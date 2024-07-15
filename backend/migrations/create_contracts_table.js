exports.up = function(knex) {
  return knex.schema.createTable('contracts', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.date('sign_date').notNullable();
    table.date('expiry_date').notNullable();
    table.string('parties').notNullable();
    table.string('summary').notNullable();
    table.enu('status', ['ativo', 'inativo']).defaultTo('ativo');
    table.string('filename').notNullable();
    table.string('path').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.table('contracts');
};