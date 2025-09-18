import axios from 'axios';
import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import type { ApiError, LoginRequest, LoginResponse, User, CreateUserRequest, HealthResponse } from '../types';

// Re-export types for convenience
export type { ApiError, LoginRequest, LoginResponse, User, CreateUserRequest, HealthResponse } from '../types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      error: 'An unexpected error occurred',
      statusCode: error.response?.status || 500,
    };

    if (error.response?.data) {
      const data = error.response.data as any;
      apiError.error = data.error || data.message || apiError.error;
      apiError.message = data.message;
    }

    return apiError;
  }

  // Health check
  async healthCheck(): Promise<HealthResponse> {
    const response = await this.client.get<HealthResponse>('/health');
    return response.data;
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  }

  async register(userData: CreateUserRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>('/api/auth/register', userData);
    return response.data;
  }

  // User endpoints
  async getUsers(): Promise<User[]> {
    const response = await this.client.get<User[]>('/api/users');
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response = await this.client.get<User>(`/api/users/${id}`);
    return response.data;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await this.client.post<User>('/api/users', userData);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.client.delete(`/api/users/${id}`);
  }

  // Token management
  setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  removeAuthToken() {
    localStorage.removeItem('auth_token');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
