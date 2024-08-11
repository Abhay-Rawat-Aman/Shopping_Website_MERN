import axios from "axios";

const BASE_URL = "http://localhost:4000/api/admin";

export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData ,{
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const LoginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData ,{
        withCredentials: true
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const logout = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, userData ,{
        withCredentials : true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
