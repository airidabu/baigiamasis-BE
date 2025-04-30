const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    roles: {
        type: [String],
        enum: ['user', 'author', 'admin'],
        default: ['user']
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;