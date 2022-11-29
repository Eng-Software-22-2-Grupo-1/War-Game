import PropTypes from 'prop-types';

import EndTurnButton from '../components/EndTurnButton';
import Indicator from '../components/Indicator';
import PlayersInfo from '../components/PlayersInfo';
import utils from '../shared/utils';

const Hud = ({ players, currentPlayerColor, gamePhase, onEndTurnClick, currentPlayer }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <Indicator indication='Fase atual' info={gamePhase} translateFunction={utils.translateGamePhase} />
        <PlayersInfo players={players} currentPlayer={currentPlayer}/>
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
