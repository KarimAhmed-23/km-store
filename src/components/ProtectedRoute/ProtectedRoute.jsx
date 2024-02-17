import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  // const { userToken } = useContext(AuthContext);

  const userToken = localStorage.getItem("token");


  try {
    const decoded = jwtDecode(userToken);
    
  } catch (error) {
    
      // console.log("err");
      localStorage.removeItem("token");
      return <Navigate to={"/login"} />;
  }

  if (!userToken) {
    return <Navigate to={"/login"} />;
  }

 

  return children;

  
}

export default ProtectedRoute;
