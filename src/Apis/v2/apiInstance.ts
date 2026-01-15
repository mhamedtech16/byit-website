import axios from "axios";

import { BASE_END_POINT } from "./config";

export const api = axios.create({
  baseURL: BASE_END_POINT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token 1ad9233b707971b:92db521bebec4fc`,
  },
});
