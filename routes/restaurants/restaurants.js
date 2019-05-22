const restaurantsRouter = require("express").Router();
const db = require("./restaurants-models.js");
const restricted = require("../../api/restricted");

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
