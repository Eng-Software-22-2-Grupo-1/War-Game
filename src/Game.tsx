import { GameOptions } from './pages/GameOptionsPage';
import WorldMap from './WorldMap';

const createGame = (options: GameOptions | {}): Object => {
  const gameMap = WorldMap;

  const Game = {
    setup: () => {
      const countries = Object.keys(gameMap.countryNames).map((country, countryId) => {
        return {
          name: country,
          owner: null,
          troops: 0
        };
      });
    },
    moves: {},
    flow: {
      endGameIf: () => {},
      turnOrder: {},
      phases: {}
    }
  };
  return Game;
};

export default createGame;
