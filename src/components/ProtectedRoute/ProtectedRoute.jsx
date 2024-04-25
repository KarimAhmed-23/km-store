import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  // const { userToken } = useContext(AuthContext);

  const userToken = localStorage.getItem("token");
  try {
   jwtDecode(userToken);
   
 } catch (error) {
     console.log("invalid token")
     localStorage.removeItem("token");
     return <Navigate to={"/login"} replace={true} />;
 }

 

  return !userToken ? <Navigate to={"/login"} /> : children

  
}

export default ProtectedRoute;
