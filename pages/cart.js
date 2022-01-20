import React, {useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout';
import Product from '../api/product';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping';
import Payment from '../components/Cart/Payment';



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
        <BasicLayout className="empty-cart">
            <SummaryCart products={productsData} setReloadCart={setReloadCart} reloadCart={reloadCart}/>
            <AddressShipping setAddress={setAddress}/>
        
            {address && <Payment products={productsData} address={address}/>}
        </BasicLayout>
    )
}