const Publisher = require("../models/publisherModel");

const getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.status(200).json(publishers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPublisherById = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: "Publisher not found" });
        }
        res.status(200).json(publisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPublisher = async (req, res) => {
    try {
        const newPublisher = await Publisher.create(req.body);
        res.status(201).json(newPublisher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePublisher = async (req, res) => {
    try {
        const updatedPublisher = await Publisher.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPublisher) {
            return res.status(404).json({ message: "Publisher not found" });
        }
        res.status(200).json(updatedPublisher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePublisher = async (req, res) => {
    try {
        const deletedPublisher = await Publisher.findByIdAndDelete(req.params.id);
        if (!deletedPublisher) {
            return res.status(404).json({ message: "Publisher not found" });
        }
        res.status(200).json({ message: "Publisher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
};