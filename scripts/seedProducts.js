import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import Product from '../src/models/Product.js';

// DNS fix
dns.setServers(['8.8.8.8', '1.1.1.1']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Not loaded');

// ========== ✅ COMPLETE PRODUCTS ARRAY ==========
const products = [
    // ===== WEDDING =====
    {
        name: "Elegant White Rose Wedding Bouquet",
        price: 25200,
        discountPrice: 19600,
        category: "Wedding",
        occasion: "Wedding",
        rating: 4.9,
        reviews: 234,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886043/bloombouquet/jqwc7h5vw7wahtfqlwlj.jpg",
        description: "Beautiful white rose bouquet with eucalyptus leaves, perfect for weddings.",
        stock: 25,
        isFeatured: true,
        colors: ["White", "Green"],
    },
    {
        name: "Romantic Red Rose Bridal Bouquet",
        price: 28000,
        discountPrice: 22400,
        category: "Wedding",
        occasion: "Wedding",
        rating: 4.8,
        reviews: 189,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886044/bloombouquet/j9boe5qggb0vzx5kdaab.jpg",
        description: "Stunning red rose bouquet with baby's breath, for the perfect bridal look.",
        stock: 20,
        isFeatured: true,
        colors: ["Red", "White"],
    },
    {
        name: "Blush Pink Wedding Peony Bouquet",
        price: 30800,
        discountPrice: 25200,
        category: "Wedding",
        occasion: "Wedding",
        rating: 4.9,
        reviews: 156,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886045/bloombouquet/lg002ibunhsqgewxa3bj.jpg",
        description: "Soft pink peonies with dusty miller for a romantic wedding look.",
        stock: 18,
        isFeatured: false,
        colors: ["Pink", "Green"],
    },
    {
        name: "Cascading Wedding Rose Bouquet",
        price: 36400,
        discountPrice: 28000,
        category: "Wedding",
        occasion: "Wedding",
        rating: 4.8,
        reviews: 134,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886046/bloombouquet/peyfkyympbucdqldahau.jpg",
        description: "Elegant cascading roses with trailing greenery, a dramatic bridal bouquet.",
        stock: 15,
        isFeatured: false,
        colors: ["White", "Green"],
    },
    {
        name: "Rustic Wedding Sunflower Bouquet",
        price: 22400,
        discountPrice: 18200,
        category: "Wedding",
        occasion: "Wedding",
        rating: 4.7,
        reviews: 98,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886047/bloombouquet/ocasfa12dmhgnes3yokx.jpg",
        description: "Bright sunflowers with lavender and eucalyptus for a rustic wedding theme.",
        stock: 22,
        isFeatured: false,
        colors: ["Yellow", "Purple", "Green"],
    },
    {
        name: "Ivory & Gold Wedding Lily Bouquet",
        price: 33600,
        discountPrice: 26600,
        category: "Wedding",
        occasion: "Wedding",
        rating: 4.9,
        reviews: 112,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886048/bloombouquet/hhirqwn5lcdtdoqza7cx.jpg",
        description: "Ivory lilies with gold accents for a luxurious wedding celebration.",
        stock: 20,
        isFeatured: false,
        colors: ["White", "Gold"],
    },

    // ===== BIRTHDAY =====
    {
        name: "Happy Birthday Sunshine Bouquet",
        price: 16800,
        discountPrice: 14000,
        category: "Birthday",
        occasion: "Birthday",
        rating: 4.7,
        reviews: 156,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886051/bloombouquet/p3hcwslq7rgfke8hzchf.jpg",
        description: "Bright yellow and orange flowers to make someone's birthday special.",
        stock: 35,
        isFeatured: true,
        colors: ["Yellow", "Orange"],
    },
    {
        name: "Birthday Surprise Mixed Flowers",
        price: 19600,
        discountPrice: 15400,
        category: "Birthday",
        occasion: "Birthday",
        rating: 4.6,
        reviews: 132,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886052/bloombouquet/izrvbtzcoxn8uaxerptr.jpg",
        description: "Colorful mixed flower bouquet with a birthday card included.",
        stock: 40,
        isFeatured: false,
        colors: ["Mixed"],
    },
    {
        name: "Vibrant Birthday Tulip Bouquet",
        price: 18200,
        discountPrice: 15400,
        category: "Birthday",
        occasion: "Birthday",
        rating: 4.8,
        reviews: 98,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886053/bloombouquet/wht7uneez5svsrf7rppj.jpg",
        description: "Beautiful tulips in vibrant colors perfect for birthday celebrations.",
        stock: 30,
        isFeatured: false,
        colors: ["Pink", "Yellow", "Red"],
    },

    // ===== ANNIVERSARY =====
    {
        name: "Classic Red Rose Anniversary Bouquet",
        price: 22400,
        discountPrice: 18200,
        category: "Anniversary",
        occasion: "Anniversary",
        rating: 4.9,
        reviews: 278,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886059/bloombouquet/dxfohtzgvu6v7cnklios.jpg",
        description: "Timeless red roses arranged beautifully for anniversary celebrations.",
        stock: 30,
        isFeatured: true,
        colors: ["Red"],
    },
    {
        name: "Golden Anniversary Lily Bouquet",
        price: 25200,
        discountPrice: 21000,
        category: "Anniversary",
        occasion: "Anniversary",
        rating: 4.8,
        reviews: 198,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886060/bloombouquet/qrifwxogswsb83ve86zj.jpg",
        description: "Elegant golden lilies with premium wrapping for a special anniversary.",
        stock: 22,
        isFeatured: false,
        colors: ["Gold", "White"],
    },

    // ===== LOVE =====
    {
        name: "Romantic Love Rose & Tulip Bouquet",
        price: 19600,
        discountPrice: 15700,
        category: "Love",
        occasion: "Love",
        rating: 4.7,
        reviews: 345,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886067/bloombouquet/pnj9tpbuuyajbo2mjrsx.jpg",
        description: "Beautiful combination of roses and tulips for that special someone.",
        stock: 45,
        isFeatured: true,
        colors: ["Red", "Pink"],
    },
    {
        name: "Pink Peony Love Bouquet",
        price: 21000,
        discountPrice: 16800,
        category: "Love",
        occasion: "Love",
        rating: 4.8,
        reviews: 234,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886067/bloombouquet/jr9walyzqascijepposw.jpg",
        description: "Gorgeous pink peonies arranged with love and care.",
        stock: 28,
        isFeatured: false,
        colors: ["Pink"],
    },

    // ===== SYMPATHY =====
    {
        name: "Peaceful White Lily Sympathy Bouquet",
        price: 18200,
        discountPrice: 15400,
        category: "Sympathy",
        occasion: "Sympathy",
        rating: 4.6,
        reviews: 89,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886075/bloombouquet/n9ptwohmhxrtolitb502.jpg",
        description: "Peaceful white lilies to express sympathy and condolences.",
        stock: 18,
        isFeatured: false,
        colors: ["White"],
    },
    {
        name: "Graceful White & Green Sympathy Bouquet",
        price: 16800,
        discountPrice: 14000,
        category: "Sympathy",
        occasion: "Sympathy",
        rating: 4.5,
        reviews: 76,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886076/bloombouquet/dfknd4c3lbolgcwjkeqa.jpg",
        description: "Elegant white and green arrangement for sympathy and remembrance.",
        stock: 20,
        isFeatured: false,
        colors: ["White", "Green"],
    },

    // ===== PREMIUM =====
    {
        name: "Royal Premium Mixed Bouquet",
        price: 36400,
        discountPrice: 28000,
        category: "Premium",
        occasion: "Luxury",
        rating: 4.9,
        reviews: 456,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886084/bloombouquet/ysrkw4ikuvtdnd0x2mn6.jpg",
        description: "Our premium collection featuring the finest flowers arranged with artistry.",
        stock: 15,
        isFeatured: true,
        colors: ["Mixed"],
    },
    {
        name: "Deluxe Rose & Orchid Bouquet",
        price: 42000,
        discountPrice: 33600,
        category: "Premium",
        occasion: "Luxury",
        rating: 4.9,
        reviews: 321,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886084/bloombouquet/kfwgcdzw2atczg2katha.jpg",
        description: "Luxurious combination of roses and orchids in a premium presentation.",
        stock: 12,
        isFeatured: true,
        colors: ["Purple", "White"],
    },

    // ===== SEASONAL =====
    {
        name: "Spring Blossom Bouquet",
        price: 15400,
        discountPrice: 12600,
        category: "Seasonal",
        occasion: "Seasonal",
        rating: 4.7,
        reviews: 167,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886092/bloombouquet/qmmminyyan62zzqptlvr.jpg",
        description: "Fresh spring flowers celebrating the beauty of the season.",
        stock: 50,
        isFeatured: true,
        colors: ["Pink", "Yellow", "White"],
    },
    {
        name: "Summer Sunrise Bouquet",
        price: 16800,
        discountPrice: 14000,
        category: "Seasonal",
        occasion: "Seasonal",
        rating: 4.6,
        reviews: 143,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886093/bloombouquet/ar2yshc8jkimdsvathge.jpg",
        description: "Vibrant summer flowers inspired by the warm sunrise.",
        stock: 38,
        isFeatured: true,
        colors: ["Orange", "Yellow"],
    },
    {
        name: "Autumn Harvest Bouquet",
        price: 18200,
        discountPrice: 15400,
        category: "Seasonal",
        occasion: "Seasonal",
        rating: 4.8,
        reviews: 98,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886093/bloombouquet/eibdfyukdlzqhhohzaxz.jpg",
        description: "Warm autumn colors with seasonal flowers and dried elements.",
        stock: 25,
        isFeatured: false,
        colors: ["Orange", "Brown", "Yellow"],
    },
    {
        name: "Winter Wonderland Bouquet",
        price: 19600,
        discountPrice: 16800,
        category: "Seasonal",
        occasion: "Seasonal",
        rating: 4.9,
        reviews: 112,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886094/bloombouquet/mjxg70k2ireg6fchemad.jpg",
        description: "Elegant white and silver winter flowers with pine accents.",
        stock: 20,
        isFeatured: false,
        colors: ["White", "Silver", "Green"],
    },

    // ===== GRADUATION =====
    {
        name: "Graduation Cap Rose Bouquet",
        price: 19600,
        discountPrice: 16800,
        category: "Graduation",
        occasion: "Graduation",
        rating: 4.8,
        reviews: 45,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886100/bloombouquet/alemhdywwfjynmrktkwq.jpg",
        description: "Celebrate the graduate with a stunning rose bouquet topped with a mini graduation cap.",
        stock: 30,
        isFeatured: true,
        colors: ["Red", "White"],
    },
    {
        name: "Class of 2024 Mixed Flowers",
        price: 22400,
        discountPrice: 18200,
        category: "Graduation",
        occasion: "Graduation",
        rating: 4.7,
        reviews: 38,
        image: "https://res.cloudinary.com/dvsurkwnt/image/upload/v1787886101/bloombouquet/j7zxnwllcnejhc6qaq6v.jpg",
        description: "Colorful mixed flowers with a 'Class of 2024' ribbon, perfect for graduation day.",
        stock: 25,
        isFeatured: true,
        colors: ["Yellow", "Orange", "Red"],
    },
];

// ===== SEED FUNCTION =====
const seedProducts = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        await Product.deleteMany({});
        console.log('🗑️ Existing products cleared');

        const inserted = await Product.insertMany(products);
        console.log(`✅ ${inserted.length} products seeded successfully`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedProducts();