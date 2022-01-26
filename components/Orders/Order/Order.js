import React, { useState, useEffect } from "react";
import { Image, Spin, Row, Col } from "antd";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";
import Detail from "../../../api/order";
import { EyeOutlined } from "@ant-design/icons";
import { map } from "lodash";

export default function Order(props) {
  const { order } = props;
  const { id } = order;

  const [detail, setDetail] = useState(null);

  const [showModal, setShowModal] = useState(false);



  useEffect(async () => {

    const getData = async () => {

      try {
        const response = await Detail.getOrder(id);
        setDetail(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();

  }, [order]);

  // if(!detail){
  //     return null;
  // }

  const contentStyle = {
    margin: "20px",
    marginBottom: "20px",
    padding: "30px 50px",
    textAlign: "center",
    borderRadius: "4px",
  };
  return (
    <>
      <div className="order">
        <div className="order__info">
          {!detail && (
            <div style={contentStyle}>
              <Spin tip="Cargando orden" />
            </div>
          )}
          {detail && (
            <>
              <div className="order__info-data">
                {/* <h2>Numero de orden</h2> */}
                <Link href={`/categories/products/${detail.product[0].id}`}>
                  <a>
                    <Image
                      src={detail.product[0].image1}
                      alt={detail.product[0].name}
                      preview={false}
                    />
                  </a>
                </Link>
                <div style={{ width: "100%" }}>
                  <h3>Numero de orden</h3>
                  <h3>{detail.details}</h3>
                  <p>Precio: {detail.total}$</p>
                </div>
              </div>
              <div className="order__other">
                <p className="order__other-date">
                  {moment(detail.created_at).format("L")} -{" "}
                  {moment(detail.created_at).format("LT")}
                </p>
                <EyeOutlined onClick={() => setShowModal(true)} />
              </div>
              <AddressModal
                showModal={showModal}
                setShowModal={setShowModal}
                addressShipping={detail.address}
                detail={detail.details}
                subtotal={detail.subtotal}
                total={detail.total}
                products={detail.product}
                iva={detail.iva}
                quantity={detail.quantity}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

function AddressModal(props) {
  const {
    setShowModal,
    showModal,
    addressShipping,
    detail,
    subtotal,
    total,
    products,
    iva,
    quantity,
  } = props;
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      title={"Numero de orden " + detail}
    >
      <h3>El pedido se ha enviado a la siguiente direccion</h3>
      <p>{addressShipping}</p>
      <Row>
        <Col>
          <h3>Detalle de pedido</h3>
          <p>Subtotal = ${subtotal}</p>
          <p>IVA = ${iva}</p>
          <p>Precio final: ${total.toFixed(2)}</p>
          <p>Cantidad: {quantity}</p>
        </Col>
        <Col offset={3}>
          <h3>Productos</h3>

          {map(products, (product) => (
            <Row>
              <Col span={13}>{product.name}</Col>
              <Col offset={4}>${product.price}</Col>
            </Row>
          ))}
        </Col>
      </Row>
      <div></div>
    </BasicModal>
  );
}
