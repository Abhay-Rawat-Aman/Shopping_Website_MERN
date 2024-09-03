import axios from "axios";

const BASE_URL = "/api/admin";

export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllProducts`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error details:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getProductById = async (productId) => {
  try {
    if (!productId) throw new Error('Product ID is required');
    
    const response = await axios.get(
      `${BASE_URL}/getProductById/${productId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

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