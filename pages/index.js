import Head from "next/head";
import Hero from "../components/Hero";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  selectProducts,
  setActiveDrink,
  selectActiveDrink,
} from "@/app/features/products";
import { wrapper } from "@/app/store";
import { useEffect } from "react";
import { setCart } from "@/app/features/cart";
import axios from "axios";
import { setUser } from "@/app/features/users";
import { closeLoading } from "@/app/features/loader";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const activeDrink = useSelector(selectActiveDrink);
  const itemsInCart = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  function changeDrink(id) {
    let mainDrink = products.filter((item) => {
      return item.thumbnail.id === id;
    });
    dispatch(setActiveDrink(mainDrink[0]));
  }


  useEffect(() => {
    dispatch(closeLoading())

    if (itemsInCart.length === 0) {
      let items = JSON.parse(localStorage.getItem("cart-items"));
      if (items) {
        dispatch(setCart(items));
      }
    }
  }, []);

 

  useEffect(()=>{
    dispatch(closeLoading())
  },[isLoggedIn])


  
  if (!products || !activeDrink) {
    return " ";
  }


  return (
    <div>
      <Head>
        <title>Starbucks</title>
        <meta name="description" content="Starbuck Drinks Landing Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero
          changeDrink={changeDrink}
          activeDrink={activeDrink}
          products={products}
        />
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/getall`);
      console.log(process.env)
      console.log(res)
      console.log(res.data)
      store.dispatch(setProducts(res.data.products));
      store.dispatch(setActiveDrink(res.data.products[0]));
    } catch (err) {
      console.log(err)
    }

    try {
      if(ctx.req.cookies.token){
        const token = ctx.req.cookies.token;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/users/getuserinfo`,
          {
            headers: {
              cookie: `token=${token}`,
            },
          }
        );
        store.dispatch(setUser({ user: res.data.user, auth: true }));
        let cart = res.data.user.cart;
        if (cart.items.length >= 1) {
          store.dispatch(setCart(cart.items));
        }
      }else{
        store.dispatch(setUser({ user: null, auth: false }));
      }
    } catch (err) {
      console.log(err)
    }

    return {
      props: {},
    };
  }
);
