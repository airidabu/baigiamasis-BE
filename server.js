const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const process = require("process");
require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./api/userEndpoints");
const bookRoutes = require("./api/bookEndpoints");
const genreRoutes = require("./api/genreEndpoints");

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/genres", genreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});