const express = require("express");
const { getAllPublishers, getPublisherById, createPublisher, updatePublisher, deletePublisher } = require("../controllers/publisherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllPublishers);
router.get("/:id", getPublisherById);
router.post("/", authMiddleware, createPublisher);
router.put("/:id", authMiddleware, updatePublisher);
router.delete("/:id", authMiddleware, deletePublisher);

module.exports = router;