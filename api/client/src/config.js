import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://riteshbankmanagement.herokuapp.com/api/user/",
});
