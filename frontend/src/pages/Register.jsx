import React, { useState, useEffect, useRef } from "react";
import {Link, useNavigate} from 'react-router';
import '../styles/Login_Signup.css';

const Register = () => {
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
            const response = await fetch("/api/auth/register", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            });

            const res = await response.json();

            if (!response.ok){
                throw new Error(res.message);
            }

            if (response.status === 201){
                navigate("/Login")
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
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit} className="login_signup_form">
                    <input type="text" id="username" required placeholder="Username"
                        name="username"
                        onChange={handleChange}
                    />

                    <input type="email" id="email" required placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />

                    <input type="password" id="password" required placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button type="submit">Sign up</button>
                </form>
                <div>
                    <p>Already have an account? <br /><Link to="/Login" className="form_link">Login here</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Register;