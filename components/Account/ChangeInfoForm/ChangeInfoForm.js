import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import User from "../../../api/user";

export default function ChangeInfoForm(props) {
  const { user, logout, setReloadUser } = props;

  const [error, setError] = useState("");

  const onFinish = async (formData) => {
    setError("");

    const userData = {
      ...formData,
    };
    try {
      const response = await User.update(userData);
      setError("");
      message.success("Datos actualizados correctamente", 5);
      setReloadUser(true);
    } catch (error) {
      setError("Email ya en uso");
      console.log(error.status);
      message.error("Email ya en uso", 6);
    }
  };
  return (
    <div className="change-info-form">
      <h4>Actualiza tu información de usuario</h4>
      <Form
        labelCol={{ span: 7, offset: 2 }}
        wrapperCol={{ span: 10, offset: 0 }}
        className="login-form"
        onFinish={onFinish} /* validateMessages={validateMessages}*/
      >
        <Form.Item
          label=" Nuevo Nombre"
          name="name"
          rules={[
            { required: true, message: "Ingresa tu nombre", type: "string" },
          ]}
        >
          <Input placeholder="Nombre" defaultValue={user.name} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Nuevo Correo Electronico"
          rules={[
            {
              required: true,
              message: "Ingresa tu correo",
              type: "email",
              message: "Correo no valido",
            },
          ]}
        >
          <Input placeholder="Correo electronico" defaultValue={user.email} />
        </Form.Item>
        <Form.Item
          label="Nueva Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña",
              min: 6,
              message: "Ingrese una contraseña de minimo 6 caracteres",
            },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          label="Confirmar Nueva Contraseña"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Confirma tu contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar contraseña" />
        </Form.Item>
        <Form.Item className="btn">
          <Button htmlType="submit" className="submit">
            Guardar cambios
          </Button>
        </Form.Item>

        <h2>{error}</h2>
      </Form>
    </div>
  );
}
