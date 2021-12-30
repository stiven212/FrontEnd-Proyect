import "../scss/global.scss";
import 'antd/dist/antd.css'
import PropTypes from 'prop-types';
import { AuthProvider } from "../contexts/auth";

export default function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    
    <Component {...pageProps} />
    </AuthProvider>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps : PropTypes.object.isRequired,
}

