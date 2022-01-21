import React, {useState, useEffect} from 'react';
import BasicLayout from "../../../layouts/BasicLayout"
import Product from "../../../api/product";
import { size } from 'lodash';
import { Spin} from 'antd';
import User from '../../../api/user';
import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/router';

import ListProducts from '../../../components/ListProducts/ListProducts';



export default function products() {

    const [products, setProducts] = useState(null);
    const [user, setUser] = useState(undefined);
    const {auth, logout, setReloadUser} = useAuth();
    const router = useRouter();

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


    useEffect( async () => {
        
        try{
            const response = await User.me(logout);
            setUser(response || null)
        }catch(e){
            console.log(e);
        }
        
    }, [auth]);
    if(user === undefined) return null;

    if(!auth && !user){
        router.replace("/");
        return null;
    }

    if(user.role === "ROLE_USER"){
        router.replace("/");
        return null;
    }

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
