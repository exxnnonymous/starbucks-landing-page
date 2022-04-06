import Login from "@/components/Login"
import Head from "next/head"

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {closeLoading} from "@/app/features/loader"

function Signin() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeLoading())
  },[])
  return (
    <div>
      <Head>
        <title>Login | Starbucks</title>
      </Head>
        <Login />
    </div>
  )
}

export default Signin