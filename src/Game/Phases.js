import Moves from './Moves';

const ocupation = {
  onBegin: ({ G, ctx, events, random, ...plugins }) => G,
  onEnd: ({ G, ctx, events, random, ...plugins }) => G,
  endIf: ({ G, ctx }) =>
    Object.values(G.countries).filter((country) => country.owner === null).length === 0,
  moves: { occupyCountry: Moves.occupyCountry },
  turn: {
    // Define
  },
  start: true,
  next: 'reinforcement'
};

const reinforcement = {
  onBegin: ({ G, ctx, events, random, ...plugins }) => G,
  onEnd: ({ G, ctx, events, random, ...plugins }) => G,
  endIf: ({ G, ctx }) => Object.values(G.players).every((player) => player.troops === 0),
  moves: { reinforceCountry: Moves.reinforceCountry },
  turn: {
    // Define
  },
  next: 'war'
};

const war = {
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
  moves: { attackCountry: Moves.attackCountry, reinforceCountry: Moves.reinforceCountry },
  turn: {
    // Define
  }
};

export default {
  ocupation,
  reinforcement,
  war
};
