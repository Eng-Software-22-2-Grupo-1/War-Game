import WorldMap from '../Maps/WorldMap';
import Moves from './Moves';
import utils from './utils';

const createGame = (options) => {
  const gameMap = WorldMap;
  const { numberOfPlayers } = options;
  const playersColors = [
    {
      color: 'red',
      code: ''
    },
    {
      color: 'green',
      code: ''
    },
    {
      color: 'blue',
      code: ''
    },
    {
      color: 'purple',
      code: ''
    },
    {
      color: 'white',
      code: ''
    },
    {
      color: 'black',
      code: ''
    }
  ];

  const Game = {
    setup: () => {
      const countries = Object.entries(gameMap.countryNames).map(([countryId, countryName]) => {
        return {
          name: countryName,
          owner: null,
          troops: 0
        };
      });
      const players = {};

      for (let i = 0; i < numberOfPlayers; i++) {
        players[`${i}`] = {
          color: playersColors[i],
          armies: utils.calculateInitialArmies(numberOfPlayers),
          cards: []
        };
      }

      return {
        countries,
        players
      };
    },
    moves: {
      attackCountry: Moves.attackCountry,
      occupyCountry: Moves.occupyCountry,
      reinforceCountry: Moves.reinforceCountry
    },
    turn: {},
    phases: {
      ocupation: {
        endIf: ({ G, ctx }) =>
          Object.keys(G.countries).filter((key) => G.countries[key].owner === null).length === 0,
        moves: { occupyCountry: Moves.occupyCountry },
        start: true,
        next: 'reinforcement'
      },
      reinforcement: {
        endIf: ({ G, ctx }) => Object.values(G.unnasinedTroops).every((troops) => troops === 0),

        moves: { reinforceCountry: Moves.reinforceCountry }
      },
      war: {
        onBegin: ({ G, ctx }) => {
          const currentPlayer = ctx.currentPlayer;
          const unassignedUnits = { ...G.unassignedUnits };

          const numOwnedCountries = Object.keys(G.countries).reduce(
            (count, key) => count + (G.countries[key].owner === currentPlayer ? 1 : 0),
            0
          );
          // TODO: add bonus for continents and cards
          unassignedUnits[currentPlayer] += Math.max(Math.floor(numOwnedCountries / 3), 3);
          return { ...G, unassignedUnits };
        },
        moves: { attackCountry: Moves.attackCountry, reinforceCountry: Moves.reinforceCountry }
      }
    },
    endIf: ({ G, ctx }) => {
      const owners = G.countries.map((country) => country.owner);

      if (owners.every((owner) => owner === owners[0])) {
        return G.players[`${owners[0]}`];
      }
    }
  };

  return Game;
};

export default createGame;
