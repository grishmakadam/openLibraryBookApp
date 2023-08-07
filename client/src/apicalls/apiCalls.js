import axios from "axios";
import {
  addBookUrl,
  base_url,
  bookShelvesUrl,
  books_url,
  checkBookExists,
  ratingsUrl,
  signup,
  updateBook,
  login,
  ratingsUrl,
  signup,
  users_url,
} from "./url";

const api = async (url) => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (e) {
    return false;
  }
};

const backendApi = async (url, data) => {
  console.log("hii");
  try {
    const res = await axios.post(
      url,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials:true}
    );
    console.log(res)
    return res.data;
      } 
   catch (e) {
    console.log(e.message)
    return false;
  }
};

const getApis = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (ex) {
    return false;
  }
};

export const bookDetailsApi = (id) => {
  const url = base_url + id + ".json";
  return api(url);
};

export const bookShelvesUrlApi = (id) => {
  const url = base_url + id + bookShelvesUrl;
  return api(url);
};

export const ratingsUrlApi = (id) => {
  const url = base_url + id + ratingsUrl;
  return api(url);
};

export const addBookApi = (data) => {
  console.log(data);
  const url = books_url + addBookUrl;
  return backendApi(url, data);
};

export const adduserApi = (data) => {
  const url = users_url + signup;
  return backendApi(url, data);
};

export const bookExists = (id, bookId) => {
  const url = books_url + checkBookExists + id + "?bookId=" + bookId;
  return getApis(url);
};

const patchApis = async (url, data) => {
  try {
    const res = await axios.patch(
      url,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (ex) {
    return false;
  }
};
export const updateBookApi = (id, data) => {
  const url = books_url + updateBook + id;
  return patchApis(url, data);
};
export const loginApi=(data)=>{
  const url=users_url+login
  return backendApi(url,data)
}
