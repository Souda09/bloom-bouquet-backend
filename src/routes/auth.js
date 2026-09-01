import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// ===== AUTH ROUTES =====
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

// ===== PROFILE UPDATE ROUTE (User Dashboard) =====
router.put('/profile', protect, async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        
        // Update user fields
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { 
                name: name || req.user.name,
                phone: phone || '',
                address: address || '',
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ 
            success: true, 
            user: updatedUser 
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Failed to update profile' 
        });
    }
});

// ===== GET USER ORDERS =====
import Order from '../models/Order.js';

router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Orders fetch error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Failed to fetch orders' 
        });
    }
});

export default router;