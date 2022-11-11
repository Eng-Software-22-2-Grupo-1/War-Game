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
  const isAttackerTheCurrentPlayer =
    parseInt(G.countries[attackerId].owner) === parseInt(ctx.currentPlayer);
  const isDefenderNotTheCurrentPlayer =
    parseInt(G.countries[defenderId].owner) !== parseInt(ctx.currentPlayer);
  const isAttackerAdjacentToDefender = G.countries[attackerId].adjacencyList.includes(defenderId);
  const isNumberOfAttackDiceValid = utils.isBetween(numOfAttackDice, 1, 3);
  const isNumberOfDefenseDiceValid = utils.isBetween(numOfDefenseDice, 1, 2);
  const attackerHasEnoughTroops = G.countries[attackerId].troops >= numOfAttackDice + 1;
  const defensorHasEnoughTroops = G.countries[defenderId].troops >= numOfDefenseDice;

  return (
    isAttackerTheCurrentPlayer &&
    isDefenderNotTheCurrentPlayer &&
    isAttackerAdjacentToDefender &&
    isNumberOfAttackDiceValid &&
    attackerHasEnoughTroops &&
    isNumberOfDefenseDiceValid &&
    defensorHasEnoughTroops &&
    numOfTroops > 1
  );
};

const occupyCountryValidation = (G, ctx, countryId) => {
  const isTerrioryUnoccupied = G.countries[countryId].owner === null;
  const doesPlayerHasUnassignedTroops = G.players[ctx.currentPlayer].unassignedTroops > 0;
  return isTerrioryUnoccupied && doesPlayerHasUnassignedTroops;
};

const reinforceCountryValidation = (G, ctx, countryId, numOfTroops) => {
  const isReinforcerTheOwner =
    parseInt(G.countries[countryId].owner) === parseInt(ctx.currentPlayer);
  const hasEnoughTroops =
    parseInt(G.players[ctx.currentPlayer].unassignedTroops) >= parseInt(numOfTroops);
  return isReinforcerTheOwner && hasEnoughTroops;
};

const moveTroopsValidation = (G, ctx, originCountryId, destinyCountryId, numOfTroops) => {
  const isMoverTheOwner =
    parseInt(G.countries[originCountryId].owner) === parseInt(ctx.currentPlayer);
  const isMoverTheOwnerOfDestinationCountry =
    parseInt(G.countries[destinyCountryId].owner) === parseInt(ctx.currentPlayer);
  const hasEnoughTroops = parseInt(G.countries[originCountryId].troops) >= parseInt(numOfTroops);
  const isDestinationCountryAdjacent =
    G.countries[originCountryId].adjacencyList.includes(destinyCountryId);
  return (
    isMoverTheOwner &&
    isMoverTheOwnerOfDestinationCountry &&
    isDestinationCountryAdjacent &&
    hasEnoughTroops
  );
};

const exchangeCardsValidation = (selectedCards) => {
  const hasSelectedThreeCards = selectedCards.length === 3;
  const isTradingThreeEqualCards = selectedCards.every(
    (card) => card.type === selectedCards[0].type
  );
  const isTradingWithWildCards = selectedCards.some((card) => card.type === 'Wild');
  const isTradingThreeUniqueCards = utils.isEveryItemUnique(selectedCards, 'type');

  return (
    hasSelectedThreeCards &&
    (isTradingThreeEqualCards || isTradingWithWildCards || isTradingThreeUniqueCards)
  );
};

// Actions
const conquerCountryValidation = (G, ctx, numberOfTroops) => {
  const playesHasConquest = G.players[ctx.currentPlayer].conquest;
  const numberOfTroopsIsValid = utils.isBetween(
      numberOfTroops,
      G.players[ctx.currentPlayer].conquest.minOfTroops,
      G.players[ctx.currentPlayer].conquest.maxOfTroops
    )

  return (
    playesHasConquest &&
    numberOfTroopsIsValid
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
