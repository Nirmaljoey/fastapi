import axios from "axios";
import {
  UserRegistrationData,
  UserResponseData,
  VerificationResponseData,
  BaseApiResponse,
  AuthTokens,
} from './types';

export const registerUser = async (payload: UserRegistrationData): Promise<BaseApiResponse & { data?: UserResponseData }> => {
  try {
    const response = await axios.post<BaseApiResponse & { data: UserResponseData }>(
      "/api/marketplace/auth/users",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return {
      success: true,
      status: response.status,
      error: null,
      data: response.data.data,
    };
  } catch (error: unknown) {
    const err = error as AxiosError;
    const errorMessage = err.response?.data?.error || 'Registration failed';
    const status = err.response?.status || 500;
    return {
      success: false,
      status,
      error: errorMessage,
    };
  }
};

export const verifyEmail = async (token: string): Promise<BaseApiResponse & { data?: VerificationResponseData }> => {
  try {
    const response = await axios.get<BaseApiResponse & { data: VerificationResponseData }>(
      `/api/marketplace/auth/users/verify-email/${token}`,
      { withCredentials: true }
    );
    return {
      success: true,
      status: response.status,
      error: null,
      data: response.data.data,
    };
  } catch (error: unknown) {
    const err = error as AxiosError;
    const errorMessage = err.response?.data?.error || 'Email verification failed';
    const status = err.response?.status || 500;
    return {
      success: false,
      status,
      error: errorMessage,
    };
  }
};

export const getCurrentUser = async (): Promise<UserResponseData> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get<BaseApiResponse & { data: UserResponseData }>(
      "/api/marketplace/auth/users/me",
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    const errorMessage = err.response?.data?.error || 'Failed to fetch user data';
    throw new Error(errorMessage);
  }
};

export const loginUserFromUserApi = async (email: string, password: string): Promise<BaseApiResponse & { data?: AuthTokens }> => {
  try {
    const response = await axios.post<BaseApiResponse & { data: AuthTokens }>(
      "/api/marketplace/auth/users/tokens",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    const { access_token, refresh_token } = response.data.data;
    if (access_token && refresh_token) {
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    } else {
      throw new Error('Tokens missing in response');
    }

    return {
      success: true,
      status: response.status,
      error: null,
      data: response.data.data,
    };
  } catch (error: unknown) {
    const err = error as AxiosError;
    const errorMessage = err.response?.data?.error || 'Login failed';
    const status = err.response?.status || 500;
    return {
      success: false,
      status,
      error: errorMessage,
    };
  }
};
interface AxiosError {
  response?: {
    data?: { error?: string };
    status?: number;
  };
}