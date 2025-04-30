const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });

process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
        process.exit(0);
    } catch (error) {
        console.error("Error closing MongoDB connection:", error.message);
        process.exit(1);
    }
});