import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  [key: string]: any;
}

class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/auth/users/tokens`, 
        { email, password }, 
        { withCredentials: true }
      );

      const { accessToken, refreshToken, userId } = response.data;

      // Store tokens and user details
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user_id', userId);

      console.log('Login successful:', response.data);
      window.location.href = "/personal-account/profile"; // Redirect to profile page

      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_id');

      console.log('Logout successful');
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  static getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  static getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
}

export default AuthService;
