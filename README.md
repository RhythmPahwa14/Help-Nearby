# Help Nearby

A community-driven platform that connects people who need help with nearby volunteers. Built with React and Node.js/Express backend with MongoDB.

**Live Demo:** [Help Nearby](https://help-nearby.vercel.app)  
**Frontend Repo:** https://github.com/RhythmPahwa14/Help-Nearby  
**Backend Repo:** https://github.com/RhythmPahwa14/Help-Nearby-Backend

## Features

- **Post Help Requests** - Create requests for various categories (Medical, Transport, Groceries, Household, General)
- **Browse Requests** - View all active help requests with category filtering
- **Interactive Map** - See all requests and your location on an interactive Leaflet map
- **Offer Help** - Connect with people in need by offering your contact details
- **User Authentication** - Secure login/register with JWT authentication
- **Location-Based** - Geospatial queries to find nearby requests
- **Responsive Design** - Beautiful UI with Tailwind CSS that works on all devices

## Tech Stack

### Frontend
- React 18
- React Router v6
- Leaflet + React-Leaflet (Maps)
- Tailwind CSS 3
- Axios for API calls

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Geospatial Queries (MongoDB 2dsphere)
- bcryptjs for password hashing

## Prerequisites

- Node.js 18+ and npm
- MongoDB 4.4+

## Getting Started

### Backend Setup

1. Clone and navigate to backend
```powershell
git clone https://github.com/RhythmPahwa14/Help-Nearby-Backend.git
cd Help-Nearby-Backend
npm install
```

2. Create `.env` file
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/help-nearby
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start MongoDB and run backend
```powershell
# Start MongoDB service
net start MongoDB

# Run backend
npm run dev
```

Backend runs at http://localhost:5000

### Frontend Setup

1. Clone and navigate to frontend
```powershell
git clone https://github.com/RhythmPahwa14/Help-Nearby.git
cd Help-Nearby
npm install
```

2. Create `.env.local` file
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

3. Start the app
```powershell
npm start
```

App runs at http://localhost:3000

## Project Structure

### Frontend
```
src/
├── components/          # Reusable UI components
│   ├── ProtectedRoute.js
│   └── RequestCard.js
├── context/             # React contexts
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   └── BackgroundContext.js
├── pages/               # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── HelpRequest.js
│   ├── ViewRequests.js
│   └── MapView.js
├── services/            # API services
│   └── api.js
├── App.js
└── index.js
```

### Backend
```
├── config/              # Configuration files
│   └── db.js           # MongoDB connection
├── controllers/         # Route controllers
│   ├── authController.js
│   ├── helpRequestController.js
│   └── userController.js
├── middleware/          # Custom middleware
│   └── auth.js         # JWT authentication
├── models/              # Mongoose models
│   ├── User.js
│   └── HelpRequest.js
├── routes/              # API routes
│   ├── auth.js
│   ├── helpRequests.js
│   ├── locations.js
│   └── users.js
└── server.js           # Entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Help Requests
- `GET /api/help-requests` - Get all requests
- `POST /api/help-requests` - Create request
- `GET /api/help-requests/nearby` - Get nearby requests
- `PUT /api/help-requests/:id` - Update request
- `DELETE /api/help-requests/:id` - Delete request
- `POST /api/help-requests/:id/offer-help` - Offer help with contact details
- `PUT /api/help-requests/:id/accept` - Accept request
- `PUT /api/help-requests/:id/complete` - Complete request
- `PUT /api/help-requests/:id/rate` - Rate completed request

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/nearby-helpers` - Find nearby helpers

## Data Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: Enum ['user', 'helper', 'admin'],
  location: {
    type: Point,
    coordinates: [longitude, latitude],
    address: String
  },
  profilePicture: String,
  rating: Number,
  totalHelps: Number
}
```

### Help Request Schema
```javascript
{
  user: ObjectId (ref: User),
  title: String,
  description: String,
  category: Enum ['medical', 'emergency', 'transport', 'food', 'shelter', 'assistance', 'other'],
  priority: Enum ['low', 'medium', 'high', 'critical'],
  location: {
    type: Point,
    coordinates: [longitude, latitude],
    address: String
  },
  status: Enum ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
  helper: ObjectId (ref: User),
  helpOffers: [{
    user: ObjectId,
    name: String,
    phone: String,
    email: String,
    message: String,
    offeredAt: Date
  }],
  rating: Number,
  feedback: String
}
```

## Deployment

### Backend (Vercel/Railway/Render)
1. Set environment variables in deployment platform
2. Deploy with MongoDB Atlas connection string

### Frontend (Vercel)
1. Build Command: `npm run build`
2. Output Directory: `build`
3. Set `REACT_APP_API_BASE_URL` to your backend URL
4. Keep `.npmrc` with `legacy-peer-deps=true` for compatibility

## Features in Detail

### Offer Help Modal
- Users can offer help by providing contact details (name, phone, email, message)
- Request owners receive multiple help offers
- Clean modal UI with validation

### Interactive Map
- Auto-fits bounds to show all markers
- User location marker (green)
- Category-specific colored markers
- Popup with request details
- Category filtering

### Request Categories
- General
- Groceries
- Medical
- Transport
- Household

## Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Production build
- `npm test` - Run tests

### Backend
- `npm start` - Start production server
- `npm run dev` - Start with nodemon (development)

## Troubleshooting

### Frontend
- **npm ERESOLVE errors**: Keep `.npmrc` with `legacy-peer-deps=true`
- **TypeScript version**: Pinned to 4.9.5 for CRA compatibility
- **Map not loading**: Check network access to OpenStreetMap tiles

### Backend
- **MongoDB connection**: Ensure MongoDB is running and connection string is correct
- **Port conflicts**: Change PORT in `.env` if 5000 is occupied
- **JWT errors**: Verify JWT_SECRET is set in environment

## License

ISC

## Author

**Rhythm Pahwa**
- GitHub: [@RhythmPahwa14](https://github.com/RhythmPahwa14)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

For questions or support, please open an issue in the repository.



