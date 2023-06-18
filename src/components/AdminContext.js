import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const storedAdminId = localStorage.getItem("adminId"); // Check if adminId is stored in localStorage
  const [adminId, setAdminId] = useState(storedAdminId || "");

  // Set the initial value of adminId here
  useEffect(() => {
    console.log("Admin Context was just triggered ");
    const storedAdminId = localStorage.getItem("adminId");
    setAdminId(storedAdminId || "");
  }, []);

  return (
    <AdminContext.Provider value={{ adminId, setAdminId }}>
      {children}
    </AdminContext.Provider>
  );
};
