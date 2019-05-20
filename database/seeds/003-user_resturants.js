const faker = require("faker");
const bcrypt = require("bcrypt");
const moment = require("moment");

exports.seed = function(knex) {
  return knex("user_restaurants")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_restaurants").insert([
        {
          user_id: 1,
          restaurant_id: 1
        }
      ]);
    });
};
