import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingScreen from './components/LandingScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard';
import MakePayment from './components/MakePayment';
import HomeScreen from './components/HomeScreen';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="App">
      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={
            <LandingScreen
              onLoginClick={() => navigate('/login')}
              onRegisterClick={() => navigate('/register')}
            />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={<RegisterScreen onBack={() => navigate('/')} />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <LoginScreen
              onRegisterClick={() => navigate('/register')}
              onForgotPassword={() => console.log('Forgot password flow')}
              onForgotUsername={() => console.log('Forgot username flow')}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />

        {/* Home (user dashboard) */}
        <Route
  path="/home"
  element={
    user && user.role !== 'admin' ? (
      <HomeScreen
        fullName={user.fullName}
        balance={user.balance}        // 👈 pass actual balance from login response
        onSignOut={handleSignOut}
        onMakePayment={() => navigate('/makepayment')}
      />
    ) : (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    )
  }
/>


        {/* Make Payment */}
        <Route
          path="/makepayment"
          element={
            user && user.role !== 'admin' ? (
              <MakePayment
                user={user}                // 👈 pass user down
                onBack={() => navigate('/home')}
              />
            ) : (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            user && user.role === 'admin' ? (
              <AdminDashboard
                fullName={user.fullName}
                onSignOut={handleSignOut}
              />
            ) : (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
