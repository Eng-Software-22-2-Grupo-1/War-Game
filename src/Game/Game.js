import WorldMap from '../Maps/WorldMap';
import utils from '../shared/utils';
import * as Moves from './Moves';
import Phases from './Phases';

const createGame = (options) => {
  const gameMap = WorldMap;
  const { numberOfPlayers } = options;
  const playersColors = [
    {
      color: 'Red',
      code: '#ff3300'
    },
    {
      color: 'Green',
      code: '#66ff66'
    },
    {
      color: 'Blue',
      code: '#3399ff'
    },
    {
      color: 'Purple',
      code: '#cc00ff'
    },
    {
      color: 'Black',
      code: '#000000'
    },
    {
      color: 'White',
      code: '#ffffff'
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
          unassignedTroops: utils.calculateInitialTroops(numberOfPlayers),
          cards: [],
          shouldReceiveCard: false
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
        players,
        numOfSetsTraded: 0
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
