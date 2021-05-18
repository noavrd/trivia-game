import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
export default function Home({ user, setUser }) {
  return (
    <div className="home">
      <h1 className="homeHeadline">World Trivia</h1>
      {user.name ? (
        <div>
          <h2>welcome {user.name} </h2>
          <Link
            className="start-btn"
            to={{ pathname: '/game', search: `userName= ${user.name}` }}
          >
            {/* <button className="start-btn" variant="contained"> */}
            START
            {/* </button> */}
          </Link>
        </div>
      ) : (
        <>
          <Login setUser={setUser} />
          <span>Don't have a user yet?</span>
          <br />
          <Link to={'/signin'}>
            <button className="start-btn">Sign Up</button>
            <br />
          </Link>
        </>
      )}

      <Link to={{ pathname: '/leaderboard' }}>
        <button className="leaderboard-btn">Leader Board</button>
      </Link>
    </div>
  );
}
