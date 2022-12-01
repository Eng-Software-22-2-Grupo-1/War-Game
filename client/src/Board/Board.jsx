/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';

import Hud from '../Hud';
import { SvgImage } from "../Maps/SvgImage";
import WorldMap from "../Maps/WorldMap";
import './Board.css';


const Board = ({ ctx, G, moves, events }) => {
    const [selectedCountry, setSelectedCountry] = useState(-1);
    const [selectedNumberOfTroops, setSelectedNumberOfTroops] = useState(0);

    const gameMap = WorldMap
    const numberOfReinforcementTroopsDuringReinforcementPhase = 1;

    const handleStageEnd = () => {
        events.endStage();
    }

    const handleEndTurnClick = () => {
        events.endTurn()
    }   

    const handleOcupation = (countryId) => {
        moves.occupyCountry(countryId);
    }

    const handleReinforcement = (countryId) => {
        if (ctx.phase === 'reinforcement') {
            moves.reinforceCountry(countryId, numberOfReinforcementTroopsDuringReinforcementPhase);
            return
        }
        moves.reinforceCountry(countryId, selectedNumberOfTroops);
    }

    const handleWar = (countryId) => {
        // Cards trading
        // Reinforcement

        // Attack
        // Fortification
    }

    const handleGamePhase = (countryId) => {
        switch (ctx.phase) {
            case 'ocupation':
                handleOcupation(countryId)
                break
            case 'reinforcement':
                handleReinforcement(countryId)
                break
            case 'war':
                handleWar(countryId)
                break
        }
    }

    const handleCountryClick = (event) => {
        const countryId = event.target.id
        setSelectedCountry(countryId)
        handleGamePhase(countryId)
    }

    return (
        <div className='backgroundTable'>
            <SvgImage image={gameMap.image} map={WorldMap} countries={G.countries} players={G.players} handleClick={handleCountryClick}/>
            <Hud players={G.players} currentPlayerColor={G.players[ctx.currentPlayer].color.name} gamePhase={ctx.phase} onEndTurnClick={handleEndTurnClick} currentPlayer={ctx.currentPlayer}/>
        </div>
    )
}


Board.propTypes = {
    ctx: PropTypes.object.isRequired,
    G: PropTypes.object.isRequired,
    moves: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired
}



export default Board