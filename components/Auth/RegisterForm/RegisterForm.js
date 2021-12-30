import React, {useState, useEffect} from 'react';
import {Form, Button, Input} from "antd";
//import {  } from "next-auth/client";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/auth";
import api from '../../../api/api';
import User from '../../../api/user';
import Routes from '../../../constants/Routes';




export default function RegisterForm(props) {
  //  const { session} = useSession();
    const router = useRouter();

    
    const {showLoginForm} = props;

    const validateMessages = {
        required: '${label} is required!',
        types:{
            email: '${label} is not a valid email!'
        }
    }


    const [result, setResult] = useState("");
    const [errorsList, setErrorsList] = useState([]);
    const [errors, setErrors] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    
    const {register} = useAuth();

    // useEffect(() => {
        
    //     if (!session) {
    //         router.push(Routes.LOGIN);
    //     }
    // });


    const onFinish =  async (formData) => {

        setUserInfo(null);

        setResult('Enviando datos');


        try{

            console.log(formData)

            const userData = {
                ...formData
            
            };
            const response = await register(userData );
            
            console.log('response', response);
        
            setUserInfo(response.data);

            setResult('Usuario registrado correctamente');

           // console.log(response.data.email);
            setErrors("");
        }catch(e){

            console.log('error', e.response);
            console.log('e ',e.data.errors.email);

            setErrors(e.data.errors.email);

            const {response} = e;

            setResult('Ocurrio un error');

            

            if(response){

                if (response.data.errors) {
                    
                    const errors = response.data.errors;
                    // const errorList = Object.values(errors);
                    const newErrorList = [];
          
                    for (let field in errors) {
                      newErrorList.push(...errors[field]);
                    }
                    console.log("errorList", newErrorList);
          
                    setErrorsList(newErrorList);
                  }
            }

        }

        

    }

    return (
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
{/* 
                {errorsList.length > 0 && (
          <ul>
            {errorsList.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )} */}

        {errors.length >0 &&(
            <h1>{errors}</h1>
        )}
        </Form>
    )
}
