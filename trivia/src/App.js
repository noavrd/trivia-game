import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import EndGame from './components/EndGame';
import LeaderBoard from './components/LeaderBoard';
import Signin from './components/Signin';

import './App.css';
import NotFound from './components/NotFound';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ name: '', accessToken: '' });
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
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post('users/refreshToken');
      setUser(res.data);
    };
    fetchUser();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            children={<Home user={user} setUser={setUser} />}
          />
          <Route path="/game" component={Game} />
          <Route path="/endgame" component={EndGame} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/signin" component={Signin} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
