exports.up = function(knex) {
  return knex.schema.createTable("restaurants", tbl => {
    tbl.increments();
    tbl
      .text("name")
      .unique()
      .notNullable();
    tbl.text("address").notNullable();
    tbl.text("image_url").notNullable();
    tbl.text("summary");
    tbl.text("takeout").defaultTo("yes");
    tbl.text("delivery").defaultTo("no")
    tbl.text("description").notNullable();
    tbl.text("openDay");
    tbl.text("closeDay");
    tbl.integer("openHour").defaultTo(10)
    tbl.integer("closeHour").defaultTo(11)
    tbl.text("city").notNullable();
    tbl.text("state").notNullable();
    tbl.integer("zipCode").notNullable();
    tbl.integer("visited").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurants");
};
