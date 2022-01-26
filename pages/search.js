import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import Product from "../api/product";
import { Spin } from "antd";
import { size } from "lodash";
import ListProducts from "../components/ListProducts";
import Seo from "../components/Seo";

const  Search = () => {
  const [products, setProducts] = useState(null);

  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-product").focus();
  }, []);

  useEffect( () => {
    const getData = async () => {

      try {
        if (size(query.query) > 0) {
          const response = await Product.searchProduct(query.query);
          if (size(response.data.data) > 0) setProducts(response.data.data);
          else setProducts([]);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [query]);
  return (
    <BasicLayout className="search">
      <Seo title={`Buscando ${query.query}`} />
      {!products && <Spin tip="Buscando producto" />}
      {products && size(products) === 0 && (
        <div>
          <h3>No se encontrado productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
    </BasicLayout>
  );
}

export default Search;
