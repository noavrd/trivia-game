import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setUser }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  const userInputHandler = (value) => {
    setUserName(value);
  };

  const passwordInputHandler = (value) => {
    setPassword(value);
  };
  const login = async (e) => {
    e.preventDefault();
    const user = {
      user_name: userName,
      password: password,
    };
    let findUser;
    if (!userName || !password) {
      setErrorMessage('user name or password are missing');
    } else {
      try {
        findUser = await axios.post('users/login', user);

        console.log('success logging in');
        console.log(findUser);
        setErrorMessage(false);
        setUser(findUser.data);
      } catch (error) {
        console.log('error invalid user');
        setErrorMessage('user name or password are incorrect');
      }
    }
  };
  return (
    <div>
      <form>
        <h2></h2>
        <input
          type="text"
          placeholder="Enter user name"
          onChange={(e) => userInputHandler(e.target.value)}
          required
        ></input>
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => passwordInputHandler(e.target.value)}
          required
        ></input>
        <br />
        <Link to={{ pathname: '/game', search: `userName= ${userName}` }}>
          <button
            onClick={(e) => login(e)}
            className="start-btn"
            variant="contained"
          >
            START
          </button>
          <br />
        </Link>
        {!errorMessage ? null : (
          <div className="message-incorrect">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}
