exports.up = function(knex) {
  return knex.schema.createTable("restaurants", tbl => {
    tbl.increments();
    tbl
      .string("name", 255)
      .unique()
      .notNullable();
    tbl.string("address", 255).notNullable();
    tbl.string("image_url", 255);
    tbl.string("description", 255);
    tbl.string("city", 255).notNullable();
    tbl.string("state", 255).notNullable();
    tbl.integer("zipCode").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurants");
};