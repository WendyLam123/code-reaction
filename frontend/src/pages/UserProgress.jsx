import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import Nav from "../components/Nav";
import "../styles/UserProgress.css";


function UserProgress() {
    const [err, setErr] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
 
    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const token = localStorage.getItem('token');

                if (!token){
                    navigate('/login');
                    return;
                }

                const res = await fetch("/api/userProgress/userData", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok){
                    throw new Error("User data not loaded");
                }
                const data = await res.json();
                setUserInfo(data);

            }catch(err){
                setErr(err.message);
            }
        }
        fetchUser();
    }, [])

    if (err){
        return <p>{err}</p>
    }

    return (
    <main class="userProgress_main">
        <Nav />
        <header>
            <h1>Welcome Back! </h1>
        {userInfo && (
            <h1>{userInfo.username}</h1>
        )}
        </header>
    </main>
  );
}

export default UserProgress;