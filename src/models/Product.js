import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    occasion: { type: String },
    description: { type: String },
    image: { type: String },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    colors: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;