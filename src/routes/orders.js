// import express from 'express';
// import Order from '../models/Order.js';
// import { protect, authorize } from '../middleware/auth.js';

// const router = express.Router();

// // ===== ADMIN ROUTES =====
// router.get('/admin/all', protect, authorize('Admin'), async (req, res) => {
//     console.log('✅ Admin orders route hit!');
//     try {
//         const orders = await Order.find()
//             .populate('user', 'name email')
//             .sort({ createdAt: -1 });
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error('❌ Orders fetch error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // ===== USER ROUTES =====
// router.post('/', protect, async (req, res) => {
//     try {
//         const order = await Order.create({ ...req.body, user: req.user._id });
//         res.status(201).json({ success: true, order });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// router.get('/my-orders', protect, async (req, res) => {
//     try {
//         const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// router.put('/:id/status', protect, authorize('Admin'), async (req, res) => {
//     try {
//         const { status } = req.body;
//         const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
//         if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
//         res.json({ success: true, order });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// export default router;


import express from 'express';
import Order from '../models/Order.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// ===== ADMIN ROUTES =====
router.get('/admin/all', protect, authorize('Admin'), async (req, res) => {
    console.log('🔍 Admin fetch all orders');
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        console.log(`✅ Found ${orders.length} orders`);
        res.json({ success: true, orders });
    } catch (error) {
        console.error('❌ Orders fetch error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id/status', protect, authorize('Admin'), async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ===== USER ROUTES =====
router.post('/', protect, async (req, res) => {
    console.log('📦 Create order for user:', req.user._id);
    try {
        const order = await Order.create({ ...req.body, user: req.user._id });
        console.log('✅ Order created:', order._id);
        res.status(201).json({ success: true, order });
    } catch (error) {
        console.error('❌ Order creation error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;