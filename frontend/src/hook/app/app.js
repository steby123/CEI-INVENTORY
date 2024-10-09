import { useState } from "react";
import { useLocation } from "react-router-dom";

export const AppHook = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const hideNavbar = location.pathname === '/Logout' || location.pathname === '/login' || location.pathname === '/register-make-by-steby' || location.pathname === '*';
  

    return{
        isAuthenticated,
        setIsAuthenticated,
        hideNavbar
    }
}