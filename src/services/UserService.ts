import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      withCredentials: true, //
    });
    return response.data;
  } catch (error) {
    console.error(" Error fetching user data:", error);
    return null;
  }
};
