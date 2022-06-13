const fetchRandomJoke = async (firstname?: string, lastname?: string) => {
  const lastNameParameter = lastname ? `&lastName=${lastname}` : "";
  const firstNameParameter = firstname
    ? `&firstName=${firstname}`
    : lastname
    ? "&firstName="
    : "";
  const url = `http://api.icndb.com/jokes/random?escape=javascript&${firstNameParameter}${lastNameParameter}`;
  console.log(url);

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

export { fetchRandomJoke, fetchCategories };
