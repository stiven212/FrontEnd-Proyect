import React from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import {FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';

export default function Top() {
    return (
        <div className='top'>
            <Layout>
                <Row className='top' justify='center'>
                <Col span={8} className='top__left'>
                <Network />
                </Col>
                <Col span={8} className='top__right'>
                <Policies />
                </Col>

                </Row>
            </Layout>
        </div>
    )
}


function Network(){


    return (
        <ul>
        <li>
        <a href='https://www.facebook.com/insigniaestampados' target='_blank'><FacebookOutlined style={{fontSize:'26px', color:'#fff'}}/></a>
        </li>
        <li>
        <a href='https://www.instagram.com/disenoxtremo7/' target='_blank'><InstagramOutlined style={{fontSize:'26px', color:'#fff'}}/></a>
        </li>
        <li>
        <a href='https://api.whatsapp.com/send?phone=593993818915&app=facebook&entry_point=page_cta' target='_blank'><WhatsAppOutlined style={{fontSize:'26px', color:'#fff'}}/></a>
        </li>
        </ul>
    )
}


function Policies(){
    return(
        <Layout>
            <Row>
                <Col span={12}>   
                <h3>Términos y condiciones</h3>
                </Col>
                <Col  span={12}>
                <h3> Acerca de Nosotros</h3>
                </Col>
            </Row>
            <Row>
                <Col  span={12}>   
                <h3>Acerca de Nosotros</h3>
                </Col>
                <Col  span={12}>
                <h3>Politicas de uso</h3>
                </Col>
            </Row>
        </Layout>
    )
}
