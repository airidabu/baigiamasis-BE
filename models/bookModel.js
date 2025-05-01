const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A book must have a name"],
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A book must have an author"]
    },
    description: {
        type: String,
        trim: true
    },
    releaseDate: {
        type: Date,
        required: [true, "A book must have a release date"]
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        required: [true, "A book must have a publisher"]
    },
    genres: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Genre",
        required: [true, "A book must have at least one genre"]
    },
    pageNumber: {
        type: Number,
        required: [true, "A book must have a page number"],
        min: [1, "Page number must be at least 1"]
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: [true, "A book must have a status"]
    }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;