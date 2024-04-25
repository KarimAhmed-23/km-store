import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function InverseProtectedRote({ children }) {

  const userToken = localStorage.getItem("token");
  return userToken ? <Navigate to={"/"} replace={true} /> : children ;

}

export default InverseProtectedRote;
