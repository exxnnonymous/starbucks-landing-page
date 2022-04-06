import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CartComponent from "@/components/Cart";
import {closeLoading} from "@/app/features/loader"


function Cart() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeLoading())
  },[])

  if (!isLoggedIn) {
    return <div>...</div>;
  }

  return (
    <section className="font-primary">
      <div className="container px-5 py-6 mx-auto">
        <CartComponent />
      </div>
    </section>
  );
}

export default Cart;

Cart.getInitialProps = async (ctx) => {
  if (ctx.res) {
    ctx.res.writeHead(302, {
      Location: "/",
    });
    ctx.res.end();
  }
  return {
    props: {},
  };
};
