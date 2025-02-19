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
    const response = await axios.post<BaseApiResponse & { data: UserResponseData }>( `${API_BASE_URL}/marketplace/auth/users`, // Now correctly maps to /api/marketplace/auth/users
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
      `${API_BASE_URL}/marketplace/auth/users/verify-email/${token}`, // ✅ Fixed endpoint
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
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get<BaseApiResponse & { data: UserResponseData }>(
      `${API_BASE_URL}/marketplace/auth/users/me`, // ✅ Fixed endpoint
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return response.data.data; // ✅ Ensures only `data` is returned
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch user data');
  }
};

// Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post<BaseApiResponse & { data: { token: string } }>(
      `${API_BASE_URL}/marketplace/auth/users/tokens`,
      { email, password },
      { withCredentials: true }
    );

    const token = response.data?.data?.token;
    if (token) {
      localStorage.setItem('authToken', token); // ✅ Store token securely
    } else {
      throw new Error('Token missing in response');
    }

    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Login failed');
  }
};