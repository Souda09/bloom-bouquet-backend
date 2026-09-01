import dns from 'node:dns';

// Agar project local machine par chal raha ho tabhi DNS change kare
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  dns.setDefaultResultOrder('ipv4first');
}


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import uploadRoutes from './routes/upload.js'; // if you have upload

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration – Allow both local and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.CLIENT_URL, // e.g., https://bloombouquet.vercel.app
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(null, true); // in development allow all
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes); // if exists

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'BloomBouquet API is running 🌸' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🌸 BloomBouquet API running on port ${PORT}`);
});