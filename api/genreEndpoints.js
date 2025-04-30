const express = require("express");
const { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre } = require("../controllers/genreController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllGenres);
router.get("/:id", getGenreById);
router.post("/", authMiddleware, createGenre);
router.put("/:id", authMiddleware, updateGenre);
router.delete("/:id", authMiddleware, deleteGenre);

module.exports = router;