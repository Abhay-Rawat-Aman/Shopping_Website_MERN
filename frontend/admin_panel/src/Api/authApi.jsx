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
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
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

export const deleteProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/deleteProduct/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/createProduct`,
      productData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating product");
  }
};

export const addVariationType = async (variationTypeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/createVariationType`,
      variationTypeData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating variation type"
    );
  }
};

export const addVariationValue = async (variationValueData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/createVariationValue`,
      variationValueData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating variation value"
    );
  }
};

export const createCategory = async (categoryDetails) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/createCategory`,
      categoryDetails,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating category");
  }
};

export const createBrand = async (brandDetails) => {
  try {
    const response = await axios.post(`${BASE_URL}/createBrand`, brandDetails, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating category");
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getCategories`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating category");
  }
};

export const getCategoryByName = async (CategoryName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getCategoryByName/${CategoryName}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating category");
  }
};

export const getCategoryById = async (CategoryId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getCategoryByName/${CategoryId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating category");
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getBrands`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating Brand");
  }
};

