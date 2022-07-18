export const endpoints = {
  jokes: {
    random: (amount?: number) => {
      if (amount === undefined) {
        return "/jokes/random";
      }
      return `/jokes/random/${amount}`;
    },
  },
  categories: "/categories",
};
