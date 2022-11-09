import PropTypes from 'prop-types';
import { useState } from 'react';
import './Path.css';

const Path = ({ path, title, playerColor, attackStatus, handleClick, text, troopsCount }) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  const style = {
    fill: playerColor || path.style.fill,
    fillOpacity: path.style.fillOpacity,
    fillRule: path.style.fillRule,
    strokeWidth: hover ? 3 : path.style.strokeWidth,
    stroke: path.style.stroke,
    strokeMiterlimit: path.style.strokeMiterlimit,
    stokeOpacity: path.style.strokeOpacity
  };

  return (
    <>
      <path
        d={path.getAttribute('d')}
        style={style}
        id={path.id}
        title={title}
        className={`country ${attackStatus}`}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}></path>
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
