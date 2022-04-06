import Image from "next/image";
import Link from "next/link";
import { BsBasket2 } from "react-icons/bs";
import { BiLogIn, BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/app/features/users";
import { totalInCart } from "@/app/features/cart";
import { useEffect, useState } from "react";
import { startLoading } from "@/app/features/loader";

function Header() {
  const [tooltip, setTooltip] = useState(true);
  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const total = useSelector(totalInCart);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    dispatch(startLoading());
  }

  function handleCart() {
    if (isLoggedIn) {
      if (router.pathname !== "/cart") {
        dispatch(startLoading());
        router.push("/cart");
      }
    }
  }
  function handleAccount(e) {
    if (!isLoggedIn) {
      e.preventDefault();
    } else {
      if (router.pathname !== "/account") {
        dispatch(startLoading());
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setTooltip(false);
    } else {
      setTooltip(true);
    }
  }, [isLoggedIn]);

  return (
    <section>
      <div className="max-w-screen-xl px-16 mx-auto font-primary py-3">
        <header className="flex justify-between items-center">
          <nav className="flex items-center">
            <div className="logo mr-12">
              <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" passHref>
                <a
                  onClick={() => {
                    if (router.pathname !== "/") {
                      dispatch(startLoading());
                    }
                  }}
                  className={
                    router.pathname === "/"
                      ? "font-medium opacity-90 transition-opacity duration-300"
                      : "font-medium opacity-50 hover:opacity-90 transition-opacity duration-300"
                  }
                >
                  Home
                </a>
              </Link>
              <div className="relative group">
                <Link href="/account" passHref>
                  <a
                    onClick={handleAccount}
                    className={
                      router.pathname === "/account"
                        ? "font-medium opacity-90 transition-opacity duration-300 relative"
                        : "font-medium opacity-50 hover:opacity-90 transition-opacity duration-300"
                    }
                  >
                    Account
                  </a>
                </Link>
                {tooltip && <Tooltip desc="Login to access account" />}
              </div>
            </div>
          </nav>
          <div className="relative group">
            <div
              onClick={handleCart}
              className=" cursor-pointer p-2 bg-blue-700 rounded-full text-white text-lg relative hover:rotate-full transition-transform duration-1000 "
            >
              <BsBasket2 />
              {total.itemsCount !== 0 && (
                <span className="absolute bg-red-500 text-xs font-medium w-5 h-5 top-[-7px] right-[-7px] flex justify-center items-center rounded-full">
                  {total.itemsCount}
                </span>
              )}
            </div>
            {tooltip && <Tooltip desc="Login to access cart" />}
          </div>
          <div className="flex gap-4 items-center">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    dispatch(startLoading());
                    router.push("/register");
                  }}
                  className="px-3 py-1 rounded-full border-2 font-medium  hover:opacity-70 text-black border-black flex items-center justify-center gap-1 transition-opacity duration-300"
                >
                  <BiUserCircle className="text-2xl" /> <span>sign up</span>
                </button>
                <button
                  onClick={() => {
                    dispatch(startLoading());
                    router.push("/login");
                  }}
                  className="px-4 py-1 rounded-full border font-medium text-black border-yellow-300  bg-yellow-300 flex items-center justify-center gap-1 hover:opacity-70 transition-opacity duration-300"
                >
                  <BiLogIn className="text-xl" />
                  <span>login</span>
                </button>
              </>
            ) : (router.pathname === "/") &&  (
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full border font-medium text-black border-yellow-300  bg-yellow-300 flex items-center justify-center gap-1 hover:opacity-70 transition-opacity duration-300"
              >
                <BiLogIn className="text-xl" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>
      </div>
    </section>
  );
}

export default Header;

function Tooltip({ desc }) {
  return (
    <span className="group-hover:scale-100 scale-0 transition-transform duration-300 absolute bottom-[-45px] left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-sm py-2 text-center  w-56 rounded-md">
      {desc}!
      <span className=" w-0 h-0 border-l-8 border-r-8 border-r-transparent border-l-transparent border-b-8 border-b-zinc-800 bg-transparent absolute top-[-8px] left-1/2 -translate-x-1/2 "></span>
    </span>
  );
}
