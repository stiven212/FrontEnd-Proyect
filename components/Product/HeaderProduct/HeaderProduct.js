import React, {useState, useEffect} from 'react';
import { Row, Col, Image, Button , message} from 'antd';
import { set, size } from 'lodash';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import WishList from '../../../api/wishlist';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';





export default function HeaderProduct(props) {
    const {product} = props;

    const {image1, name} = product;


    const [isFavorite, setIsFavorite] = useState(false);
    
    const [wishId, setWishId] = useState(0);
    useEffect(async() => {
        

        try{

            const response = await WishList.wish();
            console.log(response.data[0].id);

            const wishId = response.data[0].id;

            setWishId(wishId);

            const response1 = await WishList.isAdded(wishId, product.id);

            console.log(response1.data);
            if(size(response1.data) >0) setIsFavorite(true);
            else setIsFavorite(false);
            
        }catch(e){
            console.log(e.response)
            console.log(e.response.status);
            if(e.response.status === 404){
                setIsFavorite(false)
            }
        }

        
    }, [product])

    return (
        <Row className='header-product'>
            <Col xs={24} sm={12} lg={{span:8, offset:1}}>
                <Image src="http://localhost:8000/storage/products/2VZWZxHZo7bxmIkwiToqQmmuchNBn8i7VlGmkMAH.png" alt={name} preview={true} />
                {/* <Image src={image1} alt={name} /> */}
            </Col>
            <Col xs={24} sm={12} lg={{span:13, offset:1}}>
                <Info product={product} isFavorite={isFavorite} wishId={wishId}/>
            </Col>
        </Row>
    )
}

function Info(props) {


    const {product, isFavorite, wishId} = props;

    const {name ,description, price, sale, id} = product;

    const { auth, logout } = useAuth();

    const {addProductCart} = useCart();


    const addFavorite = async() => {
        if(auth){
            try{

                const response = await WishList.addFavorite(wishId, product.id);
                message.success("Producto agregado a favoritos",3);
            }catch(e){
                console.log(e.response);
            }
        }else{
            message.warning("Necesitas iniciar sesión para realizar esta acción ")

        }

        
    }

    const deleteFavorite = async() => {
        if(auth){
            try{

                const response = await WishList.deleteFavorite(wishId, product.id);
                message.warning("Producto eliminado de favoritos",3);
            }catch(e){
                console.log(e.response);
            }
        }
    }
    return (
        <>
        <div className='header-product__title'>

            {name}

            <Link href="#">
            <a>

            {isFavorite ?

            <HeartFilled style={{fontSize:'20px' ,color:'red'}} onClick={isFavorite ? deleteFavorite : addFavorite}/>:
            <HeartOutlined style={{fontSize:'20px' ,color:'blue'}} onClick={isFavorite ? deleteFavorite : addFavorite}/>
            }
            
            
            </a>
            </Link>
        </div>
        <div className='header-product__delivery'>
            Entrega en 24/48 horas
        </div>
        <div className='header-product__summary' dangerouslySetInnerHTML={{__html: description}} />
        <div className='header-product__buy'>
            <div className='header-product__buy-price'>
                <p> Precio de Antes: ${sale}</p>
                <div className='header-product__buy-price-actions'>
                <p>-{Math.floor((sale - price)/sale *100)}%</p>
                <p>${price}</p>
                </div>
            </div>
            <Button className='header-product__buy-btn' onClick={() => addProductCart(id)}>
                Comprar
            </Button>
        </div>
        
        </>
    )

}
