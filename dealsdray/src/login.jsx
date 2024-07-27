import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import url  from './url';

function Login() {
  const [data, setData] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data) {
      try {
        if (isLogin) {
          const response = await fetch(`${url}/login/${data.username}`);
          const Data = await response.json();
          if(!(Data.message === "User not found")){
          if (Data.response.f_pwd === data.password) {
            dispatch({type:'Add objects',payload:{id:1,data:data}})
            navigate('/home');
            alert("Login successful");
          } else {
            alert("Login credentials are wrong");
          }}else{
            alert(`There is no user with ${data.username} `)
          }
        } else {
          if (data.password !== confirmPassword) {
            seterror("Passwords do not match");
            return;
          }

          const response = await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          const responseData = await response.json();
          setsuccess(responseData.message);
        }
      } catch (error) {
        seterror(`An error occurred while processing your request: ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heading}>
        <h1>{isLogin ? 'Welcome !' : 'Register'}</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <i className={`fas fa-user ${styles.icon}`}></i>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <i className={`fas fa-envelope ${styles.icon}`}></i>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>

        {!isLogin && (
          <div className={styles.formGroup}>
            <i className={`fas fa-lock ${styles.icon}`}></i>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.link}>
          <a href="#" onClick={() => {setIsLogin(!isLogin),seterror(null),setsuccess(null)}}>
            {isLogin ? 'Register' : 'Already have an account? Login'}
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
