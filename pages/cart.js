import React, {useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout';
import Product from '../api/product';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping';
import Payment from '../components/Cart/Payment';

import Head from 'next/head';

export default function cart() {

    const {getProductsCart} = useCart();

    const products = getProductsCart();

    return !products ? <EmptyCart /> : <FullCart products={products}/>
    
}


function EmptyCart(){
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    )
}

function FullCart(props){

    const {products} = props;

    const [productsData, setProductsData] = useState(null);

    const [reloadCart, setReloadCart] = useState(false);
    
    const [address, setAddress] = useState(null);

    console.log(address)
    useEffect(async() => {
         try{
            const productsTemp = [];
            for await (const product of products){
                const response = await Product.getProduct(product);
                productsTemp.push(response.data);
            }
            setProductsData(productsTemp);
         }catch(e){
             console.log(e.response)
         }
         setReloadCart(false);
    }, [reloadCart])
    return (
        <>
        <Head>
        <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=L0ccxQXFEGkvwqOxdRJtw"></script>
        <script src='https://www.paypal.com/sdk/js?client-id=AZEziNKYwJmnJ2hjtZ2Aq-Am8tmqPLjuT8QWx_2Bkin8xXIkZiRx3Uy1ae3xYxBdY35-rNzS_rNeUbdF&currency=USD'></script>
        </Head>
        <BasicLayout className="empty-cart">
            <SummaryCart products={productsData} setReloadCart={setReloadCart} reloadCart={reloadCart}/>
            <AddressShipping setAddress={setAddress}/>
        
            {address && <Payment products={productsData} address={address}/>}
        </BasicLayout>
        </>
    )
}