import axios from "axios";
import randomJokeParameters from "./types";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_CHUCK_NORRIS_BASE_URL;

const endpoints = {
  jokes: {
    random: (amount?: number) => {
      if (amount === undefined) return "/jokes/random";
      return `/jokes/random/${amount}`;
    },
  },
  categories: "/categories",
};

const getData = async (endpoint: string, params: randomJokeParameters) => {
  try {
    const response = await axiosClient.get(endpoint, {
      params: params,
    });
    const responseData = response.data;

    if (responseData.type !== "success") throw new Error("response failed");
    return { status: "ok", data: responseData.value };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        return { status: "error", data: err.response.data };
      } else if (err.request) {
        return { status: "error", data: err.request.data };
      } else return { status: "error", data: err.message };
    }
    return { status: "error", data: err };
  }
};

export { getData, endpoints };
