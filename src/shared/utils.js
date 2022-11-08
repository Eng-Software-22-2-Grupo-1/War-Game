function calculateInitialTroops(numberOfPlayers) {
  switch (numberOfPlayers) {
    case 3:
      return 35;
    case 4:
      return 30;
    case 5:
      return 25;
    case 6:
      return 20;
  }
}

export default { calculateInitialTroops };
