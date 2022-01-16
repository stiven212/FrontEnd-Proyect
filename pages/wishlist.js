import React, {useState, useEffect} from 'react'
import BasicLayout from "../layouts/BasicLayout";
import { size, forEach } from 'lodash';
import WishList from '../api/wishlist';
import useAuth from '../hooks/useAuth';
import ListProducts from "../components/ListProducts";
import { Spin } from 'antd';





export default function wishlist() {
    const [products, setProducts] = useState(null);
    const {auth, logout} = useAuth();
    const [wishId, setWishId] = useState(0);

    useEffect(async() => {
        

        try{

            const response = await WishList.wish();
            
            const wishId = response.data[0].id;
            setWishId(wishId);
           // console.log(wishId);

            const response1 = await WishList.getFavorites(wishId);
            console.log(response1.data.data);
            setProducts(response1.data.data);
        }catch(e){
            console.log(e)
        }
        
    }, [])

    return (
        <BasicLayout className="wishlist">
            <div className='wishlist__block'>
                <div className='title'>Lista de deseos</div>
                <div className='data'>

                {!products && <Spin />}
            {products && size(products) === 0 && (
                <div className='data__not-found'>
                    <h3>No tienes ningun juego en tu lista</h3>
                </div>
            )}

            {size(products) > 0 && (
                <ListProducts products={products} />
            )}


                </div>
            </div>
        </BasicLayout>
    )
}
