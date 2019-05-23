const faker = require("faker");

const getRestaurants = () => {
  let restaurants = [];
  let amountOfRestaurants = 35;
  for (let i = 0; i < amountOfRestaurants; i++) {
    // let image = `https://lorempixel.com/1000/${i+ 970}/food/`;
    let image =`https://source.unsplash.com/900x9${i+50}/?dinner`

    let restaurant = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      image_url: image, 
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
