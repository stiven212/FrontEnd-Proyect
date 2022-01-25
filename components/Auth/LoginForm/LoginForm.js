import React, { useState } from "react";
import { Form, Button, Input , message} from "antd";
import useAuth from "../../../hooks/useAuth";
import User from "../../../api/user";
import { useRouter } from "next/router";

export default function LoginForm(props) {
  const { showRegisterForm, showForgotForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const router = useRouter();

  const { login } = useAuth();

  const onFinish = async (formData) => {
    setLoading(true);
    setUserInfo(null);
    setResult("Ingresando");

    try {
      const userData = {
        ...formData,
      };

      const response = await User.login(userData);
      login(response.data.token);

      setUserInfo(response.data);
      if (response.data.role !== "ROLE_USER") {
        router.push("/admin/products");
      }
      onCloseModal();
    } catch (e) {
      console.log("error");
      setResult("Credenciales incorrectas");
      message.error("Credenciales invalidas")
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
      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
      >
        <Input.Password placeholder="Contraseña" />
      </Form.Item>

      <Form.Item>
        <div className="actions">
          <Button type="ghost" onClick={showRegisterForm}>
            Registrarse
          </Button>
          <div>
            <Button htmlType="submit" className="submit" loading={loading}>
              Ingresar
            </Button>
            <Button type="link" onClick={showForgotForm}>
              ¿Has olvidado la contraseña?
            </Button>
          </div>
        </div>
      </Form.Item>

      
    </Form>
  );
}
