import api from "./api";

const Product = {

    getProducts:()=>{
        return api.get("/products?page=2");
        
    },

    getCategoryProducts:(data, page)=>{
        return api.get(`/categories/${data}/products?page=${page}`)
    },

    getProduct: (data) => {
        return api.get(`/products/${data}`);
    }
    


}

export default Product;