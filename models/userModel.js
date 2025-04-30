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
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: value => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: ({ value }) => {
                return `${value} is not a valid email address!`;
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'author', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;