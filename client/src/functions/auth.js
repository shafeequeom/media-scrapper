import axios from "../utils/request";

export const login = async () => {
  return await axios.post("login");
};

export const register = async () => {
  return await axios.post("register", {});
};

export const currentUser = async () => {
  return await axios.post("user", {});
};
