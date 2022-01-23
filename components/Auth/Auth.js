import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import ForgotForm from "./ForgotForm/ForgotForm";

export default function Auth(props) {
  const { onCloseModal, setTitleModal, showRegister } = props;

  const [showLogin, setShowLogin] = useState(showRegister ? false : true);
  const [showforgot, setShowForgot] = useState(false);

  const showLoginForm = () => {
    setTitleModal("Iniciar Sesión");
    setShowLogin(true);
    setShowForgot(false);
  };

  const showRegisterForm = () => {
    setTitleModal("Crear nuevo usuario");
    setShowLogin(false);
    setShowForgot(false);
  };

  const showForgotForm = () => {
    setTitleModal("Ingrese correo electronico");
    setShowLogin(false);
    setShowForgot(true);
  };

  return showforgot ? (
    <ForgotForm showLoginForm={showLoginForm} />
  ) : showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      showForgotForm={showForgotForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
