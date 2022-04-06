import {useState,useEffect} from "react"
import Head from "next/head";
import {useRouter} from "next/router"
import { useSelector } from "react-redux";

import { wrapper } from "@/app/store";
import "../styles/globals.css";
import Header from "@/components/Header";
import InitialLoader from "@/components/InitialLoader";
import Loader from "@/components/Loader";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const isLoading = useSelector(state=>state.loader.loading)


  useEffect(() => {
    const timeout = setTimeout(()=>{
      setLoading(false);
    },200)


    return ()=>{
      clearTimeout(timeout)
    }
  }, []);
  return (
    <>
    {loading && <InitialLoader />}
    {isLoading && <Loader />}
    <Head>
      <title>Starbucks</title>
      <meta httpEquiv="Content-Security-Policy" content="default-src *;
   img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
   style-src  'self' 'unsafe-inline' *" />


    </Head>
      {(router.pathname !== "/login" && router.pathname !== "/register" && router.pathname !== "/payment") &&<Header />}
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);




