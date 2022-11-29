import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Indicator = ({ info, indication, translateFunction }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#cccccc',
        height: 'fit-content',
        marginBottom: '50px',
        textAlign: 'center'
      }}>
      <Typography variant="h3">
        {indication}: {translateFunction(info) || info}
      </Typography>
    </Box>
  );
};

Indicator.propTypes = {
  info: PropTypes.string.isRequired,
  indication: PropTypes.string.isRequired,
  translateFunction: PropTypes.func
};

export default Indicator;
