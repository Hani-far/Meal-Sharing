const express = require("express");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
  try {

    if ("maxPrice" in request.query) {
      const maxPrice = parseFloat(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        response.status(400).json({ error: "Maximum price must be an integer" })
        return;
      }
      const mealByPrice = await knex('meals')
        .where("price", "<=", maxPrice)
      response.json(mealByPrice);
      return
    }

    if ("availableReservations" in request.query) {
      let availableReservations = request.query.availableReservations;
      if (availableReservations == "true" || availableReservations == "false") {
        const reservationSign = availableReservations == "true" ? ">" : "<=";
        const filteredMeals = await knex.raw(`select meals.id, meals.title, meals.max_reservations, coalesce(SUM(reservations.number_of_guests), 0) AS made_reservations
    from meals
    left join reservations on meals.id = reservations.meal_id
    group by meals.id
    having meals.max_reservations ${reservationSign} made_reservations`).then(result => response.send(result[0]));

        response.send(filteredMeals);
      }
    }

    if ("title" in request.query) {
      const title = request.query.title.toLowerCase();
      const mealByTitle = await knex("meals")
        .where("meals.title", "like", "%" + title + "%");
      response.json(mealByTitle);
    }

    if ("createdAfter" in request.query) {
      const createdAfter = new Date(request.query.createdAfter);
      if (!createdAfter.getDate()) {
        response.status(400).json({ error: "Date must be a valid date" })
      }
      const mealByDate = await knex("meals")
        .where("created_date", ">=", createdAfter)
      response.json(mealByDate);
    }

    if ("limit" in request.query) {
      const limit = Number(request.query.limit);
      if (isNaN(limit)) {
        response.status(400).send(`Limit should be an integer`)
        return;
      }
      const limitedMeals = await knex("meals").limit(limit);
      response.json(limitedMeals);
    }

    const meals = await knex("meals").select();
    response.json(meals);

  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  console.log(request.body);
  try {
    await knex("meals")
      .insert(request.body)
    response.status(201).json("meal has been added");

  } catch (error) {
    throw error
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);

    if (isNaN(mealId)) {
      response.status(400).json("id must be an integer");
      return;
    }
    const mealById = await knex("meals")
    response.json(mealById);

  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    if (isNaN(mealId)) {
      response.status(400).json("id must be an integer");
      return;
    }

    const selectedMeal = await knex("meals").where("id", mealId).update(request.body);
    if (!selectedMeal) {
      response.status(400).send("Nothing found");
      return;
    }
    response.status(201).send("Meal has been updated");
    // response.json(selectedMeal);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    if (isNaN(mealId)) {
      response.status(400).json("id must be an integer");
      return;
    }

    const selectedMeal = await knex("meals").where("id", mealId).del();
    if (!selectedMeal) {
      response.status(400).send("Nothing found");
      return;
    }
    response.status(201).send(" successfully deleted");

  } catch (error) {
    throw error;
  }
});


module.exports = router;
