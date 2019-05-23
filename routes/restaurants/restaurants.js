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

// Post request to add new restaurant --> /restaraurants 
restaurantsRouter.post("/", restricted, (req, res) => {
  const restaurant = req.body;
  if (
    !restaurant ||
    !restaurant.name ||
    !restaurant.description ||
    !restaurant.address ||
    !restaurant.city ||
    !restaurant.state ||
    !restaurant.zipCode
  ) {
    return res.status(400).json({
      message: "Please fill out all the information needed for added restaurant.",
      status: 400
    });
  }
  db.addRestaurant(restaurant)
    .then(restaurant => {
      if (restaurant) {
        res.status(201).json({ restaurant });
      } else {
        throw { message: "Something went wrong", status: 500 };
      }
    })
    .catch(err => {
      console.log(err);
      if (err.message.includes("restaurant.name")) {
        return res.status(400).json({
          message:
            "Restaurant with that name already exists",
          status: 400
        });
      }
      res
        .status(err.status || 500)
        .json({ message: err.message, status: err.status || 500 });
    });
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

// Put request to edit restaurant
restaurantsRouter.put("/:id", restricted, async (req, res) => {
  const restaurant = req.body;
  try {
    const { id } = req.params;
    const editRestaurant = await db.updateRestaurant(id, restaurant);
    editRestaurant
      ? res.status(200).json({ id: editRestaurant.id })
      : res.status(404).json({
          message: "The restaurant with the specified ID does not exist."
        });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The restaurant information could not be modified."
    });
  }
});

module.exports = restaurantsRouter;
