import WorldMap from '../Maps/WorldMap';

const createGame = (options) => {
  const gameMap = WorldMap;
  const numberOfPlayers = options.numberOfPlayers;
  const Game = {
    setup: () => {
      const countries = Object.keys(gameMap.countryNames).map((country, countryId) => {
        return {
          name: country,
          owner: null,
          troops: 0
        };
      });

      const unnasinedTroops = {};
      for (let i = 0; i < numberOfPlayers; i++) {
        unnasinedTroops[i] = options.unitsPerPlayer;
      }

      if (options.randomizeInitialContries) {
        countries.forEach((country) => {});
      }

      console.log(countries);
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
