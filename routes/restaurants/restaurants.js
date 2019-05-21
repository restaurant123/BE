const restaurantsRouter = require("express").Router();
const db = require("./restaurants-models.js");
const restricted = require("../../api/restricted");

/**
 * @api {get} /restaurants       Get all active restaurants.
 * @apiVersion 1.0.0
 * @apiName GetAllRestaurants
 * @apiGroup Restaurants
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.get('/restaurants');
 *
 *
 * @apiUse Error
 *
 * @apiSuccessExample Restaurant Data
 *
 [
  {
    "id": 1,
    "name": "Schmidt, Kirlin and Ledner",
    "address": "315 Keeling Brooks",
    "image_url": "http://lorempixel.com/640/480/food",
    "description": "Pariatur sunt voluptatem. Et architecto eos. Qui nulla perspiciatis dignissimos incidunt.",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025,
    "visited": 0
  },
  {
    "id": 2,
    "name": "Hilpert, Rolfson and Klein",
    "address": "671 Labadie Radial",
    "image_url": "http://lorempixel.com/640/480/food",
    "description": "Est modi rerum. Ea eum vel. Maxime velit est iure autem enim est veritatis dolor.",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025,
    "visited": 0
  },
 *
 */

// Get all restaurants in the city --> /restaurants
restaurantsRouter.get("/", restricted, async (req, res) => {
  try {
    const user = await db.getRestaurant();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the restaurants" });
  }
});

/**
 * @api {get} /restaurants       Get restaurant by id.
 * @apiVersion 1.0.0
 * @apiName GetRestaurantByID
 * @apiGroup Restaurants
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.get('/restaurants/1');
 *
 * @apiParam {Number} id    Restaurant id.

 * @apiUse Error
 *
 * @apiSuccessExample Restaurant Data
 *
 [
  {
    "id": 1,
    "name": "Schmidt, Kirlin and Ledner",
    "address": "315 Keeling Brooks",
    "image_url": "http://lorempixel.com/640/480/food",
    "description": "Pariatur sunt voluptatem. Et architecto eos. Qui nulla perspiciatis dignissimos incidunt.",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025,
    "visited": 0
  }
 *
 */

// Get restaurant by id --> /restaurants/:id
restaurantsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await db.findRestaurantById(id);
    restaurant.id
      ? res.status(200).json(restaurant)
      : res
          .status(404)
          .json({ message: "Could not find restaurant by that ID" });
    console.log(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Ran into an error retrieving data" });
    console.log(error);
  }
});

/**
 * @api {delete} /restaurants/:id      Delete restaurant by id.
 * @apiVersion 1.0.0
 * @apiName DeleteRestaurant
 * @apiGroup Restaurants
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.get('/restaurants/1');
 *
 * @apiParam {Number} id    Restaurant id.

 * @apiUse Error
 *
 *
 *
 */

// Delete request to delete restaurant --> /:id
restaurantsRouter.delete("/:id", async (req, res) => {
  try {
    const restaurant = await db.removeRestaurant(req.params.id);
    restaurant > 0
      ? res.status(204).end()
      : res.status(404).json({
          message: "The restaurant with the specified ID does not exist."
        });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The restaurant could not be removed"
    });
  }
});

module.exports = restaurantsRouter;
