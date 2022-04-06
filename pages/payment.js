import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {ImCancelCircle} from "react-icons/im"
import {BsCheckLg} from "react-icons/bs"

import { emptycart, setCart } from "@/app/features/cart";
import { setUser } from "@/app/features/users";
import { useDispatch } from "react-redux";
import shootFireworks from "@/lib/utils/shootFirework"
import { updateProduct } from "@/app/features/users";
import { startLoading } from "@/app/features/loader";

function Payment({ user}) {
  const router = useRouter();
  const { status } = router.query;
  const dispatch = useDispatch();

  useEffect(()=>{
    if(status&&status==="success"){
      shootFireworks()
      dispatch(setUser({user:user}))
      dispatch(setCart([]));
      dispatch(emptycart({user_id:user._id}));
      dispatch(updateProduct({boughtProducts:user.cart.items,user_id:user._id }))
    }
  },[])
  

  if (status && status === "success") {
   


    return (
      <div className="mt-28 flex justify-center">
      <div className="py-8 px-12 font-primary bg-zinc-100 rounded-md text-black font-medium text-6xl">
          <h2 className="flex gap-4 items-center"><span className="text-green-600"><BsCheckLg /></span>Thanks for your order!</h2>
          <p className="text-center mt-4 text-2xl text-blue-700 underline">
          <Link href="/" passHref><a onClick={()=>{dispatch(startLoading())}}>Home</a></Link>
          </p>
      </div>
      </div>
    );
  }

  if (status && status === "cancel") {
   return (
    <div className="mt-28 flex justify-center">

<div className="py-8 px-12 font-primary bg-zinc-100 rounded-md text-black font-medium text-6xl">
        <h2 className="flex gap-4 items-center"><span className="text-red-600"><ImCancelCircle /></span>Payment Unsuccessful!</h2>
        <p className="text-center mt-4 text-2xl text-blue-700 underline">
          <Link href="/" passHref><a onClick={()=>{dispatch(startLoading())}}>Home</a></Link>
          </p>
      </div>
    </div>
    );
  }
}

export default Payment;



export const getServerSideProps = async (ctx) => {

    try{
      const token = ctx.req.cookies.token;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/getuserinfo`,{
        headers:{
          cookie:`token=${token}`
        }
      })
      return {
        props: {
          id:res.data.user._id,
          user:res.data.user,
        },
      };

      
    }catch(err){
      return {
        props: {},
      };
    }

  }

