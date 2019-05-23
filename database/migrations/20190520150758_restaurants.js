exports.up = function(knex) {
  return knex.schema.createTable("restaurants", tbl => {
    tbl.increments();
    tbl
      .text("name")
      .unique()
      .notNullable();
    tbl.text("address").notNullable();
    tbl.text("image_url");
    tbl.text("summary");
    tbl.text("takeout").defaultTo("yes");
    tbl.text("delivery").defaultTo("no")
    tbl.text("description");
    tbl.text("openDay");
    tbl.text("closeDay");
    tbl.integer("openHours").defaultTo(10)
    tbl.integer("closeHours").defaultTo(11)
    tbl.text("city").notNullable();
    tbl.text("state").notNullable();
    tbl.integer("zipCode").notNullable();
    tbl.integer("visited").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurants");
};
