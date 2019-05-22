const restaurantsRouter = require("express").Router();
const db = require("./restaurants-models.js");
const restricted = require("../../api/restricted");

// Get all restaurants in the city --> /restaurants
restaurantsRouter.get("/", async (req, res) => {
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

// Delete request to delete restaurant --> /:id
restaurantsRouter.delete("/:id", restricted, async (req, res) => {
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
