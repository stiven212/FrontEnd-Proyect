import React, {useState, useEffect}from 'react';
import { Button } from 'antd';
import Head from 'next/head';
import PayPhone from '../../../api/transaction';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function Payment(props) {

    const {products, address} = props;

    const [dataName, setdataName] = useState("");

    console.log(dataName);
    useEffect(() => {
        const d = new Date();
        const data = d.getTime().toString();
        setdataName(data);


    }, []);
    

  



  return ( 
      <>
      <Head>
        {/* <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=L0ccxQXFEGkvwqOxdRJtw"></script>
        <script src='https://www.paypal.com/sdk/js?client-id=AZEziNKYwJmnJ2hjtZ2Aq-Am8tmqPLjuT8QWx_2Bkin8xXIkZiRx3Uy1ae3xYxBdY35-rNzS_rNeUbdF&currency=USD'></script> */}
        </Head>
        <div className='payment'>
            <div className='title'>Pago</div>
            <div className='data'>
                <Button icon={<ShoppingCartOutlined />}>
                    Pago con tarjeta credito/Debito
                </Button>
            </div>
        </div>
      </>
  );
}
