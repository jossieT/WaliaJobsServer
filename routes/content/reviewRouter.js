const express = require('express');

const {
    addNewReview,
    getAllReviews,
    getSingleReview,
    deleteReview
} = require('../../controllers/content/reviewController');

const reviewRouter = express.Router();

reviewRouter.route("/")
.post(addNewReview)
.get(getAllReviews);

reviewRouter.route("/:id")
.get(getSingleReview)
.delete(deleteReview);

module.exports = reviewRouter;
