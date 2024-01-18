import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css'


const LoginPage: React.FC = () => {
  
  return (
    <div className="container flex flex-column align-items-center justify-content-center">
      <h1 className='mb-6'>Inicio de sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
