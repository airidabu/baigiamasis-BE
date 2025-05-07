const Review = require("../models/reviewModel");

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("book", "name").populate("user", "name surname");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate("book", "name").populate("user", "name surname");
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewsByBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviews = await Review.find({ book: bookId })
            .populate("user", "name surname")
            .populate("book", "name");

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createReview = async (req, res) => {
    try {
        const review = new Review({
            ...req.body,
            user: req.user.id,
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this review" });
        }
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByBookId,
    createReview,
    updateReview,
    deleteReview
};