import WorldMap from '../Maps/WorldMap';
import utils from '../shared/utils';
import * as Moves from './Moves';
import Phases from './Phases';

const createGame = (options) => {
  const gameMap = WorldMap;
  const { numberOfPlayers, numberOfBots } = options;
  const playersColors = [
    {
      name: 'Red',
      code: '#ff3300'
    },
    {
      name: 'Green',
      code: '#66ff66'
    },
    {
      name: 'Blue',
      code: '#3399ff'
    },
    {
      name: 'Purple',
      code: '#cc00ff'
    },
    {
      name: 'Orange',
      code: '#eb9b34'
    },
    {
      name: 'Yellow',
      code: '#e6e481'
    }
  ];

  const Game = {
    name: 'War',
    setup: () => {
      const players = {};
      const countries = {};

      Object.entries([...Array(numberOfPlayers + numberOfBots).keys()]).forEach(([playerId]) => {
        players[playerId] = {
          color: playersColors[playerId],
          isAi: playerId >= numberOfPlayers,
          unassignedTroops: utils.calculateInitialTroops(numberOfPlayers),
          cards: [],
          shouldReceiveCard: false,
          numberOfOwnedCountries: 0
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
