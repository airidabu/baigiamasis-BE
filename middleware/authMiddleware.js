const jwt = require("jsonwebtoken");
const process = require("process");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Log the error server-side
        res.status(401).json({ message: "Invalid token" }); // Return a generic error message
    }
}

module.exports = authMiddleware;