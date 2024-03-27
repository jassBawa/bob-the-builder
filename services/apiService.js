import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL; // Assuming backend URL in .env.local

export const login = async (userData) => {
  try {
    const response = await axios.post(baseURL + "/login", userData);
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(baseURL + "/signup", userData);
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};
