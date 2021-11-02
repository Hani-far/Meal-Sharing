const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reservations = await knex("reservations");
        response.send(reservations);
    } catch (error) {
        throw error
    }
});

router.post("/", async (request, response) => {
    try {
        await knex("reservations").insert(request.body);
        response.status(201).json("Reservation has been added");
    } catch (error) {
        throw error
    }

});

router.get("/:id", async (request, response) => {
    try {
        const reservationId = parseInt(request.params.id);

        if (isNaN(reservationId)) {
            response.status(400).json("id must be an integer");
            return;
        }

        const reservationById = await knex("reservations")
            .where("id", reservationId);
        response.json(reservationById);

    } catch (error) {
        throw error;
    }
});

router.put("/:id", async (request, response) => {
    try {
        const reservationID = parseInt(request.params.id);

        if (isNaN(reservationID)) {
            response.status(400).json("id must be an integer");
            return;
        }

        await knex("reservations").where("id", reservationID).update(request.body);
        response.status(201).send("Reservation has been updated");

    } catch (error) {
        throw error;
    }
});

router.delete("/:id", async (request, response) => {
    try {

        const reservationID = parseInt(request.params.id);

        if (isNaN(reservationID)) {
            response.status(400).json("id must be an integer");
            return;
        }
        await knex("reservations").where("id", reservationID).del();


        response.status(201).send("Reservation successfully deleted");

    } catch (error) {
        throw error;
    }
});



module.exports = router;