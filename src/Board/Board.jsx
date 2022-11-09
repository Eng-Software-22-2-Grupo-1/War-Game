import PropTypes from 'prop-types';

import { SvgImage } from "../Maps/SvgImage";
import WorldMap from "../Maps/WorldMap";


const Board = ({ ctx, G, moves }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const gameMap = WorldMap

    return (
        <div>
            <SvgImage image={gameMap.image} map={WorldMap} countries={G.countries} players={G.players} handleClick={(e) => console.log(e.target)}/>
        </div>
    )
}


Board.propTypes = {
    ctx: PropTypes.object.isRequired,
    G: PropTypes.object.isRequired,
    moves: PropTypes.object.isRequired
}



export default Board