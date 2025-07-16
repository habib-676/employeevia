import axios from "axios";

// upload image and return image url
export const imageUpload = async (image) => {
  const imageFormData = new FormData();
  imageFormData.append("image", image);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  );

  return data?.data?.display_url;
};

// save or update user in db :
export const setUserInDb = async (user) => {
  const { data } = axios.post(`${import.meta.env.VITE_API_URL}/users`, user);
  console.log(data);
};

// work related apis

export const addWork = (workData) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/works`, workData);
};

export const getWorks = async (email) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/works/${email}`);
};

export const updateWork = (id, data) => {
  return axios.put(`${import.meta.env.VITE_API_URL}/works/${id}`, data);
};

export const deleteWork = (id) => {
  return axios.delete(`${import.meta.env.VITE_API_URL}/works/${id}`);
};

export const getEmployees = async () => {
  return await axios(`${import.meta.env.VITE_API_URL}/employees`);
};

// payment api
export const addPaymentReq = async (request) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/payments`, request);
};
