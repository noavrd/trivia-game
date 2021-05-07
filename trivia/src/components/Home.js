import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
export default function Home() {
  const [userExist, setUserExists] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();
  const [isUserExists, setIsUserExists] = useState(false);

  const userInputHandler = (value) => {
    setUserName(value);
  };

  const passwordInputHandler = (value) => {
    setPassword(value);
  };
  const login = async (e) => {
    const user = {
      user_name: userName,
      password: password,
    };
    let findUser;
    if (!userName || !password) {
      setIsUserExists('user name or password are missing');
      return e.preventDefault();
    }
    try {
      findUser = await axios.post('users/login', user);
      setUserExists(true);
      console.log('success logging in');
      console.log(findUser);
      setIsUserExists(false);
    } catch (error) {
      console.log('error invalid user');
      console.log(findUser);
      setIsUserExists('user name or password are incorrect');
    }
    if (findUser === undefined) {
      e.preventDefault();
      console.log('failll');
    }
  };
  return (
    <div className="home">
      <h1 className="homeHeadline">World Trivia</h1>
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
          <button onClick={login} className="start-btn" variant="contained">
            START
          </button>
          <br />
        </Link>
        {!isUserExists ? null : (
          <div className="message-incorrect">{isUserExists}</div>
        )}
      </form>
      <span>Don't have a user yet?</span>
      <br />
      <Link to={'/signin'}>
        <button className="start-btn">Sign Up</button>
        <br />
      </Link>
      <Link to={{ pathname: '/leaderboard' }}>
        <button className="leaderboard-btn">Leader Board</button>
      </Link>
    </div>
  );
}
