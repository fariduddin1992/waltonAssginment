
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";

export default function MyApp({ Component, pageProps }) {
  const { PUBLIC_URL } = process.env;
  return (
    <Provider store={store}>
        <ApolloProvider client={client}>
             <Component {...pageProps} basename={PUBLIC_URL}/>
             <ToastContainer />
        </ApolloProvider>
    </Provider>
  )
} 