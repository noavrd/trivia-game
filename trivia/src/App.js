import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import EndGame from './components/EndGame';
import LeaderBoard from './components/LeaderBoard';
import Signin from './components/Signin';
import HashLoader from 'react-spinners/HashLoader';

import './App.css';
import NotFound from './components/NotFound';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ name: '', accessToken: '' });
  const [spinner, setSpinner] = useState(false);
  axios.defaults.headers.common['authorization'] = `bearer ${user.accessToken}`;

  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 403 &&
        originalRequest.url.includes('users/refreshToken')
      ) {
        setUser({ name: '', accessToken: '' });
        return Promise.reject(error);
      } else if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const res = await axios.post('users/refreshToken');

        if (res.status === 200) {
          setUser(res.data);
        }
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  async function logout() {
    try {
      await axios.post('users/logout');
      setUser({ name: '', accessToken: '' });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      setSpinner(true);
      try {
        const res = await axios.post('users/refreshToken');
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
      setSpinner(false);
    };
    fetchUser();
  }, []);
  if (spinner) {
    return <HashLoader color={'#f8ae40'} loading={spinner} size={150} />;
  }

  return (
    <div className="App">
      {user.name && (
        <div className="showUser">
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <span> {user.name}</span>
          <br />
          <button className="start-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            children={<Home user={user} setUser={setUser} />}
          />
          <Route path="/game" children={<Game user={user} />} />
          <Route path="/endgame" component={EndGame} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route
            path="/signin"
            children={<Signin user={user} setUser={setUser} />}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
