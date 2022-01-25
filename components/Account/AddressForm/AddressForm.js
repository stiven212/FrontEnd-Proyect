import React, { useState, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import Order from "../../../api/address";

export default function AddressForm(props) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props;

  const [loading, setLoading] = useState(false);

  const onFinish = async (formData) => {

    setLoading(true);
    !newAddress ? updateAddress(formData) : createAddress(formData);
  };

  const createAddress = async (formData) => {

    try {
      const response = await Order.newAddress(formData);


      message.success("Dirección creada correctamente");
      setLoading(false);
      setShowModal(false);
      setReloadAddresses(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setShowModal(false);
    }
  };

  const updateAddress = async (formData) => {

    try {
      const response = await Order.updateAddress(address.id, formData);
      message.success("Dirección actualizada correctamente");

      setLoading(false);
      setShowModal(false);
      setReloadAddresses(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      <Form labelCol={{ span: 6 }} onFinish={onFinish}>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[{ required: true, message: "Ingresa una dirección" }]}
        >
          <Input placeholder="Dirección" />
        </Form.Item>

        <Form.Item>
          <div className="actions">
            <Button htmlType="submit" className="submit" loading={loading}>
              {newAddress ? "Crear dirección" : "Actualizar dirección"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
