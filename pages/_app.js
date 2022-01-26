import React, { useState, useEffect, useMemo } from "react";
import "../scss/global.scss";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken } from "../api/token";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "../api/cart";
import { message } from "antd";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).prv,
      });
    } else {
      setAuth(null);
    }

    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);

    setAuth({
      token,
      idUser: jwtDecode(token).prv,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const addProduct = (product) => {
    const token = getToken();

    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      message.warning("Para comprar este producto tienes que iniciar sesión");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  const removeAllProducts = () => {
    removeAllProductsCart();
    setReloadCart(true);
  };

  const authData = useMemo(
    () => ({
      auth: auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: () => getProductsCart(),
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: () => removeAllProducts(),
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;

  return (
    <>
      <Head>
        <title>Insignia</title>
        {/* <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=EFqKQbp9SEeThmBIj649w"></script> */}
        {/* <link rel="icon" href='/insignia.png' /> */}
      </Head>
      <AuthContext.Provider value={authData}>
        <CartContext.Provider value={cartData}>
          <Component {...pageProps} />
          
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
