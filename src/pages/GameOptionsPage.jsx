import PropTypes from 'prop-types';
import { useState } from 'react';

const GameOptionsPage = ({ onOptionsSubmit }) => {
  const [gameOptions, setGameOptions] = useState({ numberOfPlayers: 0 });

  return (
    <>
      <div>GameOptionsPage</div>

      <select name="numberOfPlayers" id="numberOfPlayers">
        <option value="3">3</option>
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
