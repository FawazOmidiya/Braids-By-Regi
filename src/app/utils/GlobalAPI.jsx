const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = () => axiosClient.get("/categories?populate=deep");
const getCategoryById = (id) =>
  axiosClient.get(`/categories/${id}?populate=deep`);
const getStyle = () => axiosClient.get("/styles?populate=*");
const getStyleById = (id) => axiosClient.get(`/styles/${id}?populate=deep`);
const createAppointment = (data) => axiosClient.post(`/appointments`, data);
const getAvailability = () => axiosClient.get(`/availabilities?populate=deep`);
const sendEmail = (data) => axios.post(`/api/sendEmail`, data);
const updateAvailability = (data, id) =>
  axiosClient.put(`/availabilities/${id}`, data);
const deleteAvailability = (id) => axiosClient.delete(`/availabilities/${id}`);

export default {
  getCategory,
  getStyle,
  getCategoryById,
  getStyleById,
  createAppointment,
  getAvailability,
  sendEmail,
  updateAvailability,
  deleteAvailability,
};
