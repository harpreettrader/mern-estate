// import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess,signInStart } from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user)
  // const [error ,setError] = useState(null)
  // const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault(); // prevent to refresh the page
    try {
      dispatch(signInStart());
      // setLoading(true)
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
        // setError(data.message)
        // setLoading(false)
        return;
      }
      signInSuccess(data);
      // setLoading(false)
      // setError(null)
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
      // setLoading(false)
      // setError(error.message)
    }
    // console.log(data);
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form className="flex flex-col gap-4">
        
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
       {loading? "loading":"Sign In"}
      </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700'>sign up</span>
          </Link>
          {error && <p className='text-red-700 mt-5'>{error}</p>}
        </div>
    </div>
  );
}

export default SignIn;
