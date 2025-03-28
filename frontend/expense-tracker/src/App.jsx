import React from 'react';


import{
      BrowserRouter as Router,
      Routes,
      Route,
      Navigate,

} from "react-router-dom";

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dasboard/Home';
import Income from './pages/Dasboard/Income';
import Expense from './pages/Dasboard/Expense';
import UserProvider from './context/userContext';

function App() {
  return (

    <UserProvider>
    <div >
     <Router>
      <Routes>
        <Route path="/" element={< Root/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         
        <Route path="/dashboard" element={<Home />} />
        
        <Route path="/income" element={<Income />} />
        
        {/* Add more routes here */}
        <Route path="/expense" element={<Expense />} />
        
      </Routes>
     </Router> 

    </div>
    </UserProvider>
  )
}

export default App

const Root = () => {

  const isAuthenticated = !!localStorage.getItem("token");

  
  return isAuthenticated ? (
  <Navigate to="/dashboard" />
) : (
<Navigate to="/login" />);


};