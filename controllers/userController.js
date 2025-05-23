const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const process = require("process");

const User = require("../models/userModel");

const register = async (req, res) => {
    const { name, surname, email, password, birthday } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ message: "Name, surname, email and password fields are required" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:'"\\|,.<>/?]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            birthday
        });

        await newUser.save();
        res.send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                roles: user.role,
                birthday: user.birthday
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.send({ message: "User logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
}

const updateUser = async (req, res) => {
    const { name, surname, email, password, birthday } = req.body;
    const { id } = req.user;

    if (!name || !surname || !email) {
        return res.status(400).json({ message: "Name, surname and email fields are required" });
    }

    const updateData = {
        name,
        surname,
        email,
        birthday
    }

    if (password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:'"\\|,.<>/?]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
            });
        }
        updateData.password = await bcrypt.hash(password, 10);
    }

    try {
        if (req.user.role !== "admin" && req.user.id !== id) {
            return res.status(403).json({ message: "You are not authorized to update this user" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newToken = jwt.sign(
            {
                id: updatedUser._id,
                name: updatedUser.name,
                surname: updatedUser.surname,
                email: updatedUser.email,
                roles: updatedUser.role,
                birthday: updatedUser.birthday
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }

        )
        res.send({ message: "User updated successfully", user: updatedUser, token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user", error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -__v");
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const requestedUserId = req.params.id;
        const currentUserId = req.user.id;
        const userRole = req.user.role;

        if (requestedUserId !== currentUserId && userRole !== "admin") {
            return res.status(403).json({
                message: "Access denied. You can only view your own profile data."
            });
        }

        const user = await User.findById(requestedUserId).select("-password -__v");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
}

module.exports = {
    register,
    login,
    updateUser,
    getAllUsers,
    getUserById
};