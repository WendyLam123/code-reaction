import React, { useState, useEffect, useRef } from "react";
import {Link, useNavigate} from 'react-router';
import '../styles/Login_Signup.css';

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    //update state when input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("/api/auth/login", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok){
                throw new Error(data.message);
            }

            if (response.status === 201){
                //store token to localstorage
                localStorage.setItem('token', data.token);
                navigate("/")
            }
            
        } catch(error){
            setError(error.message);
        }
        
    }

    if (error){
        return <p>{error}</p>;
    }

    return (
        <main className="login_signup_main">
            <div className="login_signup_container">
                <h1>Welcome Back!</h1>
                <form onSubmit={handleSubmit} className="login_signup_form">

                    <input type="email" id="email" required placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />

                    <input type="password" id="password" required placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
                <div>
                    <p>Don't Have an Account? <br /><Link to="/Register" className="form_link">Register here</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Login;