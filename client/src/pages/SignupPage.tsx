import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({
    Data,
}: {
    Data: {
        token: string;
        setTokenFunction: (string: string) => void;
        id: string;
        setIdFunction: (string: string) => void;
    };
}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = () => {
        try {
            axios
                .post("http://localhost:80/api/accounts/signup", {
                    username: username,
                    email: email,
                    password: password,
                })
                .then(({ data }) => {
                    console.log("User signed up:", data);
                    Data.setTokenFunction(data.token);
                    Data.setIdFunction(data.id);
                    navigate("/problemset");
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.error("Sign-up failed:", error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-[14px]">
            <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="appearance-none border w-full py-2 px-3 bg-black rounded border-text_2 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="appearance-none border w-full py-2 bg-black rounded border-text_2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="appearance-none border bg-black rounded border-text_2 w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignUp}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
