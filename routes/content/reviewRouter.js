const express = require('express');

const {
    addNewReview,
    getAllReviews,
    getSingleReview,
    deleteReview
} = require('../../controllers/content/reviewController');
const { userProtect } = require('../../utils/protect');
const reviewRouter = express.Router();

reviewRouter.route("/")
.post(userProtect ,addNewReview)
.get(getAllReviews);

reviewRouter.route("/:id")
.get(getSingleReview)
.delete(userProtect, deleteReview);

module.exports = reviewRouter;
