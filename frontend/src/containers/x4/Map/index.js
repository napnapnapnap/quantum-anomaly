import React, {useEffect, useRef, useState} from 'react';
import {fetchX4Map} from '../../../redux/x4Actions';
import {connect} from 'react-redux';
import './Map.scss';
import {backgroundLabelRectWidth, getHexagonPoints, maps, resolveHexagonCenterByProps} from '../helpers';
import Stations from './Stations';
import {Gates, SuperHighways} from './Travel';

const resourceColors = {
  ore: '#ff8c00',
  silicon: '#d4d3cf',
  nividium: '#4b0091',
  ice: '#ffffff',
  hydrogen: '#c5ffff',
  helium: '#ffeec1',
  methane: '#165ca2'
}

const Resources = props => {
  const offsets = {
    ore: {x: props.small ? -10 : -22, y: props.small ? 13: 33},
    silicon: {x: props.small ? -2 : -14, y: props.small ? 13: 33},
    ice: {x: props.small ? 6 : -6, y: props.small ? 13: 33},
    hydrogen: {x: props.small ? -10 : -22, y: props.small ? 19: 40},
    helium: {x: props.small ? -2 : -14, y: props.small ? 19: 40},
    methane: {x: props.small ? 6 : -6, y: props.small ? 19: 40},
    nividium: {x: props.small ? 14 : 2, y: props.small ? 13: 33}
  }
  const {resources} = props;
  if (!resources) return null;
  return Object.keys(resources).map(key => {
    if (resources[key] === 0) return null;
    return (
      <React.Fragment key={Math.random()}>
        <rect x={props.x + offsets[key].x - 2.9} y={props.y + offsets[key].y - 4.25}
              width='6.2' height='5.1' fill={resourceColors[key]}
              stroke={resourceColors[key]} strokeWidth='0' rx='10px'
        >
          <title>{key}</title>
        </rect>
        <text textAnchor='middle' fontSize='5px' fill='black' x={props.x + offsets[key].x} y={props.y + offsets[key].y}>
          {resources[key]}
        </text>
      </React.Fragment>
    );
  });
};

const Sectors = props => (
  props.sectors.map((sector, index) => {
    let sectorOwner = props.owner;
    const backgroundWidth = (sector.name.length * 3.7) - backgroundLabelRectWidth(sector.name);
    if (sector.name === 'Hatikvah\'s Choice I') sectorOwner = 'hatikvah';
    if (sector.name === 'Hewa\'s Twin IV The Cove') sectorOwner = 'none';

    const {sectorsPosition, position} = props;
    const color = sectorsPosition !== 'singular' ? maps.colors[sectorOwner].border : maps.colors[props.owner].border;

    return (
      <React.Fragment key={Math.random()}>
        {sectorsPosition !== 'singular' && !props.text && (
          <polyline fill='black'
                    stroke={color}
                    points={getHexagonPoints(resolveHexagonCenterByProps(sectorsPosition, index, position), 'small')}/>
        )}

        {sectorsPosition !== 'singular' && props.text && (
          <>
            <rect x={resolveHexagonCenterByProps(sectorsPosition, index, position).x - backgroundWidth / 2}
                  y={resolveHexagonCenterByProps(sectorsPosition, index, position).y - 16}
                  width={backgroundWidth} height='6' fill={color}
                  stroke={color} strokeWidth='0.2'/>
            <text textAnchor='middle' fontSize='7px' fill='white'
                  x={resolveHexagonCenterByProps(sectorsPosition, index, position).x}
                  y={resolveHexagonCenterByProps(sectorsPosition, index, position).y - 11}>
              {sector.name}
            </text>
            <Resources resources={sector.resources} {...resolveHexagonCenterByProps(sectorsPosition, index, position)} small/>
          </>
        )}

        {sectorsPosition === 'singular' && !props.text && (
          <polyline fill='black' stroke={color} points={getHexagonPoints({x: position.x, y: position.y})}/>
        )}

        {sectorsPosition === 'singular' && props.text && (
          <>
            <rect x={position.x - backgroundWidth / 2} y={position.y - 37}
                  width={backgroundWidth} height='6' fill={color}
                  stroke={color} strokeWidth='0.2'/>
            <text textAnchor='middle' fontSize='7px' fill='white' x={position.x} y={position.y - 32}>
              {sector.name}
            </text>
            <Resources resources={sector.resources} {...position}/>
          </>
        )}
      </React.Fragment>
    );
  })
);

const Clusters = props => (
  props.x4.map.systems.map(system => (
    <React.Fragment key={Math.random()}>
      {system.position.x !== -1000 && <Sectors {...system} />}
      <polyline fill='none'
                stroke={maps.colors[system.owner].border}
                points={getHexagonPoints(system.position)}/>
    </React.Fragment>
  )));

const ClusterTexts = props => (
  props.x4.map.systems.map(system => (
    <React.Fragment key={Math.random()}>
      {system.position.x !== -1000 && <Sectors {...system} text/>}
    </React.Fragment>
  )));

const Map = (props) => {
  const [scale, setScale] = useState(1);
  const [moved, setMoved] = useState({x: 0, y: 0});
  const svg = useRef();
  const wrapper = useRef();
  let moving = false;

  useEffect(() => {
    if (!props.x4.map) {
      props.fetchX4Map();
      // setInterval(() => props.fetchX4Map(), 3000);
    }
  }, [props.x4.map]);

  let startPosition;
  let dx = 0;
  let dy = 0;
  let currentPosition;

  const mouseDownHandler = e => {
    const tag = e.target.tagName;
    const isWrapper = e.target.className === 'x4__map-wrapper';
    if (tag !== 'svg' && tag !== 'line' && tag !== 'circle' && tag !== 'polyline' && tag !== 'rect' && !isWrapper) return;
    wrapper.current.style.cursor = 'grabbing';
    moving = true;
    let currentTransform = svg.current.style.transform.match(/translate\((.*?)\)/)[1];
    if (currentTransform === '0px') currentTransform = '0px, 0px'; // firefox being special snowflake here
    currentPosition = currentTransform.replace(/px/g, '').split(', ');
    startPosition = {x: e.clientX, y: e.clientY};
  };

  const mouseMoveHandler = e => {
    if (moving) {
      dx = (e.clientX - startPosition.x) / (scale);
      dy = (e.clientY - startPosition.y) / (scale);
      setMoved({x: parseFloat(currentPosition[0]) + dx, y: parseFloat(currentPosition[1]) + dy});
    }
  };

  const mouseUpHandler = () => {
    if (moving) {
      moving = false;
      wrapper.current.style.cursor = 'grab';
    }
  };

  const wheelHandler = e => {
    e.preventDefault();
    if (e.deltaY < 0 && scale > 5) return null;
    if (e.deltaY > 0 && scale < 2) return null;
    e.deltaY < 0
      ? setScale(prevScale => prevScale < 5 ? prevScale + 1 : 5)
      : setScale(prevScale => prevScale > 1 ? prevScale - 1 : 1);
  };

  useEffect(() => {
    if (!props.x4.map) return;
    addEventListener('mousedown', mouseDownHandler);
    addEventListener('mousemove', mouseMoveHandler);
    addEventListener('mouseup', mouseUpHandler);
    wrapper.current.addEventListener('wheel', wheelHandler);
    return () => {
      removeEventListener('mousedown', mouseDownHandler);
      removeEventListener('mousemove', mouseMoveHandler);
      removeEventListener('mouseup', mouseUpHandler);
      wrapper.current.removeEventListener('wheel', wheelHandler);
    };
  }, [props.x4.map, scale]);

  return (
    <div className='x4__map'>
      <h1>X4 Map v3.3</h1>
      {props.x4.map && (
        <div ref={wrapper} className='x4__map-wrapper'>
          <div className='x4__legend'>
            Items are approximate to 50km <br/>
            Xenon stations are not correctly placed <br/>
            Use mouse to move and zoom
            <div className='x4__resources'>
              <p style={{'background': resourceColors.ore}}>Ore</p>
              <p style={{'background': resourceColors.silicon}}>Silicon</p>
              <p style={{'background': resourceColors.ice}}>Ice</p>
              <p style={{'background': resourceColors.hydrogen}}>Hydrogen</p>
              <p style={{'background': resourceColors.helium}}>Helium</p>
              <p style={{'background': resourceColors.methane}}>Methane</p>
              <p style={{'background': resourceColors.nividium}}>Nividium</p>
            </div>
          </div>
          <svg ref={svg} width='100%' height='100%' viewBox='20 -140 1700 1150'
               version="1.1" xmlns="http://www.w3.org/2000/svg"
               style={{transform: `scale(${scale}) translate(${moved.x}px, ${moved.y}px)`}}>
            <rect x='20' y='-140' width='1700' height='1150' fill='#051238'/>
            <Clusters {...props} />
            <Stations {...props} stationScale={scale === 1 ? 1.3 : 1}/>
            <Gates {...props} />
            <SuperHighways {...props} />
            <ClusterTexts {...props} />
          </svg>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Map};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
