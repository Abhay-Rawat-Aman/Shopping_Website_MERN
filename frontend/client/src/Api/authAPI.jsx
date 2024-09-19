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

export const addToCart = async (items) => {
    try {
        const response = await axios.post(`${BASE_URL}/addToCart`, items, {
            withCredentials: true,
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error adding to cart:", error);
        return { success: false, message: error.response?.data?.message || "Error adding item to cart" };
    }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/removeFromCart`,
      { userId, productId },
      {
        withCredentials: true,
      }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error removing item from cart",
    };
  }
};

export const getDataFromCart = async (userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/getDataFromCart`,
      { userId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getCategories`, {
      withCredentials: true,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getProductByCategoryId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getProductByCategory/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};