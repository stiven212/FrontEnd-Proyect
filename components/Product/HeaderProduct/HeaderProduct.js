import React, {useState, useEffect} from 'react';
import { Row, Col, Image, Button } from 'antd';
import { size } from 'lodash';
import { HeartFilled } from '@ant-design/icons';
import Link from 'next/link';



export default function HeaderProduct(props) {
    const {product} = props;

    const {image1, name} = product;

    console.log(product);
    return (
        <Row className='header-product'>
            <Col xs={24} sm={12} lg={{span:8, offset:1}}>
                <Image src="http://localhost:8000/storage/products/2VZWZxHZo7bxmIkwiToqQmmuchNBn8i7VlGmkMAH.png" alt={name} preview={true} />
                {/* <Image src={image1} alt={name} /> */}
            </Col>
            <Col xs={24} sm={12} lg={{span:13, offset:1}}>
                <Info product={product} />
            </Col>
        </Row>
    )
}

function Info(props) {

    const {product} = props;

    const {name ,description, price, sale} = product;
    return (
        <>
        <div className='header-product__title'>

            {name}

            <Link href="#">
            <a>

            <HeartFilled style={{fontSize:'20px' ,color:'red'}}/>
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
            <Button className='header-product__buy-btn'>
                Comprar
            </Button>
        </div>
        
        </>
    )

}
