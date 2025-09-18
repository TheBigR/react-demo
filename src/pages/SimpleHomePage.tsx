import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export function SimpleHomePage() {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to React Demo
          </h1>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Hello, <strong>{user?.name}</strong>! You are successfully logged in.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 mb-2">User Information</h3>
                <p className="text-blue-700">
                  <strong>Name:</strong> {user?.name}
                </p>
                <p className="text-blue-700">
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/users"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Manage Users
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                This is a full-stack React application with JWT authentication and user management.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ JWT Authentication with protected routes</li>
            <li>✅ User management (CRUD operations)</li>
            <li>✅ React Query for server state management</li>
            <li>✅ TypeScript for type safety</li>
            <li>✅ Error handling and loading states</li>
            <li>✅ Responsive design with Tailwind CSS</li>
            <li>✅ API client with interceptors</li>
            <li>✅ Context-based authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
