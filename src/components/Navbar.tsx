import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Package, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Chanchal's Closet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/track-order" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors">
              <Package className="h-4 w-4" />
              <span>Track Order</span>
            </Link>
            <Link to="/admin/login" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/track-order" 
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4" />
                <span>Track Order</span>
              </Link>
              <Link 
                to="/admin/login" 
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;