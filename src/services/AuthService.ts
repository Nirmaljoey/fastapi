import axios from "axios";


class AuthService {
  static async login(email: string, password: string): Promise<boolean> {
    try {
      console.log("Sending Login Request...");
      await axios.post(
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

      console.log(" Login successful, extracting tokens from cookies...");
      const accessToken = AuthService.getCookie("accessToken");
      const refreshToken = AuthService.getCookie("refreshToken");

      if (!accessToken || !refreshToken) {
        console.error(" Missing access or refresh token in cookies.");
        return false;
      }

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      console.log(" Both tokens stored in localStorage successfully.");
      return true;
    } catch (error: any) {
      console.error(" API Error:", error);
      throw new Error(error.response?.data?.error || "Login failed. Please try again.");
    }
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    return !!token;
  }

  static async getUserProfile(): Promise<any> {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found. Please log in.");

      const response = await axios.get("/api/marketplace/auth/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error(" Failed to fetch user profile:", error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn(" No access token found, already logged out.");
        return;
      }

      await axios.delete("/api/marketplace/auth/users/tokens", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }).catch((error) => {
        console.warn(" Server logout failed (might be expected):", error.response?.status);

      });


      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      console.log(" Logout successful (local cleanup done)");
    } catch (error) {
      console.error(" Unexpected logout error:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  static getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key.trim() === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
}

export default AuthService;