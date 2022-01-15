import React, {useState, useEffect} from 'react';
import BasicLayout from '../../../layouts/BasicLayout';
import { useRouter } from 'next/router';
import Product from '../../../api/product';
import HeaderProduct from '../../../components/Product/HeaderProduct';
import TabsProduct from '../../../components/Product/TabsProduct';


export default function Producto() {

    const [product, setProduct] = useState(null);
    const {query} = useRouter();

   

    useEffect(async() => {
        try{
            const response = await Product.getProduct(query.id);
            console.log(response.data);
            setProduct(response.data);

        }catch(e){
            console.log(e);
        }
        
    }, [query])
    console.log(query);

    if(!product) return null;

    return (
        <BasicLayout className="product">
            <HeaderProduct product={product}/>
            <TabsProduct product={product} />
        </BasicLayout>
    )
}