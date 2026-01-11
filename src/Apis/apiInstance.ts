import axios from "axios";

import { BASE_END_POINT } from "./config";

export const api = axios.create({
  baseURL: BASE_END_POINT,
  headers: {
    "Content-Type": "application/json",
  },
});
