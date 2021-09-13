import React, { createContext, useContext } from "react";
import jwtDecode from "jwt-decode";
// Descomente para relizar as requizições na API
// import { apiAxios } from "../services/axios";

export const TOKEN = "@app:token";

export const AuthContext = createContext({});

const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  const exp = JSON.parse(JSON.stringify(decoded)).exp;
  return exp > currentTime;
};

export const isAuthenticated = () => {
  const token = sessionStorage.getItem(TOKEN);
  // Descomente se já estiver recebendo um token válido da API
  // return token && isValidToken(token);
  return !!token;
};

// export default function AuthProvider({ children }: Children) {
//   const login = async (params) => {
//     // Com a API definida descomente o trecho abaixo para fazer a solicitação do token de acesso
//     // const { token } = await apiAxios("/login", params);
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
//     setSession(token);
//     return !!token;
//   };

//   const setSession = async (token) => {
//     if (token) {
//       sessionStorage.setItem(TOKEN, token);
//     } else {
//       sessionStorage.removeItem(TOKEN);
//     }
//   };

//   const logout = () => {
//     setSession(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         login,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

export const useAuth = () => {
  return useContext(AuthContext);
};