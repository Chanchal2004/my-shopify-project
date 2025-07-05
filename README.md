<<<<<<< HEAD
# Chanchal's Closet - Complete E-Commerce Platform

A production-ready Meesho-style online clothing store built with React.js, Node.js, Express, and MongoDB. Features modern UI, admin dashboard, QR-based UPI payments, order tracking, and comprehensive management system.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse trendy T-shirts, Kurtis, dresses with advanced filtering
- **QR Code Payments**: Easy UPI payments via QR code scanning
- **COD Option**: Cash on Delivery for selected products
- **Order Tracking**: Real-time order status tracking
- **Review System**: Rate and review products after purchase
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features
- **Product Management**: Add, edit, delete products with stock management
- **Order Management**: View and update order statuses in real-time
- **COD Toggle**: Enable/disable Cash on Delivery per product
- **Pincode Blocking**: Restrict delivery to specific areas
- **Review Monitoring**: View all customer reviews and ratings
- **Dashboard Analytics**: Sales overview and key metrics

## 🛠 Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Payment**: UPI QR Code Integration
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd chanchals-closet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/chanchalscloset
JWT_SECRET=your-super-secret-jwt-key-here
UPI_ID=9311316223@paytm
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Database Setup
Make sure MongoDB is running locally or provide a MongoDB Atlas connection string in the `.env` file.

### 5. Start the Application

**Development Mode:**
```bash
# Start frontend (React)
npm run dev

# Start backend (Express) - in a new terminal
npm run server
```

**Production Mode:**
```bash
npm run build
npm start
```

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `VITE_API_URL=https://your-backend-url.herokuapp.com`
4. Deploy

### Backend (Render/Heroku)
1. Push your code to GitHub
2. Create a new app on Render/Heroku
3. Set environment variables (all variables from `.env`)
4. Deploy

### Database (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string
3. Update `MONGO_URI` in environment variables

## 📁 Project Structure

```
chanchals-closet/
├── src/                     # Frontend React app
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   └── App.tsx             # Main app component
├── server/                 # Backend Express app
│   └── index.js           # Server entry point
├── public/                # Static assets
├── package.json           # Dependencies
└── README.md             # This file
```

## 🎯 Usage Guide

### For Store Owners
1. **Access Admin Panel**: Go to `/admin/login` (credentials: admin/admin123)
2. **Add Products**: Use the Products tab to add new items
3. **Manage Orders**: Monitor and update order statuses
4. **Configure COD**: Toggle Cash on Delivery per product
5. **Block Pincodes**: Restrict delivery to problematic areas

### For Customers
1. **Browse Products**: Visit homepage to see all products
2. **Filter & Search**: Use filters to find specific items
3. **Place Order**: Click product → fill form → choose payment method
4. **Track Order**: Use phone number on `/track-order` page
5. **Leave Review**: Rate products after delivery

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Place new order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/track/:identifier` - Track order by ID or phone
- `PUT /api/orders/:id/status` - Update order status (admin)

### Reviews
- `POST /api/reviews` - Add product review
- `GET /api/reviews/:productId` - Get product reviews

### Utilities
- `GET /api/blocked-pincodes` - Get blocked pincodes
- `POST /api/blocked-pincodes` - Block pincode (admin)
- `DELETE /api/blocked-pincodes/:pincode` - Unblock pincode (admin)

## 🎨 Customization

### Adding New Product Categories
1. Update the categories array in `FilterSidebar.tsx`
2. Add new options in the admin product form
3. Update database schema if needed

### Modifying Payment Methods
1. Update UPI ID in `.env` file
2. Modify QR code generation in `ProductDetail.tsx`
3. Add additional payment options as needed

### Styling Changes
- All styles use Tailwind CSS
- Color scheme: Purple (#8B5CF6), Pink (#EC4899), Orange (#F97316)
- Modify `tailwind.config.js` for theme changes

## 🔒 Security Notes

- Admin authentication is basic (demo purposes)
- Implement proper JWT authentication for production
- Add input validation and sanitization
- Use HTTPS in production
- Implement rate limiting
- Secure MongoDB connection

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Mobile phones (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@chanchalscloset.com
- Phone: +91 9311316223
- WhatsApp: +91 9311316223

## 🔗 Live Demo

- **Frontend**: [Chanchal's Closet](https://chanchalscloset.vercel.app)
- **Admin Panel**: [Admin Dashboard](https://chanchalscloset.vercel.app/admin/login)
- **API**: [Backend API](https://chanchalscloset-api.herokuapp.com)

---

Built with ❤️ for small business owners who want to sell online with style!
=======
# my-shopify-project
>>>>>>> 8d97b10eb378ad2ab1a9884c6b714b82bf41339a
