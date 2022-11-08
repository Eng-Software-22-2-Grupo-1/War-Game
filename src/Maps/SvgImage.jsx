import React, { useEffect, useState } from 'react';

import { AttackingStateEnum } from './RiskGameBoard';

const SvgImage2 = ({ image }) => {
  const [paths, setPaths] = useState([]);
  const [pathTextDict, setPathTextDict] = useState({});

  useEffect(() => {
    const parsedDoc = new DOMParser().parseFromString(image, 'text/html');
    const paths = parsedDoc.getElementsByTagName('svg')[0].getElementsByTagName('path');
    const text = parsedDoc.getElementsByTagName('svg')[0].getElementsByTagName('text');

    const pathsTexts = paths.reduce((acc, path) => {
      const pathId = +path.id.split('-')[1];
      const pathText = text.namedItem(pathId);

      return { ...acc, [pathId]: pathText };
    });

    setPaths(paths);
    setPathTextDict(pathsTexts);
  }, []);
};

export class SvgImage extends React.Component {
  constructor(props) {
    super(props);
    const parsedDoc = new DOMParser().parseFromString(props.map.image, 'text/html');
    const paths = parsedDoc.getElementsByTagName('svg')[0].getElementsByTagName('path');
    const text = parsedDoc.getElementsByTagName('svg')[0].getElementsByTagName('text');
    const lines = parsedDoc.getElementsByTagName('line');

    const pathTextDict = {};
    const pathsArray = Array.from(paths);

    for (let i = 0; i < pathsArray.length; i++) {
      const path = pathsArray[i];
      const idNum = +path.id.split('_')[1];
      const pathsText = text.namedItem(idNum);
      pathTextDict[idNum] = pathsText;
    }

    this.state = { paths, pathTextDict, lines };
  }

  render() {
    const paths = Array.from(this.state.paths).map((path) => {
      const style = {
        fill: path.style.fill || 'rgb(200,200,200)',
        fillOpacity: path.style.fillOpacity || 1,
        fillRule: path.style.fillRule || 'non-zero',
        strokeWidth: path.style.strokeWidth || 3,
        stroke: path.style.stroke || 'rgb(0,255,0)',
        strokeMiterlimit: path.style.strokeMiterlimit || 3,
        stokeOpacity: path.style.strokeOpacity || 0
      };
      const idNum = +path.id.split('_')[1];
      const countryState =
        path.id.split('_')[0] === 'Territory' ? this.props.countries[idNum] : null;
      const countryName =
        path.id.split('_')[0] === 'Territory' ? this.props.map.countryName[idNum] : null;

      let attackState = AttackingStateEnum.normal;

      if (+this.props.attackingCountry === idNum) attackState = AttackingStateEnum.attacking;
      else if (this.props.defendingCountries.indexOf(+idNum) > -1)
        attackState = AttackingStateEnum.being_attacked;

      return (
        <ReactPath
          key={path.id}
          state={countryState}
          attackState={attackState}
          d={path.getAttribute('d')}
          style={style}
          id={path.id}
          name={countryName}
          text={this.state.pathTextDict[idNum]}
          onClick={this.props.onClick}
        />
      );
    });

    const lines = Array.from(this.state.lines).map((line, idx) => {
      return (
        <line
          key={idx}
          x1={line.getAttribute('x1')}
          y1={line.getAttribute('y1')}
          x2={line.getAttribute('x2')}
          y2={line.getAttribute('y2')}
          style={{ stroke: 'rgb(0,0,0)', strokeWidth: 1 }}></line>
      );
    });

    return (
      <svg
        width="895"
        height="532"
        version="1.0"
        data-revision="112"
        style={{ overflow: 'visible' }}>
        <rect
          x="0.01495404"
          y="0.05651855"
          width="894.9685"
          height="531.9553"
          rx="0"
          ry="0"
          style={{ fill: '#374548', fillOpacity: 1 }}
          id="obj1"></rect>
        <g>
          {paths}
          {lines}
        </g>
      </svg>
    );
  }
}
