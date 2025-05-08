const mongoose = require("mongoose");
const process = require("process");

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    });

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("🔌 MongoDB disconnected");
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
});

module.exports = mongoose.connection;