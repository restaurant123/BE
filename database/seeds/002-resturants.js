const faker = require("faker");

const getRestaurants = () => {
  let restaurants = [];
  let amountOfRestaurants = 15;
  for (let i = 0; i < amountOfRestaurants; i++) {
    let restaurant = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      image_url: faker.image.food(),
      description: faker.lorem.paragraph(),
      city: "Manhattan",
      state: "New York",
      zipCode: 14025
    };
    restaurants.push(restaurant);
  }
  return restaurants;
};

exports.seed = function(knex) {
  return knex("restaurants")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("restaurants").insert(getRestaurants());
    });
};
