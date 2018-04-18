
exports.up = function(knex, Promise) {
   return knex.schema.createTable('employees', t => {
    t.increments();
    t.string('name');
    t.string('email');
    t.string('animal');
    t.timestamps(true, true);
   });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('employees'); 
};
