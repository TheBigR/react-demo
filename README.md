# React + TypeScript + Vite - Full Stack Demo

A comprehensive full-stack application demonstrating best practices for React + TypeScript + Node.js integration with JWT authentication, user management, and modern development patterns.

## 🚀 Features

- **JWT Authentication** - Secure login/register with protected routes
- **User Management** - Full CRUD operations for user management
- **React Query** - Server state management with caching and synchronization
- **TypeScript** - Full type safety across the application
- **Error Handling** - Comprehensive error boundaries and API error handling
- **Responsive Design** - Modern UI with Tailwind CSS
- **Protected Routes** - Route-level authentication guards
- **API Client** - Axios-based client with interceptors and token management

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx
│   ├── LoadingSpinner.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom hooks
│   ├── useAuth.ts
│   └── useUsers.ts
├── lib/                # Utility libraries
│   └── api.ts          # API client
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── UsersPage.tsx
├── types/              # TypeScript type definitions
│   ├── api.ts
│   └── index.ts
└── config/             # Configuration
    └── env.ts
```

### Backend Integration
The frontend integrates with a Node.js/Express backend running on port 4000 with the following endpoints:

- `GET /health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `DELETE /api/users/:id` - Delete user (protected)

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on port 4000

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Configure environment:**
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:4000
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL` - Backend API URL (default: http://localhost:4000)

### API Client Configuration
The API client (`src/lib/api.ts`) includes:
- Automatic JWT token attachment
- Request/response interceptors
- Error handling with automatic logout on 401
- Configurable timeout and base URL

### React Query Configuration
- Automatic retry on failure
- Stale time configuration
- Cache invalidation strategies
- Optimistic updates for mutations

## 🔐 Authentication Flow

1. **Login/Register** - User provides credentials
2. **JWT Token** - Backend returns JWT token
3. **Token Storage** - Token stored in localStorage
4. **Automatic Attachment** - Token attached to all API requests
5. **Route Protection** - Protected routes check authentication
6. **Token Expiry** - Automatic logout on token expiry

## 📱 Pages and Routes

- `/` - Home page (protected)
- `/login` - Login page (public)
- `/register` - Registration page (public)
- `/users` - User management (protected)

## 🎨 UI Components

- **Layout** - Main application layout with navigation
- **ProtectedRoute** - Route guard for authentication
- **ErrorBoundary** - Global error handling
- **LoadingSpinner** - Reusable loading component

## 🔄 State Management

- **Server State** - React Query for API data
- **Client State** - React Context for authentication
- **Form State** - Local component state
- **Cache Management** - Automatic cache invalidation

## 🧪 Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Error boundaries for error handling

### Best Practices Implemented
- Separation of concerns
- Custom hooks for reusable logic
- Type-safe API integration
- Proper error handling
- Loading states
- Optimistic updates
- Cache management

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application:**
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure environment variables** in your hosting platform

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use meaningful component and function names
3. Add proper error handling
4. Write reusable components
5. Maintain type safety

## 📄 License

This project is for demonstration purposes.