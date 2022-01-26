import React, { useState, useEffect } from "react";
import BasicLayout from "../../../layouts/BasicLayout";
import { useRouter } from "next/router";
import Product from "../../../api/product";
import HeaderProduct from "../../../components/Product/HeaderProduct";
import TabsProduct from "../../../components/Product/TabsProduct";
import Seo from "../../../components/Seo";

export default function Producto() {
  const [product, setProduct] = useState(null);
  const { query } = useRouter();

  useEffect( () => {

    const getData = async () => {
      
      try {
        const response = await Product.getProduct(query.id);
        console.log(response.data);
        setProduct(response.data);
        console.log("it works")
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [query]);
  console.log(query);

  if (!product) return null;

  return (
    <BasicLayout className="product">
      <Seo title={product.name} />
      <HeaderProduct product={product} />
      <TabsProduct product={product} />
    </BasicLayout>
  );
}
