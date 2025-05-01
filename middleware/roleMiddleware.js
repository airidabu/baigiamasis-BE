const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({ message: "Access denied. No role found" });
        }
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    };
};

module.exports = roleMiddleware;