import React, { useEffect, useState } from "react";
import bg from "../assets/bg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import axios from "axios";
import { toast } from "react-toastify";
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Register = () => {
    const { loading, authenticate, error, successMessage, myInfo } = useSelector((state) => state.auth);
    console.log(myInfo);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",      
    });
    const [image, setImage] = useState("");

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const fileHandle = (e) => {
        if (e.target.files.length !== 0) {
            setState({
                ...state,
                [e.target.name]: e.target.files[0],
            });
            console.log(e.target.files[0]);
            var reader = new FileReader();
            reader.onload = function () {
                setImage(reader.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const register = async (e) => {
        e.preventDefault();
        const { userName, email, password, confirmPassword, image } = state;

        if (!userName || !email || !password || !confirmPassword || !image) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("image", image);

        console.log(formData);
        dispatch(userRegister(formData));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (authenticate) {
            navigate("/");
            dispatch({
                type:ERROR_MESSAGE_CLEAR
            })
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({
                type:SUCCESS_MESSAGE_CLEAR
            })
        }
        if (error.length > 0) {
            error.map((err) => {
                toast.error(err);
            });
        }
    }, [successMessage, error]);
    return (
        <div className="w-[100vw] h-[100vh] p-8 md:p-16 text-white flex flex-col justify-center items-center   bg-cover bg-center bg-[#222]" >
            <div className="w-[85%] max-w-[400px] p-12  backdrop-blur-2xl	 rounded-xl bg-gray-800">
                <h2 className="text-3xl font-bold mb-4 text-center  ">Register</h2>
                <form className="space-y-4 mt-4" onSubmit={register}>
                    <div>
                        <input type="text" id="name" name="userName" onChange={inputHandle} className="mt-1 block w-full px-3 py-2  bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Your Name " />
                    </div>
                    <div>
                        <input type="email" id="email" name="email" onChange={inputHandle} className=" block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Enter Email " />
                    </div>
                    <div>
                        <input type="password" id="password" name="password" onChange={inputHandle} className=" block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Enter Password" />
                    </div>
                    <div>
                        <input type="password" name="confirmPassword" onChange={inputHandle} className="  block w-full px-3 py-2 bg-transparent border-b-black border-b-2 text-white focus:outline-none" placeholder="Confirm Password" />
                    </div>

                    <div className="">
                        <div className="file-image flex justify-around items-center">
                            <div className="image w-12 h-12 rounded-full border border-gray-300 overflow-hidden">{image ? <img src={image} className="h-full w-full"></img> : ""}</div>
                            <div className="file flex justify-between items-center ml-4">
                                <label htmlFor="image" className="bg-gray-400 text-white px-6 py-2 rounded-full cursor-pointer">
                                    Select Image
                                </label>
                                <input type="file" className="form-control hidden" onChange={fileHandle} id="image" name="image" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pr-2">
                        <span htmlFor="terms" className="ml-2 block text-sm text-gray-200">
                            Already have an account
                        </span>
                        <Link className=" text-blue-700" to="/login">
                            Login{" "}
                        </Link>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
