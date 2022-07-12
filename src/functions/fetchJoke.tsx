const baseUrl = "http://api.icndb.com/jokes/random";
const fetchRandomJoke = async (
  firstname?: string,
  lastname?: string,
  category: string[] = []
) => {
  const lastNameParameter = lastname ? `&lastName=${lastname}` : "";
  const firstNameParameter = firstname
    ? `&firstName=${firstname}`
    : lastname
    ? "&firstName="
    : "";

  const limit = category?.length > 0 ? `&limitTo=[${category?.join(`,`)}]` : "";
  const url = `${baseUrl}?escape=javascript${limit}${firstNameParameter}${lastNameParameter}`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.type === "success") return response.value;
      else throw new Error("response");
    });
};

const fetchCategories = async () => {
  return fetch("http://api.icndb.com/categories")
    .then((response) => response.json())
    .then((response) => {
      if (response.type === "success") return response.value;
      else throw new Error("response");
    });
};

const fetchMultipleJokes = async (amount: number) => {
  const url = baseUrl + `/${amount}?escape=javascript`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.type === "success") return response.value;
      else throw new Error("response");
    });
};

export { fetchRandomJoke, fetchCategories, fetchMultipleJokes };
