import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messenger from "./components/Messenger";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/" element={<Messenger/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer position="top-center" toastClassName="single-line-toast" />
        </>
    );
}

export default App;
