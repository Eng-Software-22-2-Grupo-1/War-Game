import { Client } from 'boardgame.io/react';
import { ReactElement, useState } from 'react';

import createGame from '../Game';
import GameOptionsPage, { GameOptions } from './GameOptionsPage';

const MainPage = (): ReactElement => {
  const [gameStarted, setGameStarted] = useState(false);
  const [options, setOptions] = useState<GameOptions | {}>({});

  const handleOptionsSubmit = (newOptions: GameOptions): void => {
    setGameStarted(true);
    setOptions(newOptions);
  };

  if (!gameStarted) {
    return (
      <GameOptionsPage
        onOptionsSubmit={(newOptions: GameOptions) => handleOptionsSubmit(newOptions)}
      />
    );
  }

  const game = createGame(options);
  const NewGame = Client({ game, board: () => <div>Board</div> });

  return <NewGame />;
};

export default MainPage;
