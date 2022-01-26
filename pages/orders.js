import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { map, size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import Detail from "../api/order";
import Order from "../components/Orders/Order";
import Seo from "../components/Seo";

const Orders = () =>  {
  const [orders, setOrders] = useState(null);

  useEffect(() => {

    const getData = async () => {

      try {
        const response = await Detail.getOrders();
        console.log(response.data.data);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getData();
  }, []);

  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" description="Lista de todos tus pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              {!orders && <Spin tip="Cargando ordenes"> </Spin>}
              {/* Todavia no has realizado ninguna compra */}
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

export default Orders;

function OrderList(props) {
  const { orders } = props;
  return (
    <Row justify="center">
      {map(orders, (order) => (
        <Col sm={24} md={24} lg={12} xs={24}>
          <Order order={order} />
        </Col>
      ))}
    </Row>
  );
}
