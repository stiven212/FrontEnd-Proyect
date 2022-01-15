import React, {useState, useEffect ,useMemo} from "react";
import "../scss/global.scss";
import 'antd/dist/antd.css'
import PropTypes from 'prop-types';
import AuthContext from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/auth";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import {setToken, getToken, removeToken} from "../../tienda/api/token";
import {useRouter} from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
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
  const authData = useMemo(
    () => ({
      auth: auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]

  )

  if(auth === undefined) return null

  return <AuthContext.Provider value={authData}>
    
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
    </AuthContext.Provider>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps : PropTypes.object.isRequired,
}

