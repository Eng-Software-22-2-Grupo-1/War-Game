import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import utils from '../../shared/utils';

const PhaseIndicator = ({ gamePhase }) => {
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
        Fase atual: {utils.translateGamePhase(gamePhase)}
      </Typography>
    </Box>
  );
};

PhaseIndicator.propTypes = {
  gamePhase: PropTypes.string.isRequired
};

export default PhaseIndicator;
