import React from 'react'
import {Layout, Menu, Col, Row} from "antd";
import Link from 'next/link';
import {UserOutlined } from '@ant-design/icons';

export default function MenuWeb() {
    return (
        <div className="menu">

        <Layout>
            <Row>
                <Col className='menu__left' span={6} offset={4}>
                <MenuPlatforms />
                </Col>
                <Col className='menu__right' span={11}>
                <MenuOptions />
                </Col>
            </Row>
        </Layout>
        </div>
    )
}


function MenuPlatforms(){
    return (
        <Menu>
            <Link href="/disenos"> 
            <a>
            
                <Menu.Item >
                    Diseños
                </Menu.Item>     
            </a> 
            </Link>
            <Link href="/camisetas"> 
            <a>
                <Menu.Item>
                    Camisetas
                </Menu.Item>     
            </a> 
            </Link>
            <Link href="/equipos">  
            <a>

                <Menu.Item>
                    Equipos
                </Menu.Item>     
            </a>
            </Link>
            
        </Menu>
    )
}


function MenuOptions(){
    return (
        <Menu>
        <Menu.Item>
        <UserOutlined />

            Mi cuenta
        </Menu.Item>
        </Menu>
    )
}