import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import helloImage from './hello.jpg'; // Import the background image

function Login({ isAdmin }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    const err = Validation(values);
    setErrors(err);

    if (isAdmin && values.email === 'admin@gmail.com' && values.password === 'adminA123') {
      navigate('/admin-page');
    } else if (err.email === '' && err.password === '') {
      axios
        .post('https://covid-4.onrender.com/login', values)
        .then((res) => {
          if (res.data === 'Success') {
            navigate('/home');
          } else {
            alert('No record existed');
          }
        })
        .catch((err) => console.log(err));
    }
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
      <div className='bg-white p-3 rounded w-25'>
        <h2>{isAdmin ? 'Admin Login' : 'Sign in'}</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            {isAdmin ? 'Log in as Admin' : 'Log in'}
          </button>
          {isAdmin ? null : (
            <>
              <p>You agree</p>
              <Link
                to='/signup'
                className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
              >
                Create account
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
