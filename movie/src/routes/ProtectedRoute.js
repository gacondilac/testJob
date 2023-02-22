import { Navigate, Outlet } from "react-router-dom";
import { DecodeToken } from "../utils/DecodeToken";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
  const cookie = Cookies.get("token");
  var userRole = DecodeToken(cookie).role;

  return userRole !== "Admin" ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoute;
