import utils from '../shared/utils';

// Moves
const attackCountryValidation = ({
  G,
  ctx,
  attackerId,
  defenderId,
  numOfTroops,
  numOfAttackDice,
  numOfDefenseDice
}) => {
  const countries = { ...G.countries };

  return (
    countries[attackerId].owner === ctx.currentPlayer &&
    countries[defenderId].owner !== ctx.currentPlayer &&
    countries[attackerId].adjacencyList.includes(defenderId) &&
    utils.isBetween(numOfAttackDice, 1, 3) &&
    countries[attackerId].troops >= numOfAttackDice + 1 &&
    utils.isBetween(numOfDefenseDice, 1, 2) &&
    countries[defenderId].troops >= numOfDefenseDice &&
    numOfTroops > 1
  );
};

const occupyCountryValidation = (G, ctx, countryId) => {
  return G.countries[countryId].owner === null && G.players[ctx.currentPlayer].troops > 0;
};

const reinforceCountryValidation = (G, ctx, countryId, numOfTroops) => {
  return (
    G.countries[countryId].owner === ctx.currentPlayer &&
    G.players[ctx.currentPlayer].troops >= numOfTroops
  );
};

const moveTroopsValidation = (G, ctx, originCountryId, destinyCountryId, numOfTroops) => {
  return (
    G.countries[originCountryId].owner === ctx.currentPlayer &&
    G.countries[destinyCountryId].owner === ctx.currentPlayer &&
    G.countries[originCountryId].adjacencyList.includes(destinyCountryId) &&
    numOfTroops > G.countries[originCountryId].troops
  );
};

const exchangeCardsValidation = (selectedCards) => {
  return (
    selectedCards.lenght === 3 &&
    (selectedCards.every((card) => card.type === card[0].type) ||
      selectedCards.some((card) => card.type === 'Wild') ||
      utils.isEveryItemUnique(selectedCards, 'type'))
  );
};

// Actions
const conquerCountryValidation = (G, ctx, numberOfTroops) => {
  return (
    G.players[ctx.currentPlayer].conquest &&
    utils.isBetween(
      numberOfTroops,
      G.players[ctx.currentPlayer].conquest.minOfTroops,
      G.players[ctx.currentPlayer].conquest.maxOfTroops
    )
  );
};

const receiveTroopsValidation = (G, ctx) => {};

export default {
  attackCountryValidation,
  occupyCountryValidation,
  reinforceCountryValidation,
  moveTroopsValidation,
  exchangeCardsValidation,
  conquerCountryValidation,
  receiveTroopsValidation
};
