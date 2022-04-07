import Link from "next/link";
import { useState,useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/app/features/users";
import { useRouter } from "next/router";
import { startLoading } from "@/app/features/loader";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, isLoggedIn, error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);
  const itemsInCart = useSelector(state=>state.cart.items)

  function togglePass() {
    setShowPass((prevVal) => !prevVal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({name, email, password,itemsInCart}));
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(startLoading())
      setEmail("");
      setName("");
      setPassword("");
      router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-primary relative">
        <div className="absolute top-0 right-0 py-4 px-4 w-80 h-fit">
          {loading && (
            <Notification
              border="border-blue-500"
              text="text-blue-600"
              title="Registering"
              desc="You are being registered"
              bg="bg-blue-100"
            />
          )}
          {error && (
            <Notification
              border="border-red-500"
              text="text-red-600"
              title="Error"
              desc={message}
              bg="bg-red-100"
            />
          )}
        </div>
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <div className="border border-neutral-200 rounded-md p-8 px-10 shadow-[0px_-0px_9px_0px_rgba(0,0,0,.05)]">
            <form
              className="flex flex-col gap-6"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col gap-2 ">
                <label
                  htmlFor="name"
                  className="text-slate-700 font-medium text-base w-fit"
                >
                  Name
                </label>
                <input
                  required={true}
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-neutral-300 rounded-md px-2 py-[6px] text-slate-700 text-base font-primary  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="w-full flex flex-col gap-2 ">
                <label
                  htmlFor="email"
                  className="text-slate-700 font-medium text-base w-fit"
                >
                  Email address
                </label>
                <input
                  required={true}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-neutral-300 rounded-md px-2 py-[6px] text-slate-700 text-base font-primary  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="w-full flex flex-col gap-2 ">
                <label
                  htmlFor="password"
                  className="text-slate-700 font-medium text-base w-fit"
                >
                  Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-neutral-300 rounded-md pl-2 pr-10 py-[6px] text-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  text-base font-primary w-full"
                    required={true}
                  />
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl h-full flex place-items-center  px-1 pr-2 cursor-pointer"
                    onClick={togglePass}
                  >
                    {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center">
                <div className="text-sm hover:underline text-indigo-600 font-medium">
                 {!loading && <Link href="/login" passHref>
                    <a onClick={()=>{dispatch(startLoading())}}>
                    Already have an account? Login
                    </a>
                    </Link>}
                </div>
                <button
                disabled={loading}
                  className="bg- border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 py-[6px] px-4 rounded-[4px] disabled:cursor-not-allowed"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
