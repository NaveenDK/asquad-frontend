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
      console.log({ nuevaprueba: response.data });
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
