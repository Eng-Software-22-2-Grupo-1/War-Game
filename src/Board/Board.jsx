import PropTypes from 'prop-types';

import { SvgImage } from "../Maps/SvgImage";
import WorldMap from "../Maps/WorldMap";
import './Board.css';


const Board = ({ ctx, G, moves }) => {
    // const [selectedCountry, setSelectedCountry] = useState(null);
    const gameMap = WorldMap

    return (
        <div className='backgroundTable'>
            <SvgImage image={gameMap.image} map={WorldMap} countries={G.countries} players={G.players} handleClick={(e) => console.log(e.target.id)}/>
        </div>
    )
}


Board.propTypes = {
    ctx: PropTypes.object.isRequired,
    G: PropTypes.object.isRequired,
    moves: PropTypes.object.isRequired
}



export default Board