import { useAuthStore } from "@/state/auth";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL; // Assuming backend URL in .env.local

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

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

export const createOrganization = async (orgData) => {
  try {
    const response = await axios.post(baseURL + "/applicationForm", orgData);
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};

export const getOrganisationInfo = async (OrgId) => {
  try {
    const response = await axios.get(baseURL + "/getFormDetails/" + OrgId);
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};

export const GetProfile = async () => {
  try {
    const response = await axios.get(baseURL + "/getFormDetails");
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};

export const updateProfile = async (values) => {
  try {
    const response = await axios.put(baseURL + "/updateForm", values);
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};

export const buildingFetcher = async () => {
  try {
    const response = await axios.get(baseURL + "/getBuildings");
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};

export const createBuilding = async () => {
  try {
    const response = await axios.post(baseURL + "/buildingForm");
    return response.data; // Assuming successful response contains data
  } catch (error) {
    console.log(error);
    throw error.response?.data.message || error; // Re-throw for handling in the component
  }
};
