import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
export default function Signin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();
  const sign = () => {
    const user = {
      user_name: userName,
      password: password,
    };
    axios
      .post('users/register', user)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1 className="homeHeadline">sign in </h1>
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
      <Link to={{ pathname: '/game', search: `userName= ${userName}` }}>
        <button onClick={sign} className="start-btn" variant="contained">
          START
        </button>
        <br />
      </Link>
    </div>
  );
}
