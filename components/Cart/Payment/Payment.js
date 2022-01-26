import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Head from "next/head";
import PayPhone from "../../../api/transaction";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { forEach } from "lodash";
import { useRouter } from "next/router";
import Detail from "../../../api/order";
import { size } from "lodash";
import $ from "jquery";
import useCart from "../../../hooks/useCart";
import { message } from "antd";

export default function Payment(props) {
  const { products, address } = props;

  const [dataName, setdataName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // const [checkout, setcheckout] = useState(false);
  const [payment, setpayment] = useState(null);

  const { removeAllProductsCart } = useCart();
  const router = useRouter();





  useEffect( () => {

    const getData = async () => {

      
      try {
        var parametros = {
          id: router.query.id,
          clientxId: router.query.clientTransactionId,
        };
        
        if (parametros.id > 0 && totalPrice > 0) {
          $.ajax({
            data: parametros,
            url: "https://pay.payphonetodoesposible.com/api/button/Confirm",
            type: "POST",
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Bearer PsOS72uS_xCQdtX5eRPZR_dSq527d3pUUfqnRVEZdM6SYQa_aXNXjfpBvw5sMM22E8QPgy3qqF2Q15n2ldKgYB5zE88QcddpFbPkWzhCW2-_N6LClXxQm91U7wNLuhNBWb4--O-denfvSe-zyeHCkG00Ps9lN983tyAbF52EZnujkUp2Mpz4QNZpFKeHGz6BH0Nk3sp5uXUDs5gYWFXFfUzBViIowmSUEqx3Q3vyPxXNcdcoX1t3Jtssk38oeQKuzMjpQeYijqskQRheQAPw_K2Nh648Kk3Rt1xUDdeKURM52t3iTH-IVxXWcqNAbr5ukPaveQ"
                );
              },
              success: function Confirmation(respuesta) {
                var estado = respuesta.transactionStatus;
                setpayment(estado);
                
                message.loading("Generando orden de compra", 1.4);
              },
              error: function (respuesta) {
                alert("Error en la llamada " + respuesta.responseText);
                setpayment(null);
              },
            });
          }
          
          if (router.query.id && totalPrice > 0) {
            if (router.query.id === "0") {
              console.log("Transaccion cancelada");
              
              // alert('transaccion cancelada')
            } else {
              const data = {
                quantity: size(products),
                details: router.query.clientTransactionId,
                iva: (totalPrice * 0.12).toFixed(2),
                subtotal: (totalPrice - totalPrice * 0.12).toFixed(2),
                total: totalPrice.toFixed(2),
              };
              const response = await Detail.newOrder(address.id, data);
              
              const orderId = response.data.id;
              if (response.status === 201) {
                for await (const product of products) {
                  
                  const response1 = await Detail.addProducts(orderId, product.id);
                  
                }
              }
              
              message.success("Orden creada correctamente");
              console.log("orden creada");
              removeAllProductsCart();
              
              router.push("/orders");
            }
          } else {
            console.log("A la espera de transacciones");
          }
        } catch (e) {
          console.log(e.response);
        }
      };
      getData();
  }, [router.query.id, totalPrice]);

  useEffect(() => {
    const d = new Date();
    const data = d.getTime().toString();
    setdataName(data);
  }, [address]);


  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [products]);

  return (
    <>
      <Head>
        {/* <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=L0ccxQXFEGkvwqOxdRJtw"></script> */}
        {/* <script src="https://www.paypal.com/sdk/js?client-id=AZEziNKYwJmnJ2hjtZ2Aq-Am8tmqPLjuT8QWx_2Bkin8xXIkZiRx3Uy1ae3xYxBdY35-rNzS_rNeUbdF&currency=USD"></script> */}
      </Head>
      <div className="payment">
        <div className="title">Pago</div>
        <div className="data">
          <div className="buttons">
            <Button
              icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
              onClick={() => PayPhone(dataName, totalPrice)}
            >
              Pago con tarjeta credito/Debito
            </Button>

          
          </div>
        </div>
      </div>
    </>
  );
}
