import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './SvgImage.css';

import Path from './Path';


export const SvgImage = ({ image, map, players, countries, handleClick }) => {
  const [paths, setPaths] = useState([]);
  const [pathTextDict, setPathTextDict] = useState({});

  useEffect(() => {
    const parsedDoc = new DOMParser().parseFromString(image, 'text/html');
    const paths = parsedDoc.getElementsByTagName('svg')[0].getElementsByTagName('path');
    const text = parsedDoc.getElementsByTagName('svg')[0].getElementsByTagName('text');


    const pathsTexts = Array.from(paths).reduce((acc, path) => {
      const pathId = +path.id;
      const pathText = text.namedItem(pathId);
      return { ...acc, [pathId]: pathText };
    }, {});

    setPaths(paths);
    setPathTextDict(pathsTexts);
  }, []);


  const pathComponents = Array.from(paths).map((path) => {
    const pathId = +path.id;
    const pathText = pathTextDict[pathId];
    const countryName = map.countryNames[pathId];
    const troopsInCountry = countries[pathId].troops;

    const playerColor = countries[pathId].owner !== null ? players[countries[pathId].owner].color.code : 'transparent';
    
    return <Path key={pathId} path={path} title={countryName} text={pathText} troopsCount={troopsInCountry}  handleClick={handleClick} playerColor={playerColor}/>;
  })


  return (
    <div className='container'>
      <svg width="1400" height="938" version="1.0" data-revision="112" style={{overflow: "hidden"}} className='background'>
      <rect x="0.01495404" y="0.05651855" width="1399.9685" height="937.9553" rx="0" ry="0" style={{fill: "#374548", fillOpacity: 0}} id="obj1"></rect>
        <g>
          {pathComponents}
      </g>
      </svg>
    </div>)
};

SvgImage.propTypes = {
  image: PropTypes.string.isRequired,
  map: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  countries: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}
