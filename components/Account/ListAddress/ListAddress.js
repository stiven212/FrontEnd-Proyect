import React, { useState, useEffect } from "react";
import Order from "../../../api/address";
import { map, size } from "lodash";
import { Row, Col, Button, message } from "antd";

export default function ListAddress(props) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;

  const [addresses, setAddresses] = useState(null);

  useEffect( () => {

    const getData = async () => {

      try {
        const response = await Order.addresses();
        const address = response.data.data;
        
        setAddresses(address);
        setReloadAddresses(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    getData();
  }, [reloadAddresses]);

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No existe ninguna dirección creada</h3>
      ) : (
        <Row>
          {map(addresses, (address) => (
            <Col key={address.id} lg={6} md={8} sm={12} xs={24}>
              <Address
                address={address}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

function Address(props) {
  const { address, setReloadAddresses, openModal } = props;

  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    try {
      setLoadingDelete(true);

      const response = await Order.deleteAddress(address.id);

      console.log("respone", response);
      message.success("Dirección eliminada exitosamente", 3);
      setReloadAddresses(true);
      setLoadingDelete(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="address">
      <p>{address.address}</p>

      <div className="actions">
        <Button
          type="primary"
          onClick={() => openModal(`Editar: ${address.address}`, address)}
        >
          Editar
        </Button>
        <Button
          type="primary"
          danger
          onClick={deleteAddress}
          loading={loadingDelete}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
