const express = require("express");
const { getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;