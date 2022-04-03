import axios from "axios";

const baseURL =
  (typeof process.env.REACT_APP_API_ADDRESS != "undefined"
    ? process.env.REACT_APP_API_ADDRESS
    : "http://localhost:8000") + "/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      console.log(error);
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
