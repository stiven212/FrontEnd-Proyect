import React, {useState, useEffect ,useMemo} from "react";
import "../scss/global.scss";
import 'antd/dist/antd.css'
import PropTypes from 'prop-types';
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import { AuthProvider } from "../contexts/auth";
import {ToastContainer} from "react-toastify";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import {setToken, getToken, removeToken} from "../../tienda/api/token";
import {useRouter} from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getProductsCart, addProductCart, countProductsCart, removeProductCart} from '../api/cart';
import { message } from "antd";

export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const token = getToken();
    if(token){
      setAuth({
        token,
        idUser: jwtDecode(token).prv,
      });
    } else{
      setAuth(null);
    }

    setReloadUser(false);

  }, [reloadUser])

  useEffect(() => {
    
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth])
  const login = (token) =>{
    setToken(token);
    
    console.log(jwtDecode(token));
     setAuth({
       token,
       idUser: jwtDecode(token).prv
     })
  }
  
  const logout = () => {
    if(auth){
      removeToken();
      setAuth(null);
      router.push("/");
    }
  }

  const addProduct = (product) =>{
    const token = getToken();

    if(token){
      addProductCart(product);
      setReloadCart(true);
    }else{
      message.warning("Para comprar este producto tienes que iniciar sesión")
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  }

  const authData = useMemo(
    () => ({
      auth: auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]

  )


  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: () => getProductsCart(),
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: () => null,
    }),
    [totalProductsCart]
  )

  if(auth === undefined) return null

  return <>
  <Head>
    <title>Insignia</title>
    <script src="https://pay.payphonetodoesposible.com/api/button/js?appId=EFqKQbp9SEeThmBIj649w"></script>
    {/* <link rel="icon" href='/insignia.png' /> */}

    {/* <script>
      window.onload = function() {
      payphone.Button({

      //token obtenido desde la consola de developer
      token: "0IbQvS-tKHNfXWJxJBQjmKCmPckh09L7gcBpplMTNkzqjjegTBltq6E4BsrM8rdP_3BPUFMADtLLkvCSHCfsKXvZs4IMRq_gFgJsdCYgGhjPCZURTrvl39ZyelMjUeVxHOY-Cf3aQNbO2Msop6wY1d7FuLl8i8A8zbhVNtUv40Tb9HfupEdZXuhqqgaR1e3R-YD6rudX3fhinQmT9CtcDh-kw9yPmYleqqoyaCDw8MFNr8jENOYGpNwsUloC3JktucUwvsODgAd4alfgMxWu75ATCtYx1pCYf74UCkfCMz1dWR3xB0PUogAhSdJu6vPPaE_GYQ",

      //PARÁMETROS DE CONFIGURACIÓN
      btnHorizontal: true,
      btnCard: true,

        createOrder: function(actions){

        //Se ingresan los datos de la transaccion ej. monto, impuestos, etc
        return actions.prepare({

        amount: 100,
        amountWithoutTax: 100,
        currency: 'USD',
        clientTransactionId: 'DN6Sw6q5HEKryHbfo5mCw'
        });

        },
        onComplete: function(model, actions){

        //Se confirma el pago realizado
        actions.confirm({
        id: model.id,
        clientTxId: model.clientTxId
        }).then(function(value){

        //EN ESTA SECCIÓN SE RECIBE LA RESPUESTA Y SE MUESTRA AL USUARIO                                

        if (value.transactionStatus == Approved){
        alert('Pago'  + value.transactionId + ' recibido', estado  + value.transactionStatus );
        }
        }).catch(function(err){
        console.log(err);
        });

        }
        }).render('App-button')

        }
</script> */}
  </Head>
  <AuthContext.Provider value={authData}>
    <CartContext.Provider value={cartData}>

   <Component {...pageProps} />
   <ToastContainer
    position="top-right"
    autoClose={5000} 
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
    />
    </CartContext.Provider>
    </AuthContext.Provider>
    </>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps : PropTypes.object.isRequired,
}

