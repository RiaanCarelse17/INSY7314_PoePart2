import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import MakePayment from './components/MakePayment';
import HomeScreen from './components/HomeScreen';
import './App.css';

function App() {
  const [screen, setScreen] = useState('landing');
  const [user, setUser] = useState(null); // Track logged-in user

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setScreen('home');
  };

  const handleSignOut = () => {
    setUser(null);
    setScreen('landing');
  };

  return (
    <div className="App">
      {screen === 'landing' && (
        <LandingScreen
          onLoginClick={() => setScreen('login')}
          onRegisterClick={() => setScreen('register')}
        />
      )}

      {screen === 'register' && (
        <RegisterScreen onBack={() => setScreen('landing')} />
      )}

      {screen === 'login' && (
        <LoginScreen
          onRegisterClick={() => setScreen('register')}
          onForgotPassword={() => console.log('Forgot password flow')}
          onForgotUsername={() => console.log('Forgot username flow')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {screen === 'home' && user && (
        <HomeScreen
          fullName={user.fullName}
          accountData={{
            daily: '6089.23',
            savings: '23156.23'
          }}
          onSignOut={handleSignOut}
          onMakePayment={() => setScreen('makepayment')}
        />
      )}

      {screen === 'makepayment' && user && (
        <MakePayment onBack={() => setScreen('home')} />
      )}
    </div>
  );
}

export default App;