const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A publisher must have a name"],
        unique: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    establishedYear: {
        type: Number,
        min: [1000, "Year must be a valid 4-digit number"],
        max: [new Date().getFullYear(), "Year cannot be in the future"]
    },
    website: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value);
            },
            message: "Please provide a valid URL"
        }
    }
}, { timestamps: true });

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;