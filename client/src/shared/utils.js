const translateColor = (color) => {
  switch (color.toLowerCase()) {
    case "red":
      return "Vermelho"
    case "blue":
      return "Azul"
    case "green":
      return "Verde"
    case "purple":
      return "Roxo"
    case "orange":
      return "Laranja"
    default:
      return "Amarelo"
  }
}


const translateGamePhase = (phase) => {
  switch (phase) {
    case "reinforcement":
      return "Reforço"
    case "war":
      return "Guerra"
    case "ocupation":
      return "Ocupação"
    default:
      return null
  }
}


const calculateInitialTroops = (numOfPlayers) => {
  switch (numOfPlayers) {
    case 3:
      return 35;
    case 4:
      return 30;
    case 5:
      return 25;
    case 6:
      return 20;
    default:
      return null;
  }
};

const calculateTroopsFromCardExchange = (numOfTrades) => {
  switch (numOfTrades) {
    case 0:
      return 4;
    case 1:
      return 6;
    case 2:
      return 8;
    case 3:
      return 10;
    case 4:
      return 12;
    default:
      return (numOfTrades - 2) * 5;
  }
};

const isBetween = (value, min, max) => {
  return value >= min && value <= max;
};

const rollDice = (numberOfDice) => {
  const results = [];

  for (let i = 0; i < numberOfDice; i++) {
    results.push(Math.floor(Math.random() * (6 - 1)) + 1);
  }

  return results;
};

const isEveryItemUnique = (array, prop) => {
  const uniques = new Set(array.map((item) => item[prop]));

  return [...uniques].length === array.length;
};


const calculateNumberOfOwnedCountries = (countries, playerId) => {
  return Object.entries(countries).reduce((acc, [countryId, country]) => {
    if (parseInt(country.owner) === parseInt(playerId)) {
      return acc + 1;
    }
    return acc;
  }, 0)
}

const calculateNumberOfTroopsToBeReceived = (numOfCountriesOwned) => {
  return Math.max(3, Math.floor(numOfCountriesOwned / 3))
}

const drawCard = () => {
  const typesOfCards = ["Infantry", "Cavalry", "Artillery", "Wild"]
  const type = typesOfCards[Math.floor(Math.random() * 4)]

  return { type }
}

export default {
  calculateInitialTroops,
  calculateTroopsFromCardExchange,
  isBetween,
  rollDice,
  isEveryItemUnique,
  calculateNumberOfOwnedCountries,
  calculateNumberOfTroopsToBeReceived,
  drawCard,
  translateColor,
  translateGamePhase
};
