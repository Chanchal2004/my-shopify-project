import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chanchalscloset');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Schemas
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [String],
  description: { type: String, default: '' },
  sizes: [String],
  colors: [String],
  stock: { type: Number, default: 0 },
  allowCOD: { type: Boolean, default: true },
  category: { type: String, default: 'T-Shirts' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'upi'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  status: { type: String, enum: ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: '' }
}, { timestamps: true });

const blockedPincodeSchema = new mongoose.Schema({
  pincode: { type: String, required: true, unique: true },
  reason: { type: String, default: 'Delivery not available' }
}, { timestamps: true });

// Models
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);
const BlockedPincode = mongoose.model('BlockedPincode', blockedPincodeSchema);

// Utility function to generate order ID
const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CC-${year}${month}${day}-${random}`;
};

// Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    let products = Product.find(query);
    
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          products = products.sort({ price: 1 });
          break;
        case 'price-high':
          products = products.sort({ price: -1 });
          break;
        case 'name':
          products = products.sort({ name: 1 });
          break;
        case 'newest':
          products = products.sort({ createdAt: -1 });
          break;
      }
    }
    
    const result = await products.exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new product (admin only)
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product (admin only)
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product (admin only)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place order
app.post('/api/orders', async (req, res) => {
  try {
    // Check if pincode is blocked
    const blockedPincode = await BlockedPincode.findOne({ pincode: req.body.pincode });
    if (blockedPincode) {
      return res.status(400).json({ error: 'Delivery not available in this area' });
    }
    
    // Check product stock
    const product = await Product.findById(req.body.productId);
    if (!product || product.stock < req.body.quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    
    // Create order
    const orderData = {
      ...req.body,
      orderId: generateOrderId()
    };
    
    const order = new Order(orderData);
    await order.save();
    
    // Update product stock
    await Product.findByIdAndUpdate(req.body.productId, {
      $inc: { stock: -req.body.quantity }
    });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders (admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track order
app.get('/api/orders/track/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let order;
    
    // Check if identifier is order ID or phone number
    if (identifier.startsWith('CC-')) {
      order = await Order.findOne({ orderId: identifier });
    } else {
      order = await Order.findOne({ phone: identifier }).sort({ createdAt: -1 });
    }
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin)
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add review
app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    
    // Update product rating
    const reviews = await Review.find({ productId: req.body.productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(req.body.productId, {
      rating: avgRating,
      reviews: reviews.length
    });
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get reviews for a product
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Blocked pincodes management
app.get('/api/blocked-pincodes', async (req, res) => {
  try {
    const blockedPincodes = await BlockedPincode.find();
    res.json(blockedPincodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blocked-pincodes', async (req, res) => {
  try {
    const blockedPincode = new BlockedPincode(req.body);
    await blockedPincode.save();
    res.status(201).json(blockedPincode);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/blocked-pincodes/:pincode', async (req, res) => {
  try {
    await BlockedPincode.findOneAndDelete({ pincode: req.params.pincode });
    res.json({ message: 'Pincode unblocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chanchal\'s Closet API is running' });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;