import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import User from "../../../api/user";

export default function ForgotForm(props) {
  const { showLoginForm } = props;
  const [result, setResult] = useState(" ");

  const onFinish = async (formData) => {
    try {
      setResult("");
      const userData = {
        ...formData,
      };

      setResult("Verifica tu correo");
      const response = await User.forgot(userData);
    } catch (e) {
      console.log("error", e);

      // setResult("Ocurrio un error");
    }
  };
  return (
    <Form labelCol={{ span: 8 }} className="login-form" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Correo Electronico"
        rules={[
          {
            required: true,
            message: "Ingresa tu correo",
            type: "email",
            message: "Correo no valido",
          },
        ]}
      >
        <Input placeholder="Correo electronico" />
      </Form.Item>

      <Form.Item>
        <div className="actions">
          <Button type="ghost" onClick={showLoginForm}>
            Ingresar
          </Button>
          <div>
            <Button htmlType="submit" className="submit">
              Restablecer Contraseña
            </Button>
          </div>
        </div>
      </Form.Item>

      <h1>{result}</h1>
    </Form>
  );
}
