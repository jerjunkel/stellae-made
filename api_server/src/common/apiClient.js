import axios from "axios";
import config from "../config/index.js";
const instance = axios.create({
  baseURL: config.API_ENDPOINT,
  timeout: 1000,
  headers: {
    Authorization: config.API_KEY,
    "Content-Type": "application/json",
  },
});

export default instance;
