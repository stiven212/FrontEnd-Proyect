import api from "./api";

const Detail = {
  newOrder: (data, values) => {
    return api.post(`/orders/${data}/details`, {
      ...values,
      received: 0,
    });
  },
  addProducts: (data, value) => {
    return api.post(`/details/${data}/products/${value}`);
  },
  getOrders: () => {
    return api.get(`/details`);
  },
  getOrder: (data) => {
    return api.get(`/details/${data}`);
  },
};

export default Detail;
