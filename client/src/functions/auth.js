import axios from "../utils/request";

export const login = async (form) => {
  return await axios.post("login", form);
};

export const register = async (form) => {
  return await axios.post("register", form);
};

export const currentUser = async () => {
  return await axios.post("user", {});
};
