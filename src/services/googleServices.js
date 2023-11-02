import axios from "axios";

//env
const apiUrl = process.env.REACT_APP_API_URL;

export const loginGoogleService = async (credentialResponse) => {
  try {
    const response = await axios.post(
      `${apiUrl}/admins/google-login-custom-btn`,
      {
        response: credentialResponse,
      }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const signUpGoogleService = async (credentialResponse) => {
  try {
    const response = await axios.post(
      `${apiUrl}/admins/google-register-custom-btn`,
      {
        response: credentialResponse,
      }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
