import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const AdminProvider = ({ children }) => {
  const storedAdminId = localStorage.getItem("adminId"); // Check if adminId is stored in localStorage
  const [adminId, setAdminId] = useState(storedAdminId || "");
  const [adminName, setAdminName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
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
          setAdminName(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminData();
  }, [adminId]);
  return (
    <AdminContext.Provider value={{ adminId, setAdminId, adminName }}>
      {children}
    </AdminContext.Provider>
  );
};
