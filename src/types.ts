// All types in one file to avoid import issues
export interface ApiError {
  error: string;
  statusCode: number;
  message?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export interface CreateUserRequest {
  email: string;
  name: string;
}

export interface HealthResponse {
  status: string;
}
