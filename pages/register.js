import React, {useState, useEffect} from 'react';
import {Form, Button, Input} from "antd";
//import {  } from "next-auth/client";
import BasicLayout from "../layouts/BasicLayout";

import { useRouter } from "next/router";
import { useAuth } from "../contexts/auth";
import api from '../api/api';
import User from '../api/user';
import Routes from '../constants/Routes';
import withoutAuth from '../hocs/withoutAuth';
import PropTypes from 'prop-types';



const registerPage = () => {



    const validateMessages = {
        required: '${label} is required!',
        types:{
            email: '${label} is not a valid email!'
        }
    }


    const [result, setResult] = useState("");
    const [errors, setErrors] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    
    const {register} = useAuth();

    const onFinish =  async (formData) => {

        setUserInfo(null);

        setResult('Enviando datos');

    try{

        console.log(formData)

        const userData = {
            ...formData
        
        };
        const response = await register(userData );
        
    
        setUserInfo(response.data);

        setResult('Usuario registrado correctamente');
        
        setErrors("");
    }catch(e){
        console.log('e',e.response);

        const {response} = e;

        setResult('Ocurrio un error');

        

        if(response){

            const errors = response.status;

            console.log('error: ' ,e.response.status)

            if (errors === 400){
                setErrors("email ya registrado")
            }

            if(response.data.errors){

              
           
                const errorList = [];

                for(let field in errors){
                    errorList.push(...errors[field]);     
                }

                console.log("errorlist", errorList);
                setErrors(errorList)
            }
        }

    }

    

}
    return (
        <BasicLayout>

        <Form labelCol={{span:8}} className='login-form'  onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
            label="Nombre"
            name='name'
            rules={[
                {required:true, message: 'Ingresa tu nombre', type: 'string'}
            ]}
            >

                <Input placeholder="Nombre" />
            </Form.Item>
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
                {required:true, message: 'Ingresa tu contraseña', min:6, message:'Ingrese una contraseña de minimo 6 caracteres'}
            ]}
            >
                

                <Input.Password placeholder='Contraseña'/>
            </Form.Item>
            <Form.Item name="password_confirmation" label='Confirmar Contraseña' 
            dependencies={['password']}
            hasFeedback
            rules={[
                {required:true, message:'Confirma tu contraseña',},

({getFieldValue}) => ({
    validator(_,value){
        if(!value || getFieldValue('password')===value){
            return Promise.resolve();
        }
        return Promise.reject(new Error('Las contraseñas no coinciden'));
    },
}),
            ]}
            >
                <Input.Password placeholder='Confirmar contraseña'/>
            </Form.Item>
            <Form.Item >
            <div className='actions'>

                <Button type='primary'>
                    Iniciar
                </Button>
                <Button htmlType='submit' className='submit'>
                    Registrar
                </Button>
               
            </div>
            </Form.Item>
            <h1>{result}</h1>
            {userInfo && <div>
                Nombre: {userInfo.name}
                token : {userInfo.token}
                </div>}

                {
                    errors.length >0 && <h1>{errors}</h1> 
                }
                    
                {/* {
                    errors.length > 0 && <ul>
                        {errors.map((error)=>(
                            <li>{error}</li>
    ))}

                    </ul>
                } */}
        </Form>
        </BasicLayout>

    );
};

export default withoutAuth(registerPage) ;