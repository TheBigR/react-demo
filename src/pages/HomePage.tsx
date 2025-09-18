import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';
// Remove config import since we're using direct env access

export function HomePage() {
  const { user } = useAuthContext();
  const [healthStatus, setHealthStatus] = useState<string>('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await apiClient.healthCheck();
        setHealthStatus(response.status);
      } catch (error) {
        setHealthStatus('Backend not available');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to React Demo
          </h1>
          <p className="text-gray-600 mb-4">
            This is a full-stack application demonstrating best practices for React + TypeScript + Node.js integration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">User Information</h3>
              <p className="text-blue-700">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="text-blue-700">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-900 mb-2">Backend Status</h3>
              <p className="text-green-700">
                <strong>Status:</strong> {healthStatus}
              </p>
              <p className="text-green-700">
                <strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:4000'}
              </p>
            </div>
          </div>
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
