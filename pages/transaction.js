import { Button } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import PayPhone from "../api/transaction";
import BasicLayout from "../layouts/BasicLayout";
import Router, { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import { size } from "lodash";
import PayPal from "../components/PayPal";

export default function transaction() {
  const router = useRouter();
  console.log(router.query);
  //console.log(producto1());

  const value = router.query.id;
  const value2 = router.query.clientTransactionId;

  const data = "hola312";
  const [checkout, setcheckout] = useState(false);
  return (
    <>
      <Head>
        <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=L0ccxQXFEGkvwqOxdRJtw"></script>
        <script src="https://www.paypal.com/sdk/js?client-id=AZEziNKYwJmnJ2hjtZ2Aq-Am8tmqPLjuT8QWx_2Bkin8xXIkZiRx3Uy1ae3xYxBdY35-rNzS_rNeUbdF&currency=USD"></script>
      </Head>
      <BasicLayout>
        <h2>Transaction exitosa xd</h2>
        <Button onClick={() => PayPhone(data)}>Pagar 5.12$</Button>

        {size(value) > 0 ? value : <>Id de transaccion</>}
        {size(value2) > 0 ? value2 : <>Estado de transaccion</>}

        {checkout ? (
          <PayPal />
        ) : (
          <Button
            onClick={() => {
              setcheckout(true);
            }}
          >
            PayPal checkout
          </Button>
        )}
      </BasicLayout>
    </>
  );
}
