# NASA Space Data Explorer 🚀

A full-stack web application that showcases NASA's space data through their public APIs. Built with React frontend and Node.js/Express backend.

## 🌟 Features

- **Astronomy Picture of the Day (APOD)**: View NASA's daily featured space images
- **Mars Rover Photos**: Browse photos taken by NASA's Mars rovers (Curiosity, Opportunity, Spirit, Perseverance)
- **Interactive Controls**: Select dates, rovers, and other parameters
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Data**: Fetches live data from NASA's APIs
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Visual feedback during data fetching

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with functional components and hooks
- **Axios**: HTTP client for API requests
- **CSS3**: Custom styling with gradients and animations
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Axios**: HTTP client for NASA API requests
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Rate Limiting**: API rate limiting protection
- **Environment Variables**: Secure configuration management

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **NASA API Key** (free from https://api.nasa.gov/)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd nasa-space-explorer
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend and backend)
npm run install-all

# Or install individually:
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

### 3. Set Up Environment Variables
```bash
# Copy the example environment file
cd backend
cp .env.example .env

# Edit .env and add your NASA API key
NASA_API_KEY=your_actual_nasa_api_key_here
```

### 4. Run the Application
```bash
# From the root directory, run both frontend and backend
npm run dev

# Or run individually:
# Backend (runs on http://localhost:5000)
npm run server

# Frontend (runs on http://localhost:3000)
npm run client
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## 🔧 Development Process

### Project Structure
```
nasa-space-explorer/
├── frontend/                 # React application
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── server.js        # Express server setup
│   │   ├── routes.js        # API routes
│   │   └── nasaService.js   # NASA API integration
│   ├── .env.example         # Environment variables template
│   └── package.json         # Backend dependencies
├── package.json             # Root package.json for scripts
├── README.md                # This file
└── .gitignore              # Git ignore rules
```

### Key React Concepts Used

1. **Functional Components**: Modern React approach using functions instead of classes
2. **React Hooks**:
   - `useState`: Managing component state
   - `useEffect`: Side effects and lifecycle methods
3. **Props**: Passing data between components
4. **Event Handling**: User interactions (button clicks, form inputs)
5. **Conditional Rendering**: Showing/hiding components based on state
6. **API Integration**: Fetching data from backend

### Backend Architecture

1. **Express Server**: RESTful API with multiple endpoints
2. **Service Layer**: NASA API integration with error handling
3. **Route Handlers**: API endpoint definitions
4. **Middleware**: Security, CORS, rate limiting
5. **Error Handling**: Comprehensive error management

## 📚 API Endpoints

### Backend API Routes

- `GET /api/apod?date=YYYY-MM-DD` - Astronomy Picture of the Day
- `GET /api/mars-photos?rover=curiosity&sol=1000` - Mars Rover Photos
- `GET /api/neo?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Near Earth Objects
- `GET /api/rovers` - Mars Rovers Information
- `GET /health` - Health check endpoint

### NASA APIs Used

1. **APOD API**: Astronomy Picture of the Day
2. **Mars Rover Photos API**: Images from Mars rovers
3. **Near Earth Object API**: Asteroid data
4. **Earth Imagery API**: Satellite imagery

## 🎨 Features Explanation

### For Interview Presentation

**React Concepts Demonstrated:**
- **State Management**: Using `useState` to manage application data
- **Effect Hooks**: Using `useEffect` for component lifecycle
- **Component Architecture**: Breaking down UI into reusable components
- **Props Passing**: Parent-child component communication
- **Event Handling**: Form submissions and button clicks
- **API Integration**: Fetching data from backend API
- **Error Handling**: Managing loading and error states
- **Responsive Design**: Mobile-friendly CSS

**Node.js/Express Concepts:**
- **RESTful API Design**: Clean endpoint structure
- **Middleware Usage**: Security and functionality layers
- **Service Architecture**: Separating business logic
- **Error Handling**: Comprehensive error management
- **Environment Configuration**: Secure credential management

## 🚀 Deployment Options

### Recommended Platforms:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render
- **Full-stack**: Vercel (with API routes), Railway

### Build Commands:
```bash
# Build frontend for production
cd frontend && npm run build

# Backend is ready to deploy as-is
```

## 🔍 Testing the Application

### Manual Testing Steps:
1. **APOD Feature**: Select different dates and verify images load
2. **Mars Photos**: Try different rovers and sol numbers
3. **Error Handling**: Test with invalid inputs
4. **Responsive Design**: Test on different screen sizes
5. **Loading States**: Verify loading indicators work

### API Testing:
```bash
# Test backend endpoints directly
curl http://localhost:5000/health
curl http://localhost:5000/api/apod
curl "http://localhost:5000/api/mars-photos?rover=curiosity&sol=1000"
```

## 🎯 Interview Talking Points

### Technical Decisions:
1. **Why React?** Modern, component-based, excellent ecosystem
2. **Why Express?** Lightweight, flexible, great for APIs
3. **State Management**: Used built-in hooks for simplicity
4. **API Design**: RESTful principles with clear endpoints
5. **Error Handling**: User-friendly error messages
6. **Security**: Helmet, CORS, rate limiting implemented

### Possible Improvements:
- Add caching for better performance
- Implement user authentication
- Add more NASA API endpoints
- Include unit and integration tests
- Add data visualization charts
- Implement offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- NASA for providing free access to their APIs
- React and Node.js communities for excellent documentation
- All contributors to open-source libraries used in this project

---

**Built with ❤️ for space exploration and learning**
