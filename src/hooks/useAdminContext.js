import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export const useAdminContext = () => {
  const { adminId, adminName, setAdminId } = useContext(AdminContext);

  return { adminId, adminName, setAdminId };
};
