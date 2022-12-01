import PropTypes from 'prop-types';

import EndTurnButton from '../components/EndTurnButton';
import PhaseIndicator from '../components/PhaseIndicator';
import PlayersInfo from '../components/PlayersInfo';

const Hud = ({ players, currentPlayerColor, gamePhase, onEndTurnClick, currentPlayer }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <PhaseIndicator gamePhase={gamePhase} />
        <PlayersInfo players={players} currentPlayer={currentPlayer}/>
        {/* <PlayerIndicator currentPlayerColor={currentPlayerColor}/> */}
        <EndTurnButton onEndTurnClick={onEndTurnClick} />
      </div>
    </>
  );
};

export default Hud;

Hud.propTypes = {
  players: PropTypes.object.isRequired,
  gamePhase: PropTypes.string.isRequired,
  onEndTurnClick: PropTypes.func.isRequired,
  currentPlayerColor: PropTypes.string.isRequired,
  currentPlayer: PropTypes.string.isRequired
};
