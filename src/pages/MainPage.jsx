import { Client } from 'boardgame.io/react';
import { useState } from 'react';

import Board from '../Board/Board';
import createGame from '../Game/Game';
import GameOptionsPage from './GameOptionsPage';

const MainPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [options, setOptions] = useState({});

  const handleOptionsSubmit = (newOptions) => {
    setGameStarted(true);
    setOptions(newOptions);
  };

  if (!gameStarted) {
    return <GameOptionsPage onOptionsSubmit={(newOptions) => handleOptionsSubmit(newOptions)} />;
  }

  const game = createGame(options);
  const NewGame = Client({
    game,
    board: Board,
    numPlayers: options.numberOfPlayers
  });

  return <NewGame />;
};

export default MainPage;
