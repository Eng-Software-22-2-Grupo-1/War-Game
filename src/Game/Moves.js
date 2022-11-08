// Revise
function attackCountry(G, ctx, attackerId, defenderId, numOfTroops, numOfDie) {
  const countries = { ...G.countries };

  if (
    countries[attackerId].owner !== ctx.currentPlayer ||
    countries[defenderId].owner === ctx.currentPlayer ||
    !countries[attackerId].adjacencyList.includes(defenderId) ||
    numOfTroops < 2
  ) {
    return;
  }

  console.log(countries);
}

// Revise
function occupyCountry(G, ctx, countryId) {
  const countries = { ...G.countries };
  const unnasinedTroops = { ...G.unnasinedTroops };

  if (countries[countryId].owner === null && unnasinedTroops[ctx.currentPlayer] > 0) {
    countries[countryId] = { owner: ctx.currentPlayer, soldiers: 1 };
    unnasinedTroops[ctx.currentPlayer]--;
  }

  return { ...G, countries, unnasinedTroops };
}

// Revise
function reinforceCountry(G, ctx, countryId, numOfTroops) {
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
}

export default { attackCountry, occupyCountry, reinforceCountry };
