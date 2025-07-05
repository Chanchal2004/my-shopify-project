import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

// Mock data - will be replaced with API calls
const mockProducts = [
  {
    _id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 699,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    rating: 4.5,
    reviews: 123,
    allowCOD: true,
    stock: 15,
    category: 'T-Shirts'
  },
  {
    _id: '2',
    name: 'Elegant Cotton Kurti',
    price: 1299,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    rating: 4.8,
    reviews: 89,
    allowCOD: true,
    stock: 8,
    category: 'Kurtis'
  },
  {
    _id: '3',
    name: 'Casual Graphic Tee',
    price: 499,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    rating: 4.3,
    reviews: 67,
    allowCOD: false,
    stock: 22,
    category: 'T-Shirts'
  },
  {
    _id: '4',
    name: 'Designer Party Dress',
    price: 2199,
    image: 'https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg',
    rating: 4.7,
    reviews: 45,
    allowCOD: true,
    stock: 5,
    category: 'Dresses'
  },
  {
    _id: '5',
    name: 'Formal Shirt',
    price: 899,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    rating: 4.4,
    reviews: 78,
    allowCOD: true,
    stock: 12,
    category: 'Shirts'
  },
  {
    _id: '6',
    name: 'Trendy Crop Top',
    price: 599,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    rating: 4.6,
    reviews: 92,
    allowCOD: false,
    stock: 18,
    category: 'T-Shirts'
  }
];

const Home = () => {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000] as [number, number],
    sortBy: 'name',
    category: 'All'
  });

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        // For now, just reverse the array
        filtered.reverse();
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 mr-2" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Chanchal's Closet
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium Fashion at Unbeatable Prices
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Discover our curated collection of trendy T-shirts, elegant Kurtis, and stylish dresses. 
              Shop with confidence - Easy UPI payments & COD available!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button for Mobile */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Results Count */}
            <div className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={setFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;