import React, {useState, useEffect} from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router';
import Product from "../../api/product";
import { size, map } from 'lodash';
import { Spin } from 'antd';
import ListProducts from "../../components/ListProducts";
import Pagination from '../../components/Pagination';


export default function categorie() {

    const {query} = useRouter();

    const [products, setProducts] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);
    
    const start = 5;

    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if(!query.page || currentPages === 1) return 0;
        else return currentPages * start -start;
        
    }
    console.log(getStartItem());
    useEffect( async() => {
        
        try{
            const response = await Product.getCategoryProducts(query.id);
            console.log(response.data.data);
            console.log(response.data.data.length);
            setProducts(response.data.data);
            setTotalProducts(response.data.data.length);
            
        }catch(e){
            console.log(e)
        }
    }, [query])

    console.log(query.id)
    return (
        <BasicLayout className="categorie">
            {!products && <Spin />}
            {products && size(products) === 0 && (
                <div>
                    <h3>No hay productos</h3>
                </div>
            )}

            {size(products) > 0 && (
                <ListProducts products={products} />
            )}

            {totalProducts ? <Pagination totalProducts={totalProducts} page={query.page ? parseInt(query.page) : 1} start={start}/> : null}
        </BasicLayout>
    )
}
