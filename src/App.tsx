import { Client } from 'boardgame.io/react';
import './App.css';

import Game from './Game';

function App(): any {
  const game = Game.createGame({});
  const NewGame = Client({ game });

  return <NewGame />;
}

export default App;
