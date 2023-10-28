import axios from "axios";

//Utils
import { getToken } from "../utils/Token/tokenUtils";

//env
const apiUrl = process.env.REACT_APP_API_URL;

export const returnCycleById = async (adminId, cycleId) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${apiUrl}/admins/${adminId}/cycles/${cycleId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    return await response.data;
  } catch (error) {
    throw new Error({ errorEnPantalla: error });
  }
};

export const putCycle = async (adminId, cycleId, data) => {
  try {
    const token = getToken();
    const response = axios.put(
      `${apiUrl}/admins/${adminId}/cycles/${cycleId}`,
      data,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error({ errorEnPantalla: error });
  }
};
