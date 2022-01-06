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
};

export default User;
