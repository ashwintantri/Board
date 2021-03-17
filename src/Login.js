import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard";


const inputTextStyle = {
    width: "75%",
    padding: "12px 20px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
}

const submitButton = {
    width: "75%",
    backgroundColor: "black",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showDashboard, setDashboard] = useState(false);
    const notify = (e) => {
        e.preventDefault();
        if (username !== "ashwin" || password !== "ashwin")
            toast.error("Wrong details!🤨")
        else {
            toast.success("Welcome to the Board!😁")
            setTimeout(() => { setDashboard(true) }, 4000)
        }
    }

    return (
        showDashboard ? <Dashboard /> : <form
            style={{
                boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
                borderRadius: "6px",
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                minHeight: "400px",
                minWidth: "400px",
                justifyContent: "center",
                alignItems: "center",
                color: "black"
            }}
        >

            <h2>Login</h2>
            <input placeholder="Username" required style={inputTextStyle} onChange={e => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" required style={inputTextStyle} onChange={e => setPassword(e.target.value)} />
            <button style={submitButton} onClick={notify}>Submit</button>
            <ToastContainer position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </form>
    )
}

export default Login;
