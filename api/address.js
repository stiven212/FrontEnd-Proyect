import api from "./api";

const Order = {
  newAddress: (data) => {
    return api.post("/orders", data);
  },

  addresses: () => {
    return api.get("/order");
  },
  deleteAddress: (data) => {
    return api.delete(`/orders/${data}`, data);
  },
  updateAddress: (data, newData) => {
    return api.put(`/orders/${data}`, newData);
  },
};

export default Order;
