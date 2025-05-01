const Book = require("../models/bookModel");
const Status = require("../models/statusModel");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate("author", "name surname")
            .populate("genres", "name")
            .populate("publisher", "name")
            .populate({
                path: "status",
                match: { status: "approved" },
            });

        const approvedBooks = books.filter(book => book.status);
        res.status(200).json(approvedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPendingBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate("author", "name surname")
            .populate("genres", "name")
            .populate("publisher", "name")
            .populate("status")
            .where("status")
            .populate({
                path: "status",
                match: { status: "pending" },
            });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("author", "name surname").populate("genres", "name").populate("publisher", "name");
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBook = async (req, res) => {
    try {
        const status = await Status.create({ status: "pending" });
        const book = new Book({
            ...req.body,
            author: req.user.id,
            status: status._id,
        });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getPendingBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};