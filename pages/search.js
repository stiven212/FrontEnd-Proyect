import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import Product from "../api/product";
import { Spin } from "antd";
import { size } from "lodash";
import ListProducts from "../components/ListProducts";

export default function search() {
  const [products, setProducts] = useState(null);

  const { query } = useRouter();

  console.log(query.query);
  useEffect(() => {
    document.getElementById("search-product").focus();
  }, []);

  useEffect(async () => {
    try {
      if (size(query.query) > 0) {
        const response = await Product.searchProduct(query.query);
        console.log(response.data.data);
        if (size(response.data.data) > 0) setProducts(response.data.data);
        else setProducts([]);
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [query]);
  return (
    <BasicLayout className="search">
      {!products && <Spin />}
      {products && size(products) === 0 && (
        <div>
          <h3>No se encontrado productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
    </BasicLayout>
  );
}
