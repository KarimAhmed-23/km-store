import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){

 const [userToken, setUserToken] = useState(null);
 const [userId , setUserId]=useState(null);
 const [userData , setUserData]=useState(null);
 const token = localStorage.getItem("token");


 useEffect(()=>{

    if(token) {
      setUserToken(token);
      setUserData(localStorage.getItem("userData"));
      try {
         const {id} = jwtDecode(token);
         setUserId(id);
      } catch (error) {
         console.log(error);
      }
      
      
    }

 } , []);

 return <AuthContext.Provider value={{userToken , setUserToken , userId , userData , setUserData}}>

    {children}

 </AuthContext.Provider>


}