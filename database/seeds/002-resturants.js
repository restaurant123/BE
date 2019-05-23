const faker = require("faker");

const getRestaurants = () => {
  let restaurants = [];
  let amountOfRestaurants = 35;
  for (let i = 0; i < amountOfRestaurants; i++) {
    let image =`https://source.unsplash.com/900x9${i+50}/?dinner`
    let num1 = Math.floor(Math.random() * (12 - 1) + 1)
    let num2 = Math.floor(Math.random() * (12 - 1) + 1)

    let restaurant = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      image_url: image, 
      summary: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      openDay: faker.date.weekday(),
      closeDay: faker.date.weekday(),
      openHours: num1,
      closeHours: num2,
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
