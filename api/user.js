import api from "./api";
import { authFetch } from "../utils/fetch";

const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
      role: "ROLE_USER",
    });
  },
  login: (data) => {
    return api.post("/login", data);
  },
  logout: () => {
    return api.post("/logout");
  },
  getAuthenticatedUser: () => {
    return api.get("/user");
  },
  forgot: (data) => {
    return api.post("/forgot-password", data);
  },
  me: async (logout) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;
      const result = await authFetch(url, null, logout);
      return result ? result : null;
    } catch (error) {
      console.log(error);
    }
  },
  update: (data) => {
    return api.put("/user", data);
  },
};

export default User;
