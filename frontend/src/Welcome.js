import React from 'react';
import { useNavigate } from 'react-router-dom';
import helloImage from './hello.jpg';

function Welcome() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/signup');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${helloImage})`, // Set the background image using the imported variable
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className='bg-white p-3 rounded w-25 text-center'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Set a semi-transparent white background for content
        }}
      >
        <h2>Welcome</h2>
        <button className='btn btn-success w-100 rounded-0 mb-3' onClick={handleUserClick}>
          User
        </button>
        <button className='btn btn-danger w-100 rounded-0' onClick={handleAdminClick}>
          Admin
        </button>
      </div>
    </div>
  );
}

export default Welcome;
