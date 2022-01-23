import api from "./api";

const Category = {
  categories: () => {
    return api.get("/categories");
  },
};

export default Category;
