import React, {useState, useEffect} from 'react'
import Order from '../../../api/address';
import {map, size} from "lodash";
import { Row, Col, Button } from 'antd';


export default function ListAddress() {


    const [addresses, setAddresses] = useState(null);

    useEffect(async () => {
        
        try {
            const response = await Order.addresses();
            const address = response.data.data;
            console.log(address);

            setAddresses(address)
            
        } catch (error) {
            
            console.log(response);
        }
    }, [])
    return (
        <div className='list-address'>
            {size(addresses) === 0 ?
        (

        <h3>No existe ninguna dirección creada</h3>    
        ):(
            <Row>
                {map(addresses, (address) => (

                    <Col key={address.id} span={16}>

                        <Address address={address}/>
                    </Col>
                ))
                }
            </Row>
        )
        
        }

        </div>
    )
}


function Address(){

    return(
        <div>
            <p>Address</p>
        </div>
    )
}
