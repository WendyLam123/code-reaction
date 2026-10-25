import { useState} from "react";
import {Link, useNavigate} from 'react-router';
import '../styles/Login_Signup.css';
import { API_URL } from '../api';

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
        setValues({...prevousValues, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); //reset page error message

        try{
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok){
                throw new Error("Registration failed");
            }

            navigate("/Login");
            
        } catch(error){
            setError(error.message);
        }
        
    }

    return (
        <main className="login_signup_main">
            <div className="login_signup_container">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit} className="login_signup_form">
                    {error && <p>{error}</p>}

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