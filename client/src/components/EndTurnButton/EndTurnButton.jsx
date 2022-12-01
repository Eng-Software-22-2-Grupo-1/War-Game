import Button from '@mui/material/Button';
import PropTypes from 'prop-types';


const EndTurnButton = ({onEndTurnClick, disabled}) => {
  return  (
    <>
        <Button variant="contained" onClick={onEndTurnClick}>Encerrar Turno</Button>
    </>
  )
}


EndTurnButton.propTypes ={
    onEndTurnClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default EndTurnButton