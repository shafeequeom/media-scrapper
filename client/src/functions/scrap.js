import axios from "../utils/request";

export const getTotal = async () => {
  return await axios.get("scrap-total", {});
};

export const getScrapPagination = async (page) => {
  return await axios.get(`scraps/${page}`, {});
};

export const scrapMedia = async (urls) => {
  return await axios.post(`scraps`, { urls });
};
