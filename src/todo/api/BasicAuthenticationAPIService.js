import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) => {
  return apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
};
