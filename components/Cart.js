import {
  addtocart,
  addToCart,
  removeFromCart,
  removefromcart,
} from "@/app/features/cart";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { BsBasket2 } from "react-icons/bs";
import redirectToCheckout from "@/services/stripe.services"
import formatter from "@/lib/utils/currencyFormatter"
import { startLoading } from "@/app/features/loader";


function Cart() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch()

  const formatPrice = formatter(cart.total.price);

  async function handleCheckout() {
    dispatch(startLoading())
    let items = cart.items.map(item=>{
      return {
        price:item.product_id,
        quantity:item.count
      }
    })
    await redirectToCheckout(items)
  }

  return (
    <div>
      {cart.items.length === 0 ? (
        <>
          <div className="w-full flex flex-col items-center">
            <div className=" text-6xl py-2 px-4 text-zinc-600 mt-5 font-medium empty rounded-md animate-pulse">
              empty...
            </div>
            <div className="mt-10">
              <div className="text-[15rem] text-zinc-800 animate-basket">
                <BsBasket2 />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-around">
            <div>
              <h2 className="text-center text-3xl text-zinc-900 font-bold">
                Cart items
              </h2>
              <div className="flex flex-col gap-4 mx-auto w-fit mt-4">
                {cart.items.map((items) => (
                  <CartItem  key={items._id} {...items} />
                ))}
                <div className="bg-zinc-900 text-white font-medium rounded-md py-2 px-6 flex justify-between text-xl">
                  <div>Total</div>
                  <div>{formatPrice}</div>
                </div>
              </div>
            </div>
            <div className="mt-28">
              <button
                onClick={handleCheckout}
                className="bg-blue-700 py-2 px-6 text-2xl text-white rounded-md hover:bg-blue-500 transition-colors duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

function CartItem({ name, price, count, imgurl, _id,product_id }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function cartAddHandle() {
    let item = {
      name: name,
      price: price,
      _id: _id,
      count: 1,
      imgurl: imgurl,
      product_id:product_id
    };
    dispatch(addToCart(item));
    if (user.isLoggedIn) {
      dispatch(addtocart({ products: item, user_id: user.user._id }));
    }
  }

  function cartRemoveHandle() {
    dispatch(removeFromCart(_id));
    if (user.isLoggedIn) {
      dispatch(removefromcart({ product_id: _id, user_id: user.user._id }));
    }
  }

  const eachTotal = count * price;
  const formatPrice = formatter(eachTotal);
  return (
    <div className="flex gap-4 shadow-[0px_0px_10px_2px_rgba(0,0,0,.1)] border-zinc-900 py-2 px-8 rounded-md  hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,.2)] transition-shadow duration-300 items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image src={imgurl} alt={name} width={60} height={90}  loading="eager"/>
        <div>
          <div className="font-medium mb-1">{name}</div>
          <div className="flex gap-2">
            Quantity:{" "}
            <div className="flex ">
              <button
                onClick={cartAddHandle}
                className=" bg-zinc-900 text-white rounded-full border-r px-[6px] cursor-pointer"
              >
                +
              </button>
              <span className="px-2">{count}</span>
              <button
                onClick={cartRemoveHandle}
                className=" bg-zinc-900 text-white rounded-full border-l px-[7px] cursor-pointer"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-4 text-2xl font-bold text-right">{formatPrice}</div>
    </div>
  );
}
