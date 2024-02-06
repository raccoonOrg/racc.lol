import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head> 
        <link rel="icon" type="image/x-icon" href="favicon.ico" /> 
      </Head>
      <ToastContainer
        hideProgressBar
        closeOnClick
        position="top-right"
        pauseOnFocusLoss={false}
        transition={Slide}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
