import axios from "axios";
const baseUrl = "http://api.icndb.com/jokes/random";
const fetchRandomJoke = async (
  firstname?: string,
  lastname?: string,
  category: string[] = []
) => {
  let parameters: any = {
    escape: "javascript",
  };
  if (lastname) {
    parameters.lastName = lastname;
  }
  if (firstname) {
    console.log("firstname", firstname);

    parameters.firstName = firstname;
  }
  if (category?.length > 0) {
    parameters.limitTo = `[${category?.join(",")}]`;
  }

  const response = (await axios(baseUrl, { params: parameters })).data;
  if (response.type !== "success") throw new Error("response failed");
  return response.value;
};

const fetchCategories = async () => {
  const response = (await axios("http://api.icndb.com/categories")).data;
  if (response.type !== "success") throw new Error("response failed");
  return response.value;
};

const fetchMultipleJokes = async (amount: number) => {
  const parameters = { escape: "javascript" };
  const axiosBaseUrl = axios.create({
    baseURL: baseUrl,
  });
  const response = (
    await axiosBaseUrl.get(`/${amount}`, { params: parameters })
  ).data;
  if (response.type !== "success") throw new Error("response failed");
  return response.value;
};

export { fetchRandomJoke, fetchCategories, fetchMultipleJokes };
