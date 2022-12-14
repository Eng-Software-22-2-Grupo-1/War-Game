import utils from '../shared/utils';
import Validation from './Validation';

const conquerCountry = ({ G, ctx }, numOfTroops) => {
  if (
    Validation.conquerCountryValidation({
      G,
      ctx,
      numOfTroops
    })
  ) {
    const conquestLog = G.players[ctx.currentPlayer].conquest;

    G.countries[conquestLog.countryId].onwer = ctx.currentPlayer;
    G.countries[conquestLog.countryId].troops = numOfTroops;

    if (
      Object.entries(G.countries).every(
        ([countryId, country]) => country.owner !== conquestLog.conqueredPlayer
      )
    ) {
      G.players[ctx.currentPlayer].cards = [
        ...G.players[ctx.currentPlayer].cards,
        ...G.players[conquestLog.conqueredPlayer].cards
      ];

      delete G.players[conquestLog.conqueredPlayer];
    }

    delete G.players[ctx.currentPlayer].conquest;

    G.players[ctx.currentPlayer].shouldReceiveCard = true;
  }
};

const receiveTroops = ({ G, ctx }) => {
  const numOfOwnedCountries = utils.calculateNumberOfOwnedCountries(G.countries, ctx.currentPlayer);
  const numOfTroops = utils.calculateNumberOfTroopsToBeReceived(numOfOwnedCountries);
  G.players[ctx.currentPlayer].unassignedTroops += numOfTroops;
};

export { conquerCountry, receiveTroops };
