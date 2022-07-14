import { getData, endpoints } from "./axiosClient";
import randomJokeParameters from "./types";

const fetchRandomJoke = async (
  firstname?: string,
  lastname?: string,
  category: string[] = []
) => {
  let parameters: randomJokeParameters = {
    escape: "javascript",
  };
  if (lastname) {
    parameters.lastName = lastname;
  }
  if (firstname) {
    parameters.firstName = firstname;
  }
  if (category?.length > 0) {
    parameters.limitTo = `[${category?.join(",")}]`;
  }

  return await getData(endpoints.jokes.random(), parameters);
};

const fetchCategories = async () => {
  const response = await getData(endpoints.categories, {});
  return response;
};

const fetchMultipleJokes = async (amount: number) => {
  const parameters: randomJokeParameters = { escape: "javascript" };
  return await getData(endpoints.jokes.random(amount), parameters);
};

export { fetchRandomJoke, fetchCategories, fetchMultipleJokes };
