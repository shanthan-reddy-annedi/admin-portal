import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { login } from '../api/apiUtils';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({email, password});

      const { accessToken } = response.data;

      // Store the token as a Bearer token in a cookie
      document.cookie = `token=Bearer ${accessToken}`;

      // Redirect to '/'
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page__title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="username">
            Username
          </label>
          <input
            className="login-form__input"
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-form__submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
