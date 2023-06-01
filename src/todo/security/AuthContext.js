// Create a context
// Put some state in the context
// share the context with other components

import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationAPIService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  // function login(username, password) {
  //   if (username === "Oriade" && password === "dummy") {
  //     setAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   }
  //   setAuthenticated(false);
  //   setUsername(null);
  //   return false;
  // }

  // async function login(username, password) {
  //   const bAToken = "Basic " + window.btoa(username + ":" + password);
  //   const response = await executeBasicAuthenticationService(bAToken);
  //   // .then((response) => console.log(response))
  //   // .catch((error) => console.error(error));

  //   try {
  //     if (response.status === 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(bAToken);
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("Intercepting and adding a token");
  //         config.headers.Authorization = bAToken;
  //         return config;
  //       });
  //       return true;
  //     }
  //     logout();
  //     return false;
  //   } catch (error) {
  //     logout();
  //   }
  // }

  async function login(username, password) {
    const response = await executeJwtAuthenticationService(username, password);
    // .then((response) => console.log(response))
    // .catch((error) => console.error(error));

    try {
      const jwtToken = `Bearer ${response.data.token}`;
      console.log(jwtToken);
      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        apiClient.interceptors.request.use((config) => {
          console.log("Intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      }
      logout();
      return false;
    } catch (error) {
      logout();
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
