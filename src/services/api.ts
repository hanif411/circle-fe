import axios from "axios";

const BASEURL = "https://be-circle-theta.vercel.app/api/v1";

const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.token = token;
    }

    return config;
  }
);

export default api
