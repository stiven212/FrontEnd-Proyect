import React, {useState} from 'react';
import { Form, Button, Input, message } from 'antd';
import User from '../../../api/user';
import Order from '../../../api/address';


export default function AddressForm(props) {

    const {setShowModal} = props;


    const [loading, setLoading] = useState(false);



    const onFinish = async (formData) =>{
        setLoading(true);

        console.log(formData);

        try{
            const response = await Order.newAddress(formData);

            console.log('response', response);

            message.success("Dirección creada correctamente")
            setLoading(false);
            setShowModal(false);
        }catch(e){
            console.log(e)
            setLoading(false);
            setShowModal(false);
        }
    }

    return (
        <div>

            <Form labelCol={{span:8}} onFinish={onFinish}  >
            <Form.Item
            name='address'
            label= "Dirección"
            rules={[
                { required:true, message: 'Ingresa una dirección' }
            ]}
            >
                <Input placeholder='Dirección'/>
            </Form.Item>
            

            <Form.Item>


                <div className='actions'>

                    
                    <Button htmlType='submit' className='submit' loading={loading}>
                        Crear dirección
                    </Button>
                </div>
            </Form.Item>



            </Form>
        </div>
    )
}
