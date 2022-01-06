import React from 'react';
import {Layout} from "antd";
import Header from '../../components/Header';   
import Footer from '../../components/Footer';

export default function BasicLayout(props) {
    const {children} = props;

    return (
        <Layout fluid className='basic-layout'>
            <Header />
            <Layout className='content'>{children}</Layout>
            <Footer />
        </Layout>
    )
}
