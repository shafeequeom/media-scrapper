import axios from "../utils/request";

export const getTotal = async () => {
  return await axios.get("scrap/media/total", {});
};

export const getScrapPagination = async (page, perPage, type, search) => {
  let url = `?perPage=${perPage}`;
  if (type !== "all") {
    url += `&type=${type}`;
  }
  if (search) {
    url += `&search=${search}`;
  }
  return await axios.get(`scrap/medias/${page}${url}`, {});
};

export const scrapMedia = async (urls) => {
  return await axios.post(`scrap/urls`, { urls });
};
