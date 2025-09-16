import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Hook dùng trong toàn app
export const useAuth = () => useContext(AuthContext);
