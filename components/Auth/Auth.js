import React, {useState} from 'react'
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

export default function Auth(props) {

    const {onCloseModal, setTitleModal} = props;

    const [showLogin, setShowLogin] = useState(true);
    const [forgot, setForgot] = useState(false);
    
    const  showLoginForm  = () => {
        setTitleModal("Iniciar Sesión");
        setShowLogin(true)
    };

    const showRegisterForm = () => {
        setTitleModal("Crear nuevo usuario");
        setShowLogin(false)
    };

    const showForgotForm = () => {
        setTitleModal("Ingrese correo electronico");

    }

    return showLogin ? <LoginForm showRegisterForm={showRegisterForm}/> : 
    <RegisterForm showLoginForm={showLoginForm}/>;
}
