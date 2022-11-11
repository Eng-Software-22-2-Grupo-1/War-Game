import utils from '../shared/utils';
import { receiveTroops } from './Actions';
import { attackCountry, exchangeCards, moveTroops, occupyCountry, reinforceCountry } from './Moves';

const ocupation = {
  endIf: ({ G, ctx }) =>
    Object.entries(G.countries).every(([countryId, country]) => country.owner !== null),
  moves: { occupyCountry },
  start: true,
  next: 'reinforcement'
};

const reinforcement = { 
  endIf: ({ G, ctx }) => Object.values(G.players).every((player) => player.unassignedTroops === 0),
  moves: { reinforceCountry },
  turn: { minMoves: 1, maxMoves: 1 },
  next: 'war'
};

const war = {
  moves: { attackCountry, reinforceCountry },
  turn: {
    onBegin: ({ G, ctx, events }) => {
      receiveTroops({G, ctx});
      const isPlayerAbleToTradeCards = G.players[(ctx.currentPlayer)].cards.length > 3
      if (!isPlayerAbleToTradeCards) {
        events.setStage("reinforcement");
      }
      
      return G
    },
    onEnd: ({ G, ctx, events }) => {
      if(G.players[ctx.currentPlayer].shouldReceiveCard) {
        const newCard = utils.drawCard(G.cards);
        G.players[ctx.currentPlayer].cards.push(newCard);

        delete G.players[ctx.currentPlayer].shouldReceiveCard;
      }
      return G
    },
    stages: {
      tradeCards:{
        moves: {exchangeCards},
        next:'reifocement'
      },
      reifocement: {
        moves: {reinforceCountry},
        next: 'attack'
      },
      attack: {
        moves: { attackCountry },
        next: 'fortification'
      },
      fortification: {
        moves: {moveTroops}
      }
    }
  }
};

export default {
  ocupation,
  reinforcement,
  war
};
