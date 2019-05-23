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

async function addRestaurant(restaurant) {
  const [id] = await db("restaurants").insert(restaurant, "id");

  return findRestaurantById(id);
}
function removeRestaurant(id) {
  return db("restaurants")
    .where({ id })
    .del();
}

function updateRestaurant(id, changes) {
  return db("restaurants")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findRestaurantById(id);
      } else {
        return null;
      }
    });
}

module.exports = {
  findRestaurant,
  getRestaurant,
  findRestaurantById,
  removeRestaurant,
  updateRestaurant,
  addRestaurant
};
