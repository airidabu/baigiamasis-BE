const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;