import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { size } from "lodash";
import WishList from "../api/wishlist";
import useAuth from "../hooks/useAuth";
import ListProducts from "../components/ListProducts";
import { Spin } from "antd";

const  Wisheslist = () => {
  const [products, setProducts] = useState(null);
  // const { auth, logout } = useAuth();
  const [wishId, setWishId] = useState(0);

  useEffect( () => {

    const getData = async () => {

      try {
        const response = await WishList.wish();
        
        const wishId = response.data.data[0].id;
        setWishId(wishId);
        
        const response1 = await WishList.getFavorites(wishId);
        setProducts(response1.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {!products && <Spin tip="Cargando favoritos"> </Spin>}
          {products && size(products) === 0 && (
            <div className="data__not-found">
              <h3>No tienes ningun juego en tu lista</h3>
            </div>
          )}

          {size(products) > 0 && <ListProducts products={products} />}
        </div>
      </div>
    </BasicLayout>
  );
}

export default Wisheslist;
