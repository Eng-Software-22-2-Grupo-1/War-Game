import PropTypes from 'prop-types';
import { useState } from 'react';

const GameOptionsPage = ({ onOptionsSubmit }) => {
  const [gameOptions, setGameOptions] = useState({
    numberOfPlayers: 3,
    map: null,
    mode: null
  });

  return (
    <>
      <div>GameOptionsPage</div>

      <form>
        <select
          name="numberOfPlayers"
          id="numberOfPlayers"
          defaultValue={3}
          required
          onChange={(e) => {
            const options = gameOptions;

            options.numberOfPlayers = e.target.value;

            setGameOptions(options);
          }}>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>

        <input
          type="submit"
          onClick={() => {
            onOptionsSubmit(gameOptions);
          }}
        />
      </form>
    </>
  );
};

GameOptionsPage.propTypes = {
  onOptionsSubmit: PropTypes.object.isRequired
};

export default GameOptionsPage;
