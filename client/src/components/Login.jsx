import React from "react";
import bg from "../assets/bg.jpeg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../store/counter/counterSlice";

const Login = () => {
    const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
    return (
        <div className="w-[100vw] h-[100vh] p-8 md:p-16 text-white flex flex-col justify-center items-center   bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            <div className="w-[85%] max-w-[400px] p-12  backdrop-blur-2xl	 rounded-xl">
                <h2 className="text-3xl font-bold mb-4 text-center  ">Login</h2>
                <form className="space-y-4 mt-4">
                    <div>
                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2  bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Your Name " />
                    </div>
                    <div>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Enter Email " />
                    </div>
                    <div>
                        <input type="password" id="password" className="mt-1 block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Enter Password" />
                    </div>
                    <div className="flex items-center justify-between pr-2">
                        <span htmlFor="terms" className="ml-2 block text-sm text-gray-200">
                            If don't have account
                        </span>
                        <Link className=" text-blue-700" to="/register">
                            {" "}
                            Register
                        </Link>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                        Sign in
                    </button>
                </form>
            </div>
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    );
};

export default Login;
