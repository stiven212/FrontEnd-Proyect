import api from "./api";

const Product = {

    getProducts:()=>{
        return api.get("/products?page=2");
        
    },

    getCategoryProducts:(data)=>{
        return api.get(`/categories/${data}/products`)
    }
    


}

export default Product;