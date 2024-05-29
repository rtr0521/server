import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

/* loading Screen */
import Spinner from './components/pages/users/Home/Spinner'; // Import the Spinner component

/* users */
import Signup from './components/pages/users/Auth/registration';
import Login from './components/pages/users/Auth/login';
import ForgetPassword from './components/pages/users/Auth/forgetPassword';
import ResetPassword from './components/pages/users/Auth/resetPassword';
import Userdashboard from './components/pages/users/Home/Pages/userdashboard';
import Profile from './components/pages/users/Home/Pages/profile';/* 
import ViewAnalytics from './components/pages/users/Home/Pages/viewAnalytics'; */
import Activities from './components/pages/users/Home/Pages/activities';

/* admin */
import AuthAdmin from './components/pages/admin/auth';
import AdminAnalytics from './components/pages/admin/Home/adminAnalytics';
import Pending from './components/pages/admin/Home/pending';
import AdminProfile from './components/pages/admin/Home/adminProfile';
import Accepted from './components/pages/admin/Home/accepted'


import './App.css';

function App() {

  /* spinner loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Clear the timeout when component unmounts or when loading state changes
    return () => clearTimeout(timer);
  }, []); // This effect runs only once on component mount

  // Prevent rendering routes until loading state is false
  if (loading) {
    return <Spinner />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Users */}
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />    
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/profile" element={<Profile />} />
{/*           <Route path="/viewAnalytics" element={<ViewAnalytics />} /> */}
          <Route path="/activities" element={<Activities />} />
          

          {/* Admin */}
          <Route path="/admin/auth" element={<AuthAdmin />} />
          <Route path="/adminAnalytics" element={<AdminAnalytics />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/accepted" element={<Accepted />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;