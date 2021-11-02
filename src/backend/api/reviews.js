const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reviews = await knex("reviews");
        response.send(reviews);
    } catch (error) {
        throw error
    }
});

router.post("/", async (request, response) => {
    try {
        await knex("reviews").insert(request.body);
        response.status(201).json("Review has been added");
    } catch (error) {
        throw error
    }

});

router.get("/:id", async (request, response) => {
    try {
        const reviewId = parseInt(request.params.id);

        if (isNaN(reviewId)) {
            response.status(400).json("id must be an integer");
            return;
        }

        const reviewById = await knex("reviews")
            .where("id", reviewId);
        response.json(reviewById);

    } catch (error) {
        throw error;
    }
});

router.put("/:id", async (request, response) => {
    try {
        const reviewId = parseInt(request.params.id);

        if (isNaN(reviewId)) {
            response.status(400).json("id must be an integer");
            return;
        }

        await knex("reviews").where("id", reviewId).update(request.body);
        response.status(201).send("Review has been updated");

    } catch (error) {
        throw error;
    }
});

router.delete("/:id", async (request, response) => {
    try {

        const reviewId = parseInt(request.params.id);

        if (isNaN(reviewId)) {
            response.status(400).json("id must be an integer");
            return;
        }
        await knex("reviews").where("id", reviewId).del();
        response.status(201).send("Review successfully deleted");

    } catch (error) {
        throw error;
    }
});



module.exports = router;