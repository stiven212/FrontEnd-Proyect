import React, {useState, useEffect}from 'react';
import { Button } from 'antd';
import Head from 'next/head';
import PayPhone from '../../../api/transaction';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { forEach } from 'lodash';
import PayPal from '../../PayPal';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
import Detail from '../../../api/order';
import { size } from 'lodash';
import Confirmation from '../../../api/transaction';

export default function Payment(props) {

    const {products, address} = props;


    const [dataName, setdataName] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    // const [checkout, setcheckout] = useState(false);
    const [payment, setpayment] = useState(null);

    const router = useRouter();
    console.log(products);
    
    console.log(address.address);
    console.log(dataName);

    console.log(totalPrice);
    useEffect(async() => {
      try{

        
        //   const confirm = () => {
        //       Confirmation(router)
        //   }

        if(router.query.id && totalPrice > 0){
            // confirm();
            // console.log(router.query.clientTransactionId)
            if(router.query.id === 0){
                console.log('Transaccion cancelada')
            }else{
                const data = {
                    'quantity' : size(products),
                    'details' : router.query.clientTransactionId,
                    'iva' : (totalPrice * 0.12).toFixed(2),
                    'subtotal' : (totalPrice - (totalPrice * 0.12)).toFixed(2),
                    'total': (totalPrice).toFixed(2),

                };
                const response = await Detail.newOrder(address.id,data);
                console.log(response);
                console.log(response.status);

                const orderId= response.data.id;
                if(response.status === 201){

                    for await (const product of products){
                        console.log(product.id);

                        const response1 = await Detail.addProducts(orderId, product.id)

                         console.log(response1);
                    }
                }
            }
        }else{
            console.log('A la espera de transacciones');
        }

      }catch(e){
            console.log(e.response);
      }
    
    }, [router.query.id, totalPrice]);
    

    useEffect(() => {
        const d = new Date();
        const data = d.getTime().toString();
        setdataName(data ) ;


    }, [address]);

    

    console.log(products)
    console.log(totalPrice)

    useEffect(() => {
        let price = 0;
        forEach(products, (product) => {
            price += product.price;
        })
        setTotalPrice(price);
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
