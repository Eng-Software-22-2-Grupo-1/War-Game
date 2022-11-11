import utils from '../shared/utils';
import Validation from './Validation';

const attackCountry = (
  { G, ctx },
  attackerId,
  defenderId,
  numOfTroops,
  numOfAttackDice,
  numOfDefenseDice
) => {
  if (
    Validation.attackCountryValidation({
      G,
      ctx,
      attackerId,
      defenderId,
      numOfTroops,
      numOfAttackDice,
      numOfDefenseDice
    })
  ) {
    const attackDiceResults = utils.rollDice(numOfAttackDice);
    const defenseDiceResults = utils.rollDice(numOfDefenseDice);

    while (
      attackDiceResults.length &&
      defenseDiceResults.length &&
      G.countries[defenderId].troops > 0
    ) {
      const highestAttackDie = Math.max(...attackDiceResults);
      const highestDefenseDie = Math.max(...defenseDiceResults);

      G.countries[highestAttackDie > highestDefenseDie ? defenderId : attackerId].troops--;

      attackDiceResults.splice(attackDiceResults.indexOf(highestAttackDie), 1);
      defenseDiceResults.splice(defenseDiceResults.indexOf(highestDefenseDie), 1);
    }

    if (G.countries[defenderId].troops === 0) {
      G.players[ctx.currentPlayer].conquest = {
        countryId: defenderId,
        conqueredPlayer: G.countries[defenderId].owner,
        minOfTroops: numOfAttackDice,
        maxOfTroops: G.countries[attackerId].troops - 1
      };
    }
  }
};

const occupyCountry = ({ G, ctx, events }, countryId) => {
  if (Validation.occupyCountryValidation(G, ctx, countryId)) {
    G.countries[countryId] = { ...G.countries[countryId], owner: ctx.currentPlayer, troops: 1 };
    G.players[ctx.currentPlayer].unassignedTroops--;
    events.endTurn();
  }
};

const reinforceCountry = ({ G, ctx }, countryId, numOfTroops) => {
  if (Validation.reinforceCountryValidation(G, ctx, countryId, numOfTroops)) {
    if(ctx.phase === 'reinforcement') {
      numOfTroops = 1
    }
    G.countries[countryId].troops += numOfTroops;
    G.players[ctx.currentPlayer].unassignedTroops -= numOfTroops;
  }
};

const moveTroops = ({ G, ctx }, originCountryId, destinyCountryId, numOfTroops) => {
  if (Validation.moveTroopsValidation(G, ctx, originCountryId, destinyCountryId, numOfTroops)) {
    G.countries[originCountryId].troops -= numOfTroops;
    G.countries[destinyCountryId].troops += numOfTroops;
  }
};

const exchangeCards = ({ G, ctx }, selectedCards) => {
  if (Validation.exchangeCardsValidation(selectedCards)) {
    G.players[ctx.currentPlayer].unassignedTroops += utils.calculateTroopsFromCardExchange(G.numOfSetsTraded);

    selectedCards.forEach((card) => {
      const selectedCardIndex = G.players[ctx.currentPlayer].cards.findIndex(
        (playerCard) => playerCard.type === card.type
      );

      G.players[ctx.currentPlayer].cards.splice(selectedCardIndex, 1);
    });

    G.numOfSetsTraded++;
  }
};

export { attackCountry, occupyCountry, reinforceCountry, moveTroops, exchangeCards };
