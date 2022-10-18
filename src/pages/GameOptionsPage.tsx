import PropTypes from 'prop-types';
import { ReactElement } from 'react';

export interface GameOptions {
  numberOfPlayers: number;
}

interface Props {
  onOptionsSubmit: (newOptions: GameOptions) => void;
}

const GameOptionsPage = ({ onOptionsSubmit }: Props): ReactElement => {
  return <div>GameOptionsPage</div>;
};

GameOptionsPage.propTypes = {
  onOptionsSubmit: PropTypes.object.isRequired
};

export default GameOptionsPage;
