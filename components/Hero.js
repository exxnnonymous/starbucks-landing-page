import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BsHandbag, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  addToCart,
  removefromcart,
  removeFromCart,
  totalInCart,
} from "@/app/features/cart";
import { useRouter } from "next/router";
import formatter from "@/lib/utils/currencyFormatter"
import {startLoading} from "@/app/features/loader"

function Hero({ changeDrink, activeDrink, products }) {
  const total = useSelector(totalInCart);
  const itemsInCart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState(true);
  const [tooltip2, setTooltip2] = useState(true);
  const router = useRouter()

  const [incart, setIncart] = useState(0);
  const circleRef = useRef();
  const drinkRef = useRef();
  const cartRef = useRef();
  const priceRef = useRef();


  let formatPrice = formatter(activeDrink.price);
  let formatTotal = formatter(total.price);

  // handle add to cart
  function cartAddHandle() {
    let item = {
      name: activeDrink.name,
      price: activeDrink.price,
      _id: activeDrink._id,
      product_id: activeDrink.product_id,
      count: 1,
      imgurl: activeDrink.thumbnail.url,
    };
    dispatch(addToCart(item));
    if (user.isLoggedIn) {
      dispatch(addtocart({ products: item, user_id: user.user._id }));
    }
  }

  // handle remove from cart
  function cartRemoveHandle() {
    if (incart >= 1) {
      let id = activeDrink._id;
      dispatch(removeFromCart(id));
      if (user.isLoggedIn) {
        dispatch(removefromcart({ product_id: id, user_id: user.user._id }));
      }
    }
  }


  function getCurrentDrink() {
    const obj = itemsInCart.filter((item) => item._id === activeDrink._id);
    if (obj.length === 0) {
      setIncart(0);
    } else {
      setIncart(obj[0].count);
    }
  }

  useEffect(() => {
    getCurrentDrink();
  }, [itemsInCart, activeDrink]);

  function parallex(e) {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    const x2 = (window.innerWidth - e.pageX * -3) / 100;
    const y2 = (window.innerWidth - e.pageY * -3) / 100;
    const x3 = (window.innerWidth - e.pageX * -6) / 100;
    const y3 = (window.innerWidth - e.pageY * -6) / 100;
    const x4 = (window.innerWidth - e.pageX * -2) / 100;
    const y4 = (window.innerWidth - e.pageY * -2) / 100;

    circleRef.current.style.transform = `translateX(${x}px) translateY(${y}px) scale(0.9)`;

    drinkRef.current.style.transform = `translateX(${x2}px) translateY(${y2}px)`;
    cartRef.current.style.transform = `translateX(${x3}px) translateY(${y3}px)`;
    priceRef.current.style.transform = `translateX(${x4}px) translateY(${y4}px)`;
  }

  useEffect(() => {
    if (circleRef.current && drinkRef.current && cartRef.current) {
      // document.addEventListener("mousemove", parallex);
    }
    return () => {
      document.removeEventListener("mousemove", parallex);
    };
  }, []);





  // tooltip if cart is empty
  useEffect(() => {
    if (itemsInCart.length >= 1) {
      setTooltip(false);
    } else {
      setTooltip(true);
    }
  }, [itemsInCart]);

  // tooltip if not logged in
  useEffect(() => {
    if (user.isLoggedIn) {
      setTooltip2(false);
    } else {
       setTooltip2(true);
    }
  }, [user.isLoggedIn]);


  // handle buy btn
  function handleBuy(){
    if(user.isLoggedIn){
      if (itemsInCart.length >= 1) {
        if(router.pathname!=="/cart"){
          dispatch(startLoading())
          router.push('/cart')
        }
      }
    }
  }

  

  if (!activeDrink) {
    return " ";
  }

  return (
    <div className="max-w-screen-xl mx-auto px-16 font-primary pt-4 h-full">
      <div className="flex justify-between h-full items-stretch">
        <div className="py-20 w-2/5">
          <h1 className="text-5xl text-neutral-800 font-medium">
            <div className="mb-3">It&apos;s not just Coffee</div>It&apos;s{" "}
            <span className="text-6xl font-extrabold text-green-800">
              Starbucks
            </span>
          </h1>
          <div className="mt-4 text-4xl font-medium text-neutral-500">
            Coffee <span className="text-orange-400">Drink</span>
          </div>
          <div className="mt-4 text-2xl">
            <span className=" font-light text-neutral-600">Total Order :</span>
            <span className="font-bold"> {formatTotal}</span>
          </div>
          <button onClick={handleBuy} className="group mt-5 flex bg-black rounded-full text-white px-1 py-1 justify-between items-center gap-4 relative">
            <span className="p-2 bg-yellow-300 text-black text-xl rounded-full transition-transform duration-300 group-hover:translate-x-28 ">
              <BsHandbag />
            </span>
            <span className="inline-block mr-7 group-hover:-translate-x-8 transition-transform duration-300 ">
              Buy Now
            </span>
            {(tooltip && tooltip2) ? <Tooltip desc="Add to cart before buying"/> : (!tooltip && tooltip2) ? <Tooltip desc="Login to access checkout"/> :   (tooltip && !tooltip2) && <Tooltip desc="Add to cart before buying"/>}
          </button>
        </div>
        <div className="w-2/5 h-full relative flex-grow -ml-4 flex justify-center items-center">
          <div
            ref={circleRef}
            className={
              "absolute w-full h-full rounded-full scale-90 " +
              activeDrink.colorclass
            }
          ></div>
          <div
            ref={priceRef}
            className="absolute text-6xl font-bold right-[100px] top-1/3 text-white z-10 [text-shadow:_4px_10px_20px_rgba(0,0,0,.2);] "
          >
            {formatPrice}
          </div>
          <div
            ref={cartRef}
            className="absolute w-fit rounded-full z-50 bg-white left-[100px] bottom-1/3 px-1 py-1 flex justify-between items-center gap-4 shadow-[_4px_10px_25px_rgba(0,0,0,.1);]"
          >
            {incart >= 1 ? (
              <>
                <button
                  onClick={cartRemoveHandle}
                  className={
                    " py-2 px-2 rounded-full  text-white text-base hover:opacity-80 transition-opacity duration-300 " +
                    activeDrink.colorclass
                  }
                >
                  <BsChevronDown />
                </button>
                <div>{incart}</div>
                <button
                  onClick={cartAddHandle}
                  className={
                    " py-2 px-2 rounded-full text-white text-base hover:opacity-80 transition-opacity duration-300 " +
                    activeDrink.colorclass
                  }
                >
                  <BsChevronUp />
                </button>
              </>
            ) : (
              <button
                onClick={cartAddHandle}
                className={
                  " py-1 px-2 rounded-full text-white text-base hover:opacity-80 transition-opacity duration-300 " +
                  activeDrink.colorclass
                }
              >
                Add to cart
              </button>
            )}
          </div>
          <div className="h-full" ref={drinkRef}>
            <Image
              src={activeDrink.url}
              alt="drink"
              width={400}
              height={580}
              className="shadow-[0px_0px_10px_rgba(0,0,0,1);]"
              
            />
          </div>
        </div>
        <div className="max-w-fit pt-4 grid grid-row-1 gap-4 content-start">
          {products.map(({ thumbnail: { url, id, alt } }) => (
            <div
              key={id}
              onClick={() => {
                changeDrink(id);
              }}
              className="cursor-pointer p-1 transition-translate duration-300 hover:-translate-y-4 hover:-translate-x-1"
            >
              <Image src={url} alt={alt} width={80} height={120} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;



function Tooltip({desc}){

  return ( <span className="group-hover:scale-100 scale-0 transition-transform duration-300 absolute top-[-45px] left-1/2 -translate-x-1/2 bg-blue-700 text-white text-sm py-2  w-56 rounded-md">
  {desc}!
  <span className=" w-0 h-0 border-l-8 border-r-8 border-r-transparent border-l-transparent border-t-8 border-t-blue-700 bg-transparent absolute bottom-[-8px] left-1/2 -translate-x-1/2 "></span>
</span>)
}