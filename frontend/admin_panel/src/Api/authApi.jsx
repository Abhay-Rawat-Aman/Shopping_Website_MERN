import axios from "axios";

const BASE_URL = "http://localhost:4000/api/admin";

export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const LoginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
  
    console.log("Raw response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const fetchUsername = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/username/${userId}`, {
      withCredentials: true,
    });
    console.log("Username response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching username:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const logout = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllProducts`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getPoductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getProductById/${productId}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateProduct/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};