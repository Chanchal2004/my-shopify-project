import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock order data - will be replaced with API call
  const mockOrderData = {
    orderId: 'CC-2024-001',
    productName: 'Premium Cotton T-Shirt',
    customerName: 'John Doe',
    phone: '9876543210',
    address: '123 Main Street, Delhi - 110001',
    size: 'L',
    quantity: 1,
    total: 699,
    orderDate: '2024-01-15',
    paymentMethod: 'COD',
    status: 'shipped',
    tracking: [
      { status: 'pending', date: '2024-01-15', message: 'Order placed successfully' },
      { status: 'confirmed', date: '2024-01-15', message: 'Order confirmed by merchant' },
      { status: 'packed', date: '2024-01-16', message: 'Order packed and ready for dispatch' },
      { status: 'shipped', date: '2024-01-17', message: 'Order shipped via courier' },
      { status: 'delivered', date: '', message: 'Order delivered' }
    ]
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchTerm === '9876543210' || searchTerm === 'CC-2024-001') {
        setOrderData(mockOrderData);
      } else {
        setOrderData(null);
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, isActive: boolean) => {
    const iconClass = `h-6 w-6 ${isActive ? 'text-green-500' : 'text-gray-300'}`;
    
    switch (status) {
      case 'pending':
        return <Clock className={iconClass} />;
      case 'confirmed':
      case 'packed':
        return <Package className={iconClass} />;
      case 'shipped':
        return <Truck className={iconClass} />;
      case 'delivered':
        return <CheckCircle className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  const getStatusIndex = (status: string) => {
    const statuses = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];
    return statuses.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600">
            Enter your phone number or order ID to track your order status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter phone number or order ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order #{orderData.orderId}</h2>
                  <p className="opacity-90">Ordered on {new Date(orderData.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    orderData.status === 'delivered' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-purple-600'
                  }`}>
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium">{orderData.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{orderData.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{orderData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium">{orderData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold text-purple-600">₹{orderData.total}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600 block">Customer:</span>
                      <span className="font-medium">{orderData.customerName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Phone:</span>
                      <span className="font-medium">{orderData.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Address:</span>
                      <span className="font-medium">{orderData.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Tracking</h3>
                <div className="space-y-4">
                  {orderData.tracking.map((track, index) => {
                    const currentStatusIndex = getStatusIndex(orderData.status);
                    const trackStatusIndex = getStatusIndex(track.status);
                    const isActive = trackStatusIndex <= currentStatusIndex;
                    const isCompleted = trackStatusIndex < currentStatusIndex;

                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          isActive 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 bg-gray-50'
                        }`}>
                          {getStatusIcon(track.status, isActive)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className={`text-sm font-medium ${
                                isActive ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {track.message}
                              </p>
                              {track.date && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(track.date).toLocaleDateString()} at{' '}
                                  {new Date(track.date).toLocaleTimeString()}
                                </p>
                              )}
                            </div>
                            {isCompleted && (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTerm && !orderData && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
            <p className="text-gray-600">
              We couldn't find an order with the provided phone number or order ID.
              Please check and try again.
            </p>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact us at <strong>support@chanchalscloset.com</strong> or call{' '}
            <strong>+91 9311316223</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;