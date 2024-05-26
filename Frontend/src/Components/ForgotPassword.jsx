import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [loading,setLoading]=useState(false);
    const [email,setEmail]=useState("");
    const [success,setSuccess]=useState(false);
    const [name,setName]=useState("");
    const { currentUser } = useSelector(state => state.user);
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(email);
        setLoading(true);
        const res=await fetch("/api/auth/forgot-password", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ email }),
      
          })
          const data = await res.json();
        setLoading(false);

        if(res.status===400) toast.error(data.message);

        if(res.status===200) {
            setSuccess(true);
            setName(data.name);
        }
    }

    if(currentUser){
      return <Navigate to="/" replace={true}/>
    }

    return (
        <>
          <style>
            {`
              body {
                overflow-y: hidden;
              }
            `}
          </style>
          {success?<div className='min-h-screen flex items-center justify-center -translate-y-16 dark:text-white text-lg font-bold'>{name}, Check Your Email To Reset The Password
          </div>:(

          <div className="min-h-screen items-center flex flex-col mx-2 mt-24 ">
            <div className="bg-slate-300 border-2 border-[#28231d] dark:border-[#f3ead3]  dark:bg-slate-400 p-8 rounded-xl shadow-md backdrop-blur mx-3 space-y-8 max-w-md w-full py-14">
              <h2 className="text-2xl font-semibold text-[#28231d] text-center dark:text-black">
                To Reset Password
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#28231d] dark:text-black"
                    
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@gmail.com"
                    required
                    className="mt-1 p-2 block w-full rounded-md focus:outline-none placeholder:text-[#28231d]/50 bg-white/20"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  {loading ? (<div className="flex items-center justify-center"><Oval
                    visible={true}
                    height="40"
                    width="40"
                    color="black"
                    ariaLabel="oval-loading"
                    secondaryColor="white"
                    strokeWidth="5"
                    
                    /></div>):(
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
