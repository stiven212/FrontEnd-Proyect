import React from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import {FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';

export default function Top() {
    return (
        <div className='top'>
            <Layout>
                <Row className='top' justify='center'>
                <Col lg={{span:8}} md={{span:8}}  className='top__left'>
                <Network />
                </Col>
                <Col  lg={{span:8, offset:2}} md={{span:10  }} sm={{span:21}} xs={{span:20}} className='top__right'>
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
                <Col lg={{span:10}} md={{span:10 }} sm={{span:11, offset:4}} xs={{span:11, offset:4}} >   
                <h3>Términos y condiciones</h3>
                </Col>
                <Col  lg={{span:10}} md={{span:10, offset:0}} sm={{span:10, offset:4}} xs={{span:11, offset:4}}>
                <h3> Acerca de Nosotros</h3>
                </Col>
            </Row>
            <Row>
                <Col lg={{span:10, offset:4}} md={{span:12 }} sm={{span:10, offset:2}} xs={{span:11, offset:4}}>   
                <h3>Contactanos</h3>
                </Col>
                <Col lg={{span:10}} md={{span:10, offset:0}} sm={{span:10, offset:3}} xs={{span:11, offset:4}}>
                <h3>Politicas de uso</h3>
                </Col>
            </Row>
        </Layout>
    )
}
