import PropTypes from 'prop-types';
import { useState } from 'react';

const GameOptionsPage = ({ onOptionsSubmit }) => {
  const [gameOptions, setGameOptions] = useState({
    players: [],
    numberOfPlayers: 0,
    map: null,
    mode: null,
    unitsPerPlayer: null
  });

  return (
    <>
      <div>GameOptionsPage</div>

      <select name="numberOfPlayers" id="numberOfPlayers">
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <input
        type="submit"
        onClick={() => {
          setGameOptions({ numberOfPlayers: 5 });

          onOptionsSubmit(gameOptions);
        }}
      />
    </>
  );
};

GameOptionsPage.propTypes = {
  onOptionsSubmit: PropTypes.object.isRequired
};

export default GameOptionsPage;
