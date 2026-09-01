import cloudinary from '../config/cloudinary.js';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Upload single image
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Upload to Cloudinary
        const result = await cloudinaryV2.uploader.upload(dataURI, {
            folder: 'bloombouquet', // Main folder
            resource_type: 'image',
            transformation: [
                { width: 400, height: 400, crop: 'fill' },
                { quality: 'auto' }
            ]
        });

        res.status(200).json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Upload multiple images (bulk)
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        const uploadPromises = req.files.map(async (file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            
            const result = await cloudinaryV2.uploader.upload(dataURI, {
                folder: `bloombouquet/${file.originalname.split('/')[0] || 'general'}`,
                resource_type: 'image',
                transformation: [
                    { width: 400, height: 400, crop: 'fill' },
                    { quality: 'auto' }
                ]
            });
            
            return {
                originalName: file.originalname,
                url: result.secure_url,
                publicId: result.public_id,
            };
        });

        const results = await Promise.all(uploadPromises);
        res.status(200).json({ success: true, images: results });
    } catch (error) {
        console.error('Bulk upload error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};