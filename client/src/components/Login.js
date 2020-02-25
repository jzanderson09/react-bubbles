import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

const Login = props => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const changeHandler = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const login = e => {
    e.preventDefault();
    console.log(user.username);
    console.log(user.password);
    const credentials = {
      username: user.username,
      password: user.password
    }
    axiosWithAuth()
        .post('/login', credentials)
        .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.payload);
            console.log(res.data.payload);
            window.alert(`Welcome, ${credentials.username}`);
            props.history.push('/user');
        })
        .catch(err => console.log(err));
    setUser({ username: '', password: '' });
  };

  return (
    <div className='Login-Container'>
      <h3>Please login!</h3>
      <form onSubmit={login}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={user.username}
          onChange={changeHandler}
          autoComplete='off'
        />
        <input 
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={changeHandler}
          autoComplete='off'
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
