import Head from 'next/head'
import React from 'react'
import producto1 from '../api/transaction';
import BasicLayout from '../layouts/BasicLayout'

export default function transaction() {

    console.log(producto1);
    return (
        <>
        <Head>
        <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=L0ccxQXFEGkvwqOxdRJtw"></script>

        </Head>
        <BasicLayout>
            <h2>Transaction exitosa xd</h2>
        </BasicLayout>
        </>
    )
}

