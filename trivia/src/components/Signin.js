import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import home from './home.png';
import axios from 'axios';
export default function Signin({ user, setUser }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const sign = async (e) => {
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
        findUser = await axios.post('users/register', user);

        console.log('success logging in');
        console.log(findUser);
        setErrorMessage(false);
        setUser(findUser.data);
      } catch (error) {
        console.log('error invalid user');
        setErrorMessage('user name already exists');
      }
    }
  };
  if (user.name) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1 className="homeHeadline">World Trivia</h1>
      <input
        type="text"
        placeholder="Enter a new user name"
        onChange={(e) => setUserName(e.target.value)}
        required
      ></input>
      <br />
      <input
        type="password"
        placeholder="Enter a new password"
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>
      <br />
      {errorMessage && <p className="message-incorrect">{errorMessage}</p>}
      <Link to={{ pathname: '/' }}>
        <button onClick={sign} className="start-btn" variant="contained">
          SignIn
        </button>
        <br />
      </Link>
      <Link to={{ pathname: '/' }}>
        <img src={home}></img>
      </Link>
    </div>
  );
}
