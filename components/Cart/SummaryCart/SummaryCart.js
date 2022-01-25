import React, { useState, useEffect } from "react";
import { Table, Image, Grid } from "antd";
import { forEach, map, size } from "lodash";
import useCart from "../../../hooks/useCart";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const [payment, setpayment] = useState(null);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { removeProductCart } = useCart();

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [reloadCart, products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };
  const columns = [
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
      widht: 150,
      onCell: (_, index) => ({
        colSpan: index < size(products) ? 1 : screens.md ? 3 : 2,
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
      responsive: ["md"],
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
            <Image src={product.image1} alt={product.name} preview={false} />
            {/* <Image
              src={
                "http://localhost:8000/storage/products/APOu2peZNTuU863VPmES2OwRto1uWgPdA17h6OUh.png"
              }
              preview={false}
              width="20%"
              alt={product.name}
            /> */}
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
