import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cloudinary from '../src/config/cloudinary.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// ✅ Aap ki images ka path (client/public/images/rose/)
const IMAGES_PATH = path.join(__dirname, '../../client/public/images/rose');

const uploadAllImages = async () => {
    console.log('🚀 Uploading images to Cloudinary...');
    
    if (!fs.existsSync(IMAGES_PATH)) {
        console.error(`❌ Folder not found: ${IMAGES_PATH}`);
        return;
    }

    const files = fs.readdirSync(IMAGES_PATH);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

    if (imageFiles.length === 0) {
        console.log('⚠️ No image files found.');
        return;
    }

    console.log(`📂 Found ${imageFiles.length} images.`);

    const results = [];
    let count = 0;

    for (const file of imageFiles) {
        const filePath = path.join(IMAGES_PATH, file);
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'bloombouquet',
                resource_type: 'image',
                transformation: [
                    { width: 400, height: 400, crop: 'fill' },
                    { quality: 'auto' }
                ]
            });
            count++;
            console.log(`✅ [${count}/${imageFiles.length}] ${file} → ${result.secure_url}`);
            results.push({ file, url: result.secure_url });
        } catch (error) {
            console.error(`❌ ${file} failed:`, error.message);
        }
    }

    console.log(`\n✅ Upload complete! ${count} images uploaded.`);
    
    // URLs ko file mein save karein
    const outputPath = path.join(__dirname, '../../cloudinary-urls.txt');
    const outputData = results.map(r => `${r.file}: ${r.url}`).join('\n');
    fs.writeFileSync(outputPath, outputData);
    console.log(`\n📄 URLs saved to: ${outputPath}`);
};

uploadAllImages().catch(console.error);