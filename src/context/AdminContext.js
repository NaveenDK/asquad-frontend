import { createContext, useState, useEffect } from "react";

//services
import { fetchAdminData } from "../services/adminServices";
import { useCallback } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const storedAdminId = localStorage.getItem("adminId"); // Check if adminId is stored in localStorage
  const [adminId, setAdminId] = useState(storedAdminId || "");
  const [adminName, setAdminName] = useState("");

  const fetchAdministratorData = useCallback(async () => {
    const data = await fetchAdminData(adminId);
    setAdminName(data);
  }, [adminId]);

  useEffect(() => {
    fetchAdministratorData();
  }, [fetchAdministratorData]);

  return (
    <AdminContext.Provider value={{ adminId, setAdminId, adminName }}>
      {children}
    </AdminContext.Provider>
  );
};
