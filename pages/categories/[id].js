import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { useRouter } from "next/router";
import Product from "../../api/product";
import { size, map } from "lodash";
import { Spin, Alert } from "antd";
import ListProducts from "../../components/ListProducts";
import Pagination from "../../components/Pagination";
import Seo from "../../components/Seo";

const Categorie = () => {
  const { query } = useRouter();

  const [products, setProducts] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [page, setPage] = useState(1);
  const start = 5;

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * start - start;
  };
  useEffect( () => {

    const getData = async () =>{

      try {
        const response = await Product.getCategoryProducts(query.id, query.page);
        setProducts(response.data.data);
        setTotalProducts(response.data.data.length);
        setPage(query.id);
        console.log("it work")
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [query]);

  return (
    <BasicLayout className="categorie">
      <Seo title={`Categoria ${query.id}`} />
      {!products && <Spin tip="Cargando productos"></Spin>}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay productos</h3>
        </div>
      )}

      {size(products) > 0 && <ListProducts products={products} />}

      {totalProducts ? (
        <Pagination
          totalProducts={totalProducts}
          page={query.page ? parseInt(query.page) : 1}
          start={start}
        />
      ) : null}
    </BasicLayout>
  );
}


export default Categorie;