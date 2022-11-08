import WorldMap from '../Maps/WorldMap';
import utils from '../shared/utils';
import Moves from './Moves';
import Phases from './Phases';

const createGame = (options) => {
  const gameMap = WorldMap;
  const { numberOfPlayers } = options;
  const playersColors = [
    {
      color: 'Red',
      code: ''
    },
    {
      color: 'Green',
      code: ''
    },
    {
      color: 'Blue',
      code: ''
    },
    {
      color: 'Purple',
      code: ''
    },
    {
      color: 'Black',
      code: ''
    },
    {
      color: 'White',
      code: ''
    }
  ];

  const Game = {
    name: 'War',
    setup: () => {
      const players = {};
      const countries = {};

      Object.entries([...Array(numberOfPlayers).keys()]).forEach(([playerId]) => {
        players[playerId] = {
          color: playersColors[playerId],
          troops: utils.calculateInitialTroops(numberOfPlayers),
          cards: []
        };
      });

      Object.entries(gameMap.countryNames).forEach(([countryId, countryName]) => {
        countries[countryId] = {
          name: countryName,
          owner: null,
          troops: 0,
          adjacencyList: gameMap.adjacencyList[countryId]
        };
      });

      return {
        countries,
        players
      };
    },
    moves: Moves,
    phases: Phases,
    minPlayers: 3,
    maxPlayers: 6,
    endIf: ({ G, ctx }) => {
      const owners = Object.entries(G.countries).map(([countryId, country]) => country.owner);

      if (owners.every((owner) => owner === owners[0])) {
        return G.players[`${owners[0]}`]; // Winner
      }
    },
    onEnd: ({ G, ctx, events, random, ...plugins }) => {
      console.log(ctx.gameover);

      return G;
    }
  };

  return Game;
};

export default createGame;
