import axios from "axios";

import { SOCKET_END_POINT } from "./config";

export const api = axios.create({
  baseURL: SOCKET_END_POINT,
  headers: {
    "Content-Type": "application/json",
  },
});
