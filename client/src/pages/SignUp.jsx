// import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { useState } from "react";
import Oauth from '../components/Oauth';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error ,setError] = useState(null)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault(); // prevent to refresh the page
    setLoading(true)
    try {
      
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setError(data.message)
        setLoading(false)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    // console.log(data);
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">singup</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
      <button disabled={loading}
        onSubmit={handleSumbit}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
       {loading? "loading":"Sign up"}
      </button>
      <Oauth></Oauth>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={'/sign-in'}>
            <span className='text-blue-700'>sign in</span>
          </Link>
          {error && <p className='text-red-700 mt-5'>{error}</p>}
        </div>
    </div>
  );
}

export default SignUp;
