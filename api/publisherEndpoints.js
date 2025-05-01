const express = require("express");
const { getAllPublishers, getPublisherById, createPublisher, updatePublisher, deletePublisher } = require("../controllers/publisherController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getAllPublishers);
router.get("/:id", getPublisherById);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createPublisher);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updatePublisher);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deletePublisher);

module.exports = router;