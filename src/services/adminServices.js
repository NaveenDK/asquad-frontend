import axios from "axios";

//Utils
import { getToken } from "../utils/Token/tokenUtils";

//env
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchAdminData = async (adminId) => {
  const token = getToken();
  try {
    if (adminId) {
      // Make an API request to fetch admin data using adminId
      const response = await axios.get(`${apiUrl}/admins/${adminId}`, {
        headers: {
          "x-auth-token": token,
        },
        // Add appropriate headers or authentication if required
      });

      // Assuming the response contains admin's name field
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const postLoginAdminData = async (admin) => {
  try {
    const response = await axios.post(`${apiUrl}/admins/login`, admin);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const postSignUpAdminData = async (admin) => {
  try {
    const response = await axios.post(`${apiUrl}/admins`, admin);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
