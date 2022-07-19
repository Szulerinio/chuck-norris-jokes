import axios from "axios";
import { RandomJokeParameters, ResponseStatus } from "./types";
import { endpoints } from "../constants";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_CHUCK_NORRIS_BASE_URL;

const getData = async (endpoint: string, params: RandomJokeParameters) => {
  try {
    const response = await axiosClient.get(endpoint, {
      params: params,
    });
    const responseData = response.data;

    if (responseData.type !== "success") {
      throw new Error("response failed");
    }
    return { status: ResponseStatus.Success, data: responseData.value };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        return { status: ResponseStatus.Error, data: err.response.data };
      } else if (err.request) {
        return { status: ResponseStatus.Error, data: err.request.data };
      }
      return { status: ResponseStatus.Error, data: err.message };
    }
    return { status: ResponseStatus.Error, data: err };
  }
};

export { getData, endpoints };
