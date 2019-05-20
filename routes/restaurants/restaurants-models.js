const db = require("../../database/dbConfig.js");

function findRestaurant() {
  return db("restaurants").select("id", "address", "description");
}

function getRestaurant(restaurants) {
  return db("restaurants");
}

function findRestaurantById(id) {
  return db("restaurants")
    .where({ id })
    .first();
}

module.exports = {
  findRestaurant,
  getRestaurant,
  findRestaurantById
};
