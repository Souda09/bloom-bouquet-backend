 // Middleware to check if user has required role
export const authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user role is included in the allowed roles array
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};
