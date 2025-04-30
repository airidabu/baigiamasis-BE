const Genre = require('../models/genreModel');

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createGenre = async (req, res) => {
    try {
        const newGenre = await Genre.create(req.body);
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(updatedGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteGenre = async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
};