import PropTypes from 'prop-types';
import { useState } from 'react';
import './Path.css';

const Path = ({ path, title, playerColor, attackStatus, handleClick, text, troopsCount }) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  const style = {
    fill: playerColor || path.style.fill,
    fillOpacity: playerColor ? 0.4 : 0,
    fillRule: path.style.fillRule,
    strokeWidth: hover ? 3 : 1,
    stroke: "black",
    strokeMiterlimit: path.style.strokeMiterlimit,
    strokeOpacity: path.style.strokeOpacity
  };

  return (
    <>
      <path
        d={path.getAttribute('d')}
        style={style}
        id={path.id}
        className={`country ${attackStatus}`}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <title>{title}</title>
        </path>
      <text
        fontWeight={'bold'}
        x={text.getAttribute('x')}
        y={text.getAttribute('y')}>
        {troopsCount}
      </text>
    </>
  );
};

Path.propTypes = {
  path: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  playerColor: PropTypes.string,
  attackStatus: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
  troopsCount: PropTypes.number.isRequired
};

export default Path;
