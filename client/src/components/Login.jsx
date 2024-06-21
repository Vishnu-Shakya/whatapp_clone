import React,{useEffect, useState} from "react";
import bg from "../assets/bg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authAction";
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Login = () => {
    const { loading, authenticate, error, successMessage, myInfo } = useSelector((state) => state.auth);
    console.log(myInfo);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const login = async (e) => {
        e.preventDefault();
        const {email, password} = state;

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        const formData ={
            email:email,
            password:password
        }
        dispatch(userLogin(formData));
    };

    const navigate=useNavigate();
    useEffect(()=>{
        if(authenticate){
            navigate('/');
            dispatch({type:ERROR_MESSAGE_CLEAR})
        }
        if(successMessage){
            toast.success(successMessage);
            dispatch({type:SUCCESS_MESSAGE_CLEAR});

        }
        if(error.length>0){
            error.map(err=>{
                toast.error(err);
            })
        }
    },[error,successMessage]);
    return ( <div className="w-[100vw] h-[100vh] p-8 md:p-16 text-white flex flex-col justify-center items-center   bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="w-[85%] max-w-[400px] p-12  backdrop-blur-2xl	 rounded-xl">
            <h2 className="text-3xl font-bold mb-4 text-center  ">Login</h2>
            <form className="space-y-4 mt-4" onSubmit={login}>
                
                <div>
                    <input type="email" id="email" name="email" onChange={inputHandle} className=" block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Enter Email " />
                </div>
                <div>
                    <input type="password" id="password" name="password" onChange={inputHandle} className=" block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Enter Password" />
                </div>
               
                <div className="flex items-center justify-between pr-2">
                    <span htmlFor="terms" className="ml-2 block text-sm text-gray-200">
                        If you are new user 
                    </span>
                    <Link className=" text-blue-700" to="/register">
                        Register
                    </Link>
                </div>
                <button type="submit"  className="w-full py-2 px-4 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                    Log In
                </button>
            </form>
        </div>
    </div>
    );
};

export default Login;
