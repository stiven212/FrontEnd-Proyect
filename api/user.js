import api from "./api";

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
  forgot:(data) => {
    return api.post("/forgot-password", data);
  }
};

export default User;
