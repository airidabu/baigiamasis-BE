const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const process = require("process");
const dbConnection = require("./db");
const cors = require("cors");

const app = express();

dbConnection.once("open", () => {
    console.log("Starting Express server...");

    app.use(cors());
    app.use(express.json());

    const userRoutes = require("./api/userEndpoints");
    const bookRoutes = require("./api/bookEndpoints");
    const genreRoutes = require("./api/genreEndpoints");
    const reviewRoutes = require("./api/reviewEndpoints");
    const publisherRoutes = require("./api/publisherEndpoints");
    const statusRoutes = require("./api/statusEndpoints");

    app.use("/users", userRoutes);
    app.use("/books", bookRoutes);
    app.use("/genres", genreRoutes);
    app.use("/reviews", reviewRoutes);
    app.use("/publishers", publisherRoutes);
    app.use("/status", statusRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});