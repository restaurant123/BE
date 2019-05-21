const faker = require("faker");
const bcrypt = require("bcrypt");
const moment = require("moment");

const getUsers = () => {
  let users = [];
  let amountOfUsers = 5;
  for (let i = 0; i < amountOfUsers; i++) {
    let user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "password",
      address: faker.address.streetAddress(),
      city: "Manhattan",
      state: "New York",
      zipCode: 14025,
      created_at: moment(faker.date.recent()).format("YYYY-MM-DD HH:mm:ss")
    };
    users.push(user);
  }
  return users;
};

exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(getUsers());
    });
};
