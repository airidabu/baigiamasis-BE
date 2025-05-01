const Status = require("../models/statusModel");
const Book = require("../models/bookModel");

const updateBookStatus = async (req, res) => {
    const { bookId } = req.params;
    const { status, message } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const updatedStatus = await Status.findOneAndUpdate(
            book.status,
            { status, message },
            { new: true, upsert: true, runValidators: true }
        );

        book.status = updatedStatus._id;
        await book.save();
        return res.status(200).json({ message: "Book status updated successfully", book });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    updateBookStatus,
};