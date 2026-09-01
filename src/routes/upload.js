import express from 'express';
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController.js';
import { upload } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Single image upload (Admin only)
router.post('/single', protect, authorize('Admin'), upload.single('image'), uploadImage);

// Multiple images upload (Admin only)
router.post('/multiple', protect, authorize('Admin'), upload.array('images', 10), uploadMultipleImages);

export default router;