import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

import utils from '../../shared/utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, colorCode }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  }
}));

const PlayersInfo = ({players, currentPlayer }) => {
  console.log("🚀 ~ file: PlayersInfo.jsx ~ line 30 ~ PlayersInfo ~ currentPlayer", currentPlayer)
  

  return (
    <TableContainer component={Paper} sx={{ width: 'fit-content' }}>
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Jogador</StyledTableCell>
          <StyledTableCell align="right">Territórios Ocupados</StyledTableCell>
          <StyledTableCell align="right">Tropas Disponíveis</StyledTableCell>
          <StyledTableCell align="right">Cartas</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(players).map(([playerId, player]) => (
          <StyledTableRow key={playerId}  sx={{backgroundColor: playerId === currentPlayer ? player.color.code : null}}>
            <StyledTableCell component="th" scope="row">
              {utils.translateColor(player.color.name)}
            </StyledTableCell>
            <StyledTableCell align="right">{player.numberOfOwnedCountries}</StyledTableCell>
            <StyledTableCell align="right">{player.unassignedTroops}</StyledTableCell>
            <StyledTableCell align="right">{player.cards}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

PlayersInfo.propTypes = {
    players: PropTypes.object.isRequired,
    currentPlayer: PropTypes.string.isRequired
}


export default PlayersInfo

