import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [isErr, setIsErr] = useState(false);

  const login = (e) => {
    if (userName === '') {
      e.preventDefault();
      setIsErr(true);
    } else {
      setIsErr(false);
    }
  };

  return (
    <div className="home">
      <h1 className="homeHeadline">World Trivia</h1>
      <form>
        <input
          type="text"
          placeholder="Enter user name"
          onChange={(e) => setUserName(e.target.value)}
          required
        ></input>
        <br />
        <Link to={{ pathname: '/game' }}>
          <button onClick={(e) => login(e)} className="start-btn">
            START
          </button>
        </Link>
        <div>{isErr ? 'Please enter user name' : ''}</div>
      </form>
      <Link to={{ pathname: '/leaderboard'}}>
        <button className="leaderboard-btn">Leader Board</button>
      </Link>
    </div>
  );
}
