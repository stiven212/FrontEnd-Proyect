import React, {useState} from 'react'
import {Form, Button, Input} from "antd";
//import { useAuth } from "../../../contexts/auth";
import useAuth from '../../../hooks/useAuth';
import User from '../../../api/user';



export default function LoginForm(props) {
    const {showRegisterForm} = props;
    const [loading, setLoading] = useState(false);
   // const auth = useAuth();
   const [result, setResult] = useState("");
   const [userInfo, setUserInfo] = useState(null);
   
   const [email, setEmail] = useState("");
   
   const {login} = useAuth();


    const onFinish = async (formData) => {
        setLoading(true);
        setUserInfo(null);
        setResult("Ingresando");

        setEmail(formData.email);
        try{
            console.log(formData)
            const userData = {
                ...formData
            };

            const response = await User.login(userData);
            console.log('response', response);
            login(response.data.token);

            setUserInfo(response.data);
        }catch(e){
            console.log('error',e);
            setResult("Ocurrio un error");
        }

    }


    const resetPassword = () => {

        console.log(email);
        

    }
    return (
        <Form labelCol={{span:8}} className='login-form' onFinish={onFinish}>
            <Form.Item
            name='email'
            label= "Correo Electronico"
            rules={[
                { required:true, message: 'Ingresa tu correo' ,type:'email', message:'Correo no valido'}
            ]}
            >
                <Input placeholder='Correo electronico'/>
            </Form.Item>
            <Form.Item
            label= "Contraseña"
            name="password"
            rules={[
                {required:true, message: 'Ingresa tu contraseña'    }
            ]}
            >
                

                <Input.Password placeholder='Contraseña'/>
                </Form.Item>

                <Form.Item>


                <div className='actions'>

                    <Button type="ghost" onClick={showRegisterForm}>
                        Registrarse
                    </Button>
                    <div>

                    <Button htmlType='submit' className='submit' >
                        Ingresar
                    </Button>
                    <Button type="link" onClick={resetPassword}>¿Has olvidado la contraseña?</Button>
                    </div>
                </div>
                </Form.Item>

                <h1>{result}</h1>
            {userInfo && <div>
                Nombre: {userInfo.name}
                token : {userInfo.token}
                </div>}
        </Form>
    )
}
