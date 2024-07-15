exports.up = function(knex) {
    return knex.schema.table('contracts', function(table) {
      table.text('preview');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('contracts', function(table) {
      table.dropColumn('preview');
    });
  };
  