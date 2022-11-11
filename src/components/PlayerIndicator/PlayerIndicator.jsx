import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import utils from '../../shared/utils';

const PlayerIndicator = ({ currentPlayerColor }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#cccccc',
        height: 'fit-content',
        marginBottom: '50px',
        textAlign: 'center',
      }}>
      <Typography variant="h3" >
        Turno: Jogador {utils.translateColor(currentPlayerColor)}
      </Typography>
    </Box>
  );
};

PlayerIndicator.propTypes = {
  currentPlayerColor: PropTypes.string.isRequired
};

export default PlayerIndicator;
