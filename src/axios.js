import axios from "axios";
//
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//on each request checking token and adding the token
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default instance;
