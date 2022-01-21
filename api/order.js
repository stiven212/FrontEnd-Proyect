import api from "./api";

const Detail = {
    newOrder:(data, values)=>{
        return api.post(`/orders/${data}/details`,{
            
            ...values,
            received: 0

        })
    },
    addProducts:(data,value)=>{
        return api.post(`/details/${data}/products/${value}`);
    }
}

export default Detail;