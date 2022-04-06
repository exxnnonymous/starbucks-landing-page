import RegisterComponent from "@/components/Register"
import Head from "next/head"

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {closeLoading} from "@/app/features/loader"


function Register() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeLoading())
  },[])
  return (
    <div>
      <Head>
        <title>Register | Starbucks</title>
      </Head>
        <RegisterComponent />
    </div>
  )
}

export default Register