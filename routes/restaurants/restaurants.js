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

module.exports = restaurantsRouter;
