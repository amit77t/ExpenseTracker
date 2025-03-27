import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [error, setError] = useState(null);


const navigate = useNavigate();

const handleLogin = async (e) => {

   e.preventDefault();
   if(!validateEmail(email)){
    
      setError("Invalid email format");
      return;
   }
   if(!password) {
      setError("Please Enter the password");
      return;
   }

   setError("");


   // Login API Call

   try{
    const response = await axiosInstance.post( API_PATHS.AUTH.LOGIN, { email, password });

    const {token, user} = response.data; 
    if(token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } 
  
  }catch(error)
  {
    if(error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
}
     

  return (
    <AuthLayout>
          <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
          
          <form onSubmit={handleLogin}>
            <Input 
              value={email}  
              onChange={({target}) => setEmail(target.value)} 
              label="Email"
              placeholder="aman@example.com" 
              type="text" 
              
             
          
            />
            <Input 
             
              value={password} 
              onChange={({target}) => setPassword(target.value)} 
              label="Password"
              placeholder="Min 8 Character"
              type="password" 

            />
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type="submit" className='mt-4 bg-primary text-white rounded px-4 py-2 w-full text-sm font-medium hover:bg-purple-600/15 hover:text-purple-600'>Login</button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Don't have an account?{" "}
              <Link className=" font medium text-primary underline" to="/signup">
              SignUp</Link>
            </p>
          </form>
          
          </div>
    </AuthLayout>
  )
}

export default Login