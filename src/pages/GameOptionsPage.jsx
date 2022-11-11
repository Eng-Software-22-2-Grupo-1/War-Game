import { Box, Button, Container, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

import WAR from '../assets/WAR.svg';
import './GameOptionsPage.css';

const GameOptionsPage = ({ onOptionsSubmit }) => {
  const [gameOptions, setGameOptions] = useState({
    numberOfPlayers: 3,
    numberOfBots: 0,
    map: null,
    mode: null
  });

  const [availableBots, setAvailableBots] = useState([...Array(gameOptions.numberOfPlayers).keys()]);

  const handleClick = () => {
    onOptionsSubmit(gameOptions);
  };


  return (
    <Box className='options-background'>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "100px",
          height: "100vh"
        }}>
        <Box
          component="img"
          sx={{
            width: "50vh",
            background: "antiquewhite",
            padding: "15px",
            borderRadius: "10px"
          }}
          alt="War logo."
          src={WAR}
        />
        <Box style={{ display: "grid", alignItems: "center" }}>
          <p style={{ color: "white", fontWeight: "bold" }}>Quantidade de Jogadores</p>
          <Select
            style={{ width: "200px", backgroundColor: "white", fontWeight: "bold" }}
            id="demo-simple-select-helper"
            defaultValue={gameOptions.numberOfPlayers}
            onChange={(e) => {
              const options = gameOptions;

              options.numberOfPlayers = parseInt(e.target.value);

              setGameOptions(options);
              setAvailableBots([...Array(options.numberOfPlayers).keys()]);
              console.log(gameOptions);
            }}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
          <p style={{ color: "white", fontWeight: "bold" }}>Quantidade de Bots</p>
          <Select
            style={{ width: "200px", backgroundColor: "white", fontWeight: "bold" }}
            id="demo-simple-select-helper"
            defaultValue={gameOptions.numberOfBots}
            onChange={(e) => {
              const options = gameOptions;

              options.numberOfBots = parseInt(e.target.value);


              setGameOptions(options);
              console.log(gameOptions);

            }}
          >
            {availableBots.map(e => {
              return <MenuItem key={e} value={e}>{e}</MenuItem>
            })}
          </Select>
          <Button style={{ width: "200px", height: "60px", marginTop: "30px", backgroundColor: "#7D1815" }} variant="contained" disableElevation onClick={handleClick}>Jogar</Button>
        </Box>
      </Container >
    </Box>
  );
};

GameOptionsPage.propTypes = {
  onOptionsSubmit: PropTypes.func.isRequired
};

export default GameOptionsPage;
