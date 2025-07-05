import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import QRCode from 'qrcode.react';

// Mock product data - will be replaced with API call
const mockProduct = {
  _id: '1',
  name: 'Premium Cotton T-Shirt',
  price: 699,
  image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
  images: [
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg'
  ],
  description: 'Comfortable and stylish premium cotton t-shirt perfect for casual wear. Made from 100% pure cotton with superior stitching quality.',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'White', 'Navy', 'Gray'],
  rating: 4.5,
  reviews: 123,
  allowCOD: true,
  stock: 15,
  category: 'T-Shirts'
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(mockProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const upiId = "9311316223@paytm";
  const upiUrl = `upi://pay?pa=${upiId}&am=${product.price * quantity}&cu=INR&tn=Payment for ${product.name}`;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Here you would typically send the order data to your backend
    const orderData = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      ...orderForm,
      total: product.price * quantity,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Order Data:', orderData);
    alert('Order placed successfully! You will receive a confirmation shortly.');
    setShowOrderForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                      selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-purple-600">₹{product.price}</span>
                {product.allowCOD && (
                  <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Truck className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">COD Available</span>
                  </div>
                )}
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className={`font-medium ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                </span>
              </div>

              {/* Order Button */}
              <button
                onClick={() => setShowOrderForm(true)}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Order Now' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Form */}
                  <div>
                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Complete Address *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={orderForm.address}
                          onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderForm.pincode}
                          onChange={(e) => setOrderForm({...orderForm, pincode: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Payment Method *
                        </label>
                        <div className="space-y-2">
                          {product.allowCOD && (
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={orderForm.paymentMethod === 'cod'}
                                onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                                className="text-purple-600 focus:ring-purple-500"
                              />
                              <span className="ml-2">Cash on Delivery (COD)</span>
                            </label>
                          )}
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="upi"
                              checked={orderForm.paymentMethod === 'upi'}
                              onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                              className="text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2">UPI Payment</span>  
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                      >
                        Confirm Order - ₹{product.price * quantity}
                      </button>
                    </form>
                  </div>

                  {/* QR Code & Order Summary */}
                  <div className="space-y-6">
                    {orderForm.paymentMethod === 'upi' && (
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Scan to Pay</h3>
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                          <QRCode 
                            value={upiUrl}
                            size={200}
                            level="M"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          UPI ID: {upiId}
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Product:</span>
                          <span>{product.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span>{selectedSize || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Color:</span>
                          <span>{selectedColor || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span>{quantity}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>₹{product.price * quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;