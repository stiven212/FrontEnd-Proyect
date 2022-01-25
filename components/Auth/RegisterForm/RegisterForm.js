import React, { useState, useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { useRouter } from "next/router";
import User from "../../../api/user";
import { toast } from "react-toastify";
import WishList from "../../../api/wishlist";

export default function RegisterForm(props) {
  const router = useRouter();

  const { showLoginForm } = props;


  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorsList, setErrorsList] = useState([]);
  const [errors, setErrors] = useState("");
  const [userInfo, setUserInfo] = useState(null);

 

  const onFinish = async (formData) => {
    setLoading(true);

    setUserInfo(null);

    setResult("Enviando datos");
    setErrors("");

    try {

      const userData = {
        ...formData,
      };
      const response = await User.register(userData);


      setUserInfo(response.data);

      setResult("Usuario registrado correctamente");

      if (response.data) {
        const wish = await WishList.createWish();
        showLoginForm();
      }
      setErrors("");

      message.success("Registro exitoso", 4);
    } catch (e) {
      console.log("error", e.response);
      console.log("e ", e.response.data.errors.email);

      toast.error(e.response.data.errors.email);

      setErrors(e.response.data.errors.email);

      const { response } = e;

      setResult("Ocurrio un error");

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          console.log("errorList", newErrorList);

          setErrorsList(newErrorList);
        }
      }
    }

    setLoading(false);
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      className="login-form"
      onFinish={onFinish} /* validateMessages={validateMessages}*/
    >
      <Form.Item
        label="Nombre"
        name="name"
        rules={[
          { required: true, message: "Ingresa tu nombre", type: "string" },
        ]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>
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
        label="Confirmar Contraseña"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Confirma tu contraseña" },

          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Las contraseñas no coinciden"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirmar contraseña" />
      </Form.Item>
      <Form.Item>
        <div className="actions">
          <Button type="primary" onClick={showLoginForm}>
            Iniciar Sesión
          </Button>
          <Button htmlType="submit" className="submit" loading={loading}>
            Registrar
          </Button>
        </div>
      </Form.Item>
      
    </Form>
  );
}
