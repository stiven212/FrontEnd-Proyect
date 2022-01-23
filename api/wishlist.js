import api from "./api";

const WishList = {
  createWish: () => {
    return api.post(`wish`);
  },
  wish: () => {
    return api.get(`wishes`);
  },
  isAdded: (wish, product) => {
    return api.get(`/wishes/${wish}/products/${product}`);
  },
  addFavorite: (wish, product) => {
    return api.post(`/wishes/${wish}/products/${product}`);
  },
  deleteFavorite: (wish, product) => {
    return api.delete(`/wishes/${wish}/products/${product}`);
  },
  getFavorites: (data) => {
    return api.get(`/wishes/${data}/products`);
  },
};

export default WishList;
