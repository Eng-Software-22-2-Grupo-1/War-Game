import WorldMap from '../Maps/WorldMap';

const isVictory = (countries) => {
  const owners = countries.map((country) => country.owner);
  return owners.every((owner) => owner === owners[0]);
};

const attackCountry = (G, ctx, attackerId, defenderId, numOfTroops) => {
  const countries = { ...G.countries };

  if (
    countries[attackerId].owner !== ctx.currentPlayer &&
    countries[defenderId].owner === ctx.currentPlayer
  ) {
    return;
  }

  console.log(countries);
};

const occupyCountry = (G, ctx, countryId) => {
  const countries = { ...G.countries };
  const unnasinedTroops = { ...G.unnasinedTroops };

  if (countries[countryId].owner === null && unnasinedTroops[ctx.currentPlayer] > 0) {
    countries[countryId] = { owner: ctx.currentPlayer, soldiers: 1 };
    unnasinedTroops[ctx.currentPlayer]--;
  }

  return { ...G, countries, unnasinedTroops };
};

const reinforceCountry = (G, ctx, countryId, numOfTroops) => {
  const countries = { ...G.countries };
  const unnasinedTroops = { ...G.unnasinedTroops };

  if (
    countries[countryId].owner === ctx.currentPlayer &&
    unnasinedTroops[ctx.currentPlayer] >= numOfTroops
  ) {
    countries[countryId].troops += numOfTroops;
    unnasinedTroops[ctx.currentPlayer] -= numOfTroops;
  }

  return { ...G, countries, unnasinedTroops };
};

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

      return {
        countries,
        unnasinedTroops
      };
    },
    moves: {
      reinforceCountry,
      attackCountry,
      occupyCountry
    },
    turn: {},
    phases: {
      ocupation: {
        endIf: (G, ctx) =>
          Object.keys(G.countries).filter((key) => G.countries[key].owner === null).length === 0,
        moves: { occupyCountry },
        start: true,
        next: 'reinforcement'
      },
      reinforcement: {
        endIf: (G, ctx) => Object.values(G.unnasinedTroops).every((troops) => troops === 0),

        moves: { reinforceCountry }
      },
      war: {
        onBegin: (G, ctx) => {
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
        moves: { attackCountry, reinforceCountry }
      }
    }
  };

  return Game;
};

export default createGame;
