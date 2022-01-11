import api from "./api";

const Order = {
    newAddress:(data)=>{
        return api.post("/orders", data);
    },

    addresses:()=>{
        return api.get("/order");
    }
}

export default Order;