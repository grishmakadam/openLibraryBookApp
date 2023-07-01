import axios from "axios";
import { base_url, bookShelvesUrl, ratingsUrl } from "./url";

const api = async (url) => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (e) {
    return false;
  }
};

export const bookShelvesUrlApi = (id) => {
  const url = base_url + id + bookShelvesUrl;
  return api(url);
};

export const ratingsUrlApi = (id) => {
  const url = base_url + id + ratingsUrl;
  return api(url);
};
