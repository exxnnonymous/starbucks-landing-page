import { useSelector,useDispatch } from "react-redux";
import Image from "next/image";
import formatter from "@/lib/utils/currencyFormatter";
import {closeLoading} from "@/app/features/loader"
import { useEffect } from "react";

function Account() {
  const { user } = useSelector((state) => state.user);
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeLoading())
  },[])

  if (!user) {
    return <div>No!</div>;
  }
  return (
    <section className="font-primary">
      <div className="container px-5 py-6 mx-auto">
        <h1 className=" text-3xl text-zinc-900 font-bold">Account</h1>
        <div className="flex justify-around items-start mt-8">
          <div className="flex-grow ">
            <h2 className="text-center text-xl text-zinc-900 font-medium">
              Products you bought
            </h2>
            {user.products && user.products.items.length === 0 ? (
              <div className="mt-8 text-center">
                No products...
              </div>
            ) : (
              <div className="flex flex-col gap-4 mx-auto w-fit mt-4">
                {user.products &&
                  user.products.items.map((item) => (
                    <Products key={item._id} {...item} />
                  ))}
              </div>
            )}
          </div>
          <div className="mt-8">
            <div className="bg-zinc-900 py-4 px-8 rounded-md text-white">
              <h3 className="capitalize text-3xl font-medium">{user.name}</h3>
              <p className="mt-2">Email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;

function Products({ name, price, count, imgurl }) {
  const eachTotal = count * price;
  const formatPrice = formatter(eachTotal);
  return (
    <div className="flex gap-4 shadow-[0px_0px_10px_2px_rgba(0,0,0,.1)] border-zinc-900 py-2 px-8 rounded-md  hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,.2)] transition-shadow duration-300 items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image src={imgurl} alt={name} width={60} height={90} />
        <div>
          <div className="font-medium mb-1">{name}</div>
          <div className="flex gap-2">Quantity : {count}</div>
        </div>
      </div>
      <div className="pl-4 text-2xl font-bold text-right">{formatPrice}</div>
    </div>
  );
}

Account.getInitialProps = async (ctx) => {
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
