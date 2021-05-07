import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import EndGame from './components/EndGame';
import LeaderBoard from './components/LeaderBoard';
import Signin from './components/Signin';

import './App.css';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/endgame" component={EndGame} />
          <Route exact path="/leaderboard" component={LeaderBoard} />
          <Route exact path="/signin" component={Signin} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
