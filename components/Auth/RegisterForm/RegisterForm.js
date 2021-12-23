import React, {useState} from 'react';
import {Form, Button, Input} from "antd";


export default function RegisterForm(props) {
    
    const {showLoginForm} = props;

    return (
        <Form labelCol={{span:8}} className='login-form'>
            <Form.Item
            label="nombre"
            name="name"
            rules={[
                {required:true, message: 'Ingresa tu nombre'}
            ]}
            >

                <Input placeholder="Nombre"/>
            </Form.Item>
            <Form.Item
            name={['user','email']}
            label= "Email"
            rules={[
                { required:true, message: 'Ingresa tu correo'}
            ]}
            >
                <Input placeholder='Correo electronico'/>
            </Form.Item>
            <Form.Item
            label= "Password"
            name="password"
            rules={[
                {required:true, message: 'Ingresa tu contraseña'}
            ]}
            >
                

                <Input.Password placeholder='Contraseña'/>
            </Form.Item>
            <Form.Item name="confirm" label='Confirm Password' 
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
            <div className='actions'>
                <Button type='primary'>
                    Iniciar
                </Button>
                <Button htmlType='submit' className='submit'>
                    Registrar
                </Button>
            </div>
        </Form>
    )
}
