import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link,Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Oval } from 'react-loader-spinner'

function RegisterPage() {
  const [formData,setFormData]=useState({});
  const [showPassword, setShowPassword] = useState(false);
  const[isRegistered,setIsRegistered]=useState(false);
  const[loading,setLoading]=useState(false);

  const dispatch=useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData),

    });
    const data=await res.json();
    if(res.status==201){
      setIsRegistered(true);
      toast.success(data.message, {});
      dispatch(signInSuccess(data.userData));
      setLoading(false);
      return;
    }
    
    toast.error(data.message, {});
    setLoading(false);
    
  };

  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser) {
      
      setIsRegistered(true);
    }else {
      setIsRegistered(false);
    }
  }, [currentUser]);

  if(isRegistered){
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
    <div className="min-h-screen items-center flex flex-col mx-2 mt-20">
    
      <div className="bg-slate-300 border-2 border-[#28231d] dark:border-[#f3ead3] dark:bg-slate-400 p-8 rounded-xl mx-3 space-y-8 max-w-md w-full pb-14">
        <h2 className="text-2xl mb-4 font-semibold text-[#28231d] text-center dark:text-black">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#28231d] dark:text-black"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John"
              required
              onChange={handleChange}
              maxLength={16}
              className="mt-1 p-2 block w-full rounded-md focus:outline-none placeholder:text-[#28231d]/50 bg-white/20"
            />
          </div>
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
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md focus:outline-none placeholder:text-[#28231d]/50 bg-white/20"
            />
          </div>
          <div className="relative">
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
              autoComplete="new-password"
              placeholder="************"
              required
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md focus:outline-none placeholder:text-[#28231d]/50 bg-white/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 mt-5 dark:text-black"
            >
              {showPassword ? <FaEye/> : <FaEyeSlash/>}
            </button>
          </div>
          <div>
              {loading ? (<div className="flex items-center justify-center">
                <Oval
                visible={true}
                height="40"
                width="40"
                color="black"
                ariaLabel="oval-loading"
                secondaryColor="white"
                strokeWidth="5"
                
                />
              </div>)
                : (
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
        <div className="mt-4 text-sm">
          <div className="flex">
            Already have an account?
            <div
              className="font-bold text-black/50 hover:text-black/80 dark:text-black/70 dark:hover:text-black/100 ml-2 cursor-pointer duration-0"
            >
              <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default RegisterPage;
