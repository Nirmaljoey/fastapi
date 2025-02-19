import axios from 'axios';
import {
  UserRegistrationData,
  UserResponseData,
  VerificationResponseData,
  BaseApiResponse,
} from './types';
import { handleApiError } from './apiUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Register User
export const registerUser = async (payload: UserRegistrationData) => {
  try {
    const response = await axios.post<BaseApiResponse & { data: UserResponseData }>(
      '/api/auth/users', // Now correctly maps to /api/marketplace/auth/users
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Registration failed');
  }
};

// Verify Email
export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get<BaseApiResponse & { data: VerificationResponseData }>(
      `${API_BASE_URL}/auth/users/verify-email/${token}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Email verification failed');
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get<BaseApiResponse & { data: UserResponseData }>(
      `${API_BASE_URL}/auth/users/me`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch user data');
  }
};

// Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/marketplace/auth/users/tokens`, {
      email,
      password,
    }, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Login failed');
  }
};
