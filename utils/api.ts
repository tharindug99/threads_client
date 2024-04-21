import { serviceURLs } from "@/constant";
import { Auth } from "@aws-amplify/auth";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: serviceURLs.http,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((session) => {
        const idTokenExpire = session.getIdToken().getExpiration();
        const refreshToken = session.getRefreshToken();
        const currentTimeSeconds = Math.round(+new Date() / 1000);
        if (idTokenExpire < currentTimeSeconds) {
          Auth.currentAuthenticatedUser().then((res) => {
            res.refreshSession(refreshToken, (err: any, data: any) => {
              if (err) {
                Auth.signOut();
              } else {
                if (config.headers) {
                  config.headers.Authorization =
                    "Bearer " + data.getIdToken().getJwtToken();
                }
                resolve(config);
              }
            });
          });
        } else {
          if (config.headers) {
            config.headers.Authorization =
              "Bearer " + session.getIdToken().getJwtToken();
          }
          resolve(config);
        }
      })
      .catch(() => {
        // No logged-in user: don't set auth header
        resolve(config);
      });
  });
});

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      if (response.data instanceof Object) {
        return response;
      }
      return {
        ...response,
        data: JSON.parse(response.data),
      };
    }
    return response;
  },
  (error: AxiosError) => {
    throw error.response?.data;
  }
);

export default api;
