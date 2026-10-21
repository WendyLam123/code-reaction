import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../api";

import Nav from "../components/Nav";
import "../styles/UserProgress.css";

function UserProgress() {
    const { isLoggedIn, token, logout } = useAuth();

    const [err, setErr] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoggedIn) {
                navigate("/login");
                return;
            }

            try {
                const res = await fetch(`${API_URL}/api/userProgress/userData`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.status === 401) {
                    logout();
                    navigate("/login");
                    return;
                }

                if (!res.ok) {
                    throw new Error("User data not loaded");
                }

                const data = await res.json();
                setUserInfo(data);

            } catch (err) {
                setErr(err.message);
            }
        };

        fetchUser();
    }, [isLoggedIn, token, logout, navigate]);

    if (err) {
        return <p>{err}</p>;
    }

    return (
        <main className="userProgress_main">
            <Nav />

            <header>
                <h1>Welcome Back!</h1>

                {userInfo && (
                    <h1>{userInfo.username}</h1>
                )}
            </header>
        </main>
    );
}

export default UserProgress;