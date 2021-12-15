import React from 'react'
import { Layout, Row, Col, Input, Image } from 'antd'
import Link from 'next/link'
import { AudioOutlined } from '@ant-design/icons';

const {Search} = Input;

export default function TopBar() {
    return (
        <div className='top-bar'>
            <Layout>
                <Row className='top-bar' justify='center'>
                    <Col span={8} className='top-bar__left'>
                    <Logo/>
                    </Col>
                    <Col span={8} className='top-bar__right'>
                    <Searchc/>
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}



function Logo(){
    return (
        <Link href="/">
            <a>
            <Image preview={false} src='/insignia.png' alt='INSIGNIA' />

            </a>
        </Link>
        )
}


function Searchc(){
    return(
        <Search placeholder="input search text" allowClear style={{ width: 250 }} />
    )
}