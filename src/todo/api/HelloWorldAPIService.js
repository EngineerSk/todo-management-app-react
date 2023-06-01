import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = () => {
  return apiClient.get("/hello-world");
};

export const retrieveHelloWorldPathVariable = (username, token) => {
  return apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
      Authorization: token,
    },
  });
};
