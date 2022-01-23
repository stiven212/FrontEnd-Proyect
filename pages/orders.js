import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import { map, size } from 'lodash';
import BasicLayout from "../layouts/BasicLayout";
import Detail from '../api/order';
import Order from '../components/Orders/Order';



export default function Orders() {


    const [orders, setOrders] = useState(null);

    useEffect(async() => {
        try {
            const response = await Detail.getOrders();
            console.log(response.data.data);
            setOrders(response.data.data);
        } catch (error) {
            console.log(error.response);
        }
        
    }, [])


    return (
        <BasicLayout className="orders">
            <div className='orders__block'>
                <div className='title'>
                    Mis pedidos
                </div>
                <div className='data'>
                    {size(orders) === 0  ? (
                        <h2 style={{textAlign:'center'}}>
                            Todavia no has realizado ninguna compra
                        </h2>
                    ): (
                        <OrderList orders={orders}/>
                    )}
                </div>
            </div>
        </BasicLayout>
    )
}


function OrderList(props){

    const {orders} = props;
    return (
        <Row >
            {map(orders, (order) => (
                <Col sm={24} md={20} lg={12}>
                    <Order order={order}/>
                </Col>

            ))}
        </Row>
    )
}
