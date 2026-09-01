import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        product: { type: String }, // ✅ String – number bhi accept karega
        name: String,
        price: Number,
        quantity: Number,
        image: String,
    }],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;