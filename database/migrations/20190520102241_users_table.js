exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.timestamps(true, true);
    tbl.string("name", 255).notNullable();
    tbl
      .string("email", 255)
      .unique()
      .notNullable();
    tbl.string("password", 128).notNullable();
    tbl.string("address", 255).notNullable();
    tbl.string("city", 255).notNullable();
    tbl.string("state", 255).notNullable();
    tbl.integer("zipCode").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
