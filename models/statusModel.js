const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    message: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;