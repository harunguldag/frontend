import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";

export const isAuthenticated = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return false;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    return tokenExpiration > now;
};