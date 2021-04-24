import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./components/Home";
import Game from "./components/Game";
import EndGame from "./components/EndGame";
import LeaderBoard from "./components/LeaderBoard";


import './App.css';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/game" component={Game} />
        <Route exact path="/endgame" component={EndGame} />
        <Route exact path="/leaderboard" component={LeaderBoard}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
