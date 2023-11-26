import React, { useContext } from "react";
import { UserContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex items-center justify-center text-4xl font-semibold text-center">
        <h2>Loading.....</h2>
      </div>
    );
  } else if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default ProtectedRoute;
