import React, {useState} from 'react'
import {Layout, Menu, Col, Row} from "antd";
import Link from 'next/link';
import {UserOutlined } from '@ant-design/icons';
import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth';

export default function MenuWeb() {

    const [showModal, setShowModal] = useState(false);
    const onShowModal = () => setShowModal(true);

    const onCloseModal = () => setShowModal(false);

    const [titleModal, setTitleModal] = useState("Iniciar sesión");
    return (
        <div className="menu">

            <Layout>
                <Row>
                    <Col className='menu__left' span={6} offset={4}>
                    <MenuPlatforms />
                    </Col>
                    <Col className='menu__right' span={11}>
                    <MenuOptions onShowModal={onShowModal}/>
                    </Col>
                </Row>
            </Layout>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} width={500}>
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}/>
            </BasicModal>
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


function MenuOptions(props){

    const {onShowModal} = props;

    return (
        <Menu>
        <Menu.Item onClick={onShowModal}>
        <UserOutlined />

            Mi cuenta
        </Menu.Item>
        </Menu>
    )
}