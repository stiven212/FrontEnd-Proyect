import React, {useState, useEffect}from 'react';
import { Button } from 'antd';
import Head from 'next/head';
import PayPhone from '../../../api/transaction';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { forEach } from 'lodash';
import PayPal from '../../PayPal';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



export default function Payment(props) {

    const {products, address} = props;

    const [dataName, setdataName] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkout, setcheckout] = useState(false);

    console.log(dataName);
    useEffect(() => {
        const d = new Date();
        const data = d.getTime().toString();
        setdataName(data);


    }, []);

    

    console.log(products)
    console.log(totalPrice)

    useEffect(() => {
        let price = 0;
        forEach(products, (product) => {
            price += product.price;
        })
        setTotalPrice(price);
        setcheckout(false);
    }, [products])


  



  return ( 
      <>
      <Head>
        <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=L0ccxQXFEGkvwqOxdRJtw"></script>
        <script src='https://www.paypal.com/sdk/js?client-id=AZEziNKYwJmnJ2hjtZ2Aq-Am8tmqPLjuT8QWx_2Bkin8xXIkZiRx3Uy1ae3xYxBdY35-rNzS_rNeUbdF&currency=USD'></script>
        </Head>
        <div className='payment'>
            <div className='title'>Pago</div>
            <div className='data'>
                <div className='buttons'>

                        <Button icon={<ShoppingCartOutlined style={{fontSize:'20px'}}/>} onClick={() => PayPhone(dataName, totalPrice)}>
                            Pago con tarjeta credito/Debito
                        </Button>

                            {/* {checkout ? (
                                <PayPal totalPrice={totalPrice} setcheckout={setcheckout}/>
                                ) : (
                                    <Button onClick={()=>{
                                        setcheckout(true);
                                    }}>
                                PayPal checkout
                            </Button>
                        )} */}

<PayPalScriptProvider options={{ "client-id": "test" }}>
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: totalPrice,
                            }
                        }
                    ]
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    alert(`Transaction completed by ${name}`);
                });
            }}
        />
    </PayPalScriptProvider> 
                </div>
            </div>
        </div>
      </>
  );
}
