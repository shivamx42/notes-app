import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [time, setTime] = useState(200);

    const { id, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/auth/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            setLoading(false);

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                return;
            }

            const data = await res.json();
            if(res.status===400) toast.error(data.message);

            setSuccess(true);

        } catch (error) {
            setLoading(false);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (success) {
            const interval = setInterval(() => {
                setTime((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(interval);
                        navigate('/login');
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [success, navigate]);

    return (
        <>
            <style>
                {`
                    body {
                        overflow-y: hidden;
                    }
                `}
            </style>
            {success ? (
                <div className='min-h-screen flex items-center justify-center -translate-y-16 dark:text-white text-lg font-bold'>
                    Your Password Has Been Updated
                    <br />
                    You will be redirected to the login page in {time} seconds.
                </div>
            ) : (
                <div className="min-h-screen items-center flex flex-col mx-2 mt-24">
                    <div className="bg-slate-300 border-2 border-black dark:border-white dark:bg-slate-400 p-8 rounded-xl shadow-md backdrop-blur mx-3 space-y-8 max-w-md w-full py-14">
                        <h2 className="text-2xl font-semibold text-[#28231d] text-center dark:text-black">
                            Reset Password
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className='relative'>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-[#28231d] dark:text-black"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="New Password"
                                    required
                                    className="mt-1 p-2 block w-full rounded-md focus:outline-none placeholder:text-[#28231d]/50 bg-white/20"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 mt-5 dark:text-black"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <div>
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <Oval
                                            visible={true}
                                            height="40"
                                            width="40"
                                            color="black"
                                            ariaLabel="oval-loading"
                                            secondaryColor="white"
                                            strokeWidth="5"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-slate-600/70 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 flex items-center justify-center"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
