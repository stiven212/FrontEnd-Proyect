import React, { useState, useEffect } from "react";
import { Table, Image } from "antd";
import { forEach, map, size } from "lodash";
import useCart from "../../../hooks/useCart";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import $ from "jquery";
import Detail from "../../../api/order";

export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const [payment, setpayment] = useState(null);

  const { removeProductCart } = useCart();

  console.log(products);
  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [reloadCart, products]);

  // useEffect(async() => {

  //     try{

  //       var parametros = {id:router.query.id, clientxId: router.query.clientTransactionId};

  //       if(parametros.id > 0 && totalPrice > 0){

  //           $.ajax({
  //               data: parametros,
  //               url: 'https://pay.payphonetodoesposible.com/api/button/Confirm',
  //               type: 'POST',
  //               beforeSend: function(xhr){
  //                   xhr.setRequestHeader ("Authorization", 'Bearer PsOS72uS_xCQdtX5eRPZR_dSq527d3pUUfqnRVEZdM6SYQa_aXNXjfpBvw5sMM22E8QPgy3qqF2Q15n2ldKgYB5zE88QcddpFbPkWzhCW2-_N6LClXxQm91U7wNLuhNBWb4--O-denfvSe-zyeHCkG00Ps9lN983tyAbF52EZnujkUp2Mpz4QNZpFKeHGz6BH0Nk3sp5uXUDs5gYWFXFfUzBViIowmSUEqx3Q3vyPxXNcdcoX1t3Jtssk38oeQKuzMjpQeYijqskQRheQAPw_K2Nh648Kk3Rt1xUDdeKURM52t3iTH-IVxXWcqNAbr5ukPaveQ')
  //               }, success: function Confirmation(respuesta){
  //                   var estado = respuesta.transactionStatus;
  //                   console.log(estado)
  //                   setpayment(estado);
  //                   alert('pago procesado')

  //               }, error: function(respuesta){
  //                   alert('Error en la llamada '+ respuesta.responseText);
  //                   console.log(respuesta)
  //                   setpayment(null)
  //               }
  //           })
  //       }

  //       console.log(router.query.id)
  //       if(router.query.id && totalPrice > 0){

  //           console.log(router.query.id)
  //           console.log(parseInt(router.query.id))
  //           console.log(payment)
  //           if(router.query.id === '0'){

  //               console.log('Transaccion cancelada')

  //               alert('transaccion cancelada')
  //           }else{
  //               console.log('realizando pedido')

  //               const data = {
  //                   'quantity' : size(products),
  //                   'details' : router.query.clientTransactionId,
  //                   'iva' : (totalPrice * 0.12).toFixed(2),
  //                   'subtotal' : (totalPrice - (totalPrice * 0.12)).toFixed(2),
  //                   'total': (totalPrice).toFixed(2),

  //               };
  //               const response = await Detail.newOrder(address.id,data);
  //               console.log(response);
  //               console.log(response.status);

  //               const orderId= response.data.id;
  //               if(response.status === 201){

  //                   for await (const product of products){
  //                       console.log(product.id);

  //                       const response1 = await Detail.addProducts(orderId, product.id)

  //                       console.log(response1);
  //                   }
  //               }
  //               removeAllProductsCart();
  //               router.push('/orders')

  //               console.log('orden creada')

  //           }
  //       }else{
  //           console.log('A la espera de transacciones');
  //       }

  //     }catch(e){
  //           console.log(e.response);
  //     }

  //   }, [router.query.id, totalPrice]);

  const removeProduct = (product) => {
    removeProductCart(product);
    // console.log(product)
    setReloadCart(true);
  };
  const columns = [
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
      widht: 150,
      onCell: (_, index) => ({
        colSpan: index < size(products) ? 1 : 3,
      }),
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      widht: 150,
      onCell: (_, index) => ({
        colSpan: index < size(products) ? 1 : 0,
      }),
    },
    {
      title: "Entrega",
      dataIndex: "entrega",
      key: "entrega",
      widht: 150,
      onCell: (_, index) => ({
        colSpan: index < size(products) ? 1 : 0,
      }),
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      widht: 150,
    },
  ];
  const data = [];

  {
    map(products, (product) =>
      data.push({
        key: product.id,

        producto: (
          <div className="summary-cart__product">
            <DeleteOutlined
              onClick={() => removeProduct(product.id)}
              style={{ fontSize: "20px", color: "red" }}
            />
            {/* <Image src={product.image1} alt={product.name}/> */}
            <Image
              src={
                "http://localhost:8000/storage/products/APOu2peZNTuU863VPmES2OwRto1uWgPdA17h6OUh.png"
              }
              preview={false}
              width="20%"
              alt={product.name}
            />
            {product.name}
          </div>
        ),
        categoria: <>{product.category_name[0].name}</>,
        entrega: "inmediata",
        precio: <>${product.price.toFixed(2)}</>,
      })
    );
  }

  data.push({
    producto: <h2>Total a pagar</h2>,
    precio: <div className="total-price">${totalPrice.toFixed(2)}</div>,
  });
  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito:</div>
      <div className="data">
        <Table columns={columns} dataSource={data} bordered></Table>
      </div>
    </div>
  );
}
