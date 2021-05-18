import { useState, useEffect } from 'react';
import axios from 'axios';
import home from './home.png';
import { Link } from 'react-router-dom';

export default function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    axios
      .get('leaderboard')
      .then((result) => {
        setLeaders(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(leaders);

  return (
    <div>
      <h1 className="generalHeadline">World Trivia</h1>
      <div className="leaderboard-page">
        <table>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>

          {leaders.map((leader, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{leader.user_name}</td>
              <td>{leader.score}</td>
            </tr>
          ))}
        </table>
      </div>
      <Link to={{ pathname: '/' }}>
        <img src={home}></img>
        <br />
      </Link>
    </div>
  );
}
