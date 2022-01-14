import React, {useState, useEffect} from 'react';
import BasicLayout from "../../../layouts/BasicLayout"
import Product from "../../../api/product";
import { size } from 'lodash';
import { Spin} from 'antd';

import ListProducts from '../../../components/ListProducts/ListProducts';



export default function products() {

    const [products, setProducts] = useState(null);
    console.log(products)

    useEffect(async() => {

        try{

            
            const response = await Product.getProducts();
            console.log(response.data.data);

            if(size(response.data.data)>0){
                setProducts(response.data.data)
            }else{
                setProducts([]);
            }
        }catch(e){
            console.log(e);
        }
    }, []);



    return (
        <BasicLayout className="admin">
            {!products && (
                <>
            <Spin /> 
        
                </>
            )}

            {products && size(products) === 0 && (
                <div>
                    <h3>No hay productos agregados</h3>
                </div>
            )}

            {size(products) >0 && (

                <ListProducts products={products}/>
            )}
        </BasicLayout>
    )
}
