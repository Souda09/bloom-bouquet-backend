 
import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Route accessible only by Admin users
router.get('/admin/dashboard', 
    protect,        // First verify authentication
    authorize('Admin'), // Then check if user has Admin role
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Welcome to Admin Dashboard',
            user: req.user
        });
    }
);

// Route accessible by all authenticated users
router.get('/dashboard', 
    protect,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Welcome to User Dashboard',
            user: req.user
        });
    }
);

export default router;