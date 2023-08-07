import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({
    Data,
}: {
    Data: {
        token: string;
        setTokenFunction: (string: string) => void;
        id: string;
        setIdFunction: (string: string) => void;
    };
}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = () => {
        try {
            axios
                .post("http://localhost:80/api/accounts/login", {
                    username_or_email: usernameOrEmail,
                    password: password,
                })
                .then(({ data }) => {
                    if (data.success === false) {
                        setMessage(data.message);
                        return;
                    }
                    console.log("User signed up:", data);
                    Data.setTokenFunction(data.token);
                    Data.setIdFunction(data.id);
                    navigate("/problemset");
                })
                .catch((e: AxiosError) => {
                    setMessage(
                        (
                            e.response?.data as {
                                success: boolean;
                                message: string;
                            }
                        ).message
                    );
                });
        } catch (error) {
            console.error("Sign-up failed:", error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-[14px]">
            <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-4">Login</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username or Email
                    </label>
                    <input
                        className="appearance-none border w-full py-2 px-3 bg-black rounded border-text_2 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                        Login
                    </button>
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default LoginPage;
