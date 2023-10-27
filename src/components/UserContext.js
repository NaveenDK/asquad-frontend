import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const UserProvider = ({ children }) => {
  const storedUserId = localStorage.getItem("userId"); // Check if UserId is stored in localStorage
  const [userId, setUserId] = useState(storedUserId || "");
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("token");
    console.log(token);
    const fetchUserData = async () => {
      try {
        if (userId) {
          // Make an API request to fetch User data using UserId
          const response = await axios.get(`${apiUrl}/users/${userId}`, {
            headers: {
              "x-auth-token": token,
            },
            // Add appropriate headers or authentication if required
          });

          // Assuming the response contains User's name field
          setUserName(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);
  return (
    <UserContext.Provider value={{ userId, setUserId, userName }}>
      {children}
    </UserContext.Provider>
  );
};
