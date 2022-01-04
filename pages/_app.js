import "../scss/global.scss";
import 'antd/dist/antd.css'
import PropTypes from 'prop-types';
import { AuthProvider } from "../contexts/auth";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    
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
    </AuthProvider>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps : PropTypes.object.isRequired,
}

