import React, {useEffect, useRef, useState} from 'react';
import {fetchX4Map} from '../../../redux/x4Actions';
import {connect} from 'react-redux';
import './Map.scss';
import {backgroundLabelRectWidth, getHexagonPoints, maps, resolveHexagonCenterByProps} from '../helpers';
import Stations from './Stations';
import {Gates, SuperHighways} from './Travel';

const Sectors = props => (
  props.sectors.map((sector, index) => {
    let sectorOwner = props.owner;
    const backgroundWidth = (sector.name.length * 4) - backgroundLabelRectWidth(sector.name);
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
                  y={resolveHexagonCenterByProps(sectorsPosition, index, position).y - 18}
                  width={backgroundWidth} height='8' fill={color}
                  stroke={color} strokeWidth='0.2'/>
            <text textAnchor='middle' fontSize='8px' fill='white'
                  x={resolveHexagonCenterByProps(sectorsPosition, index, position).x}
                  y={resolveHexagonCenterByProps(sectorsPosition, index, position).y - 11}>
              {sector.name}
            </text>
          </>
        )}

        {sectorsPosition === 'singular' && !props.text && (
          <polyline fill='black'
                    stroke={color}
                    points={getHexagonPoints({x: position.x, y: position.y})}/>
        )}

        {sectorsPosition === 'singular' && props.text && (
          <>
            <rect x={position.x - backgroundWidth / 2} y={position.y - 39}
                  width={backgroundWidth} height='8' fill={color}
                  stroke={color} strokeWidth='0.2'/>
            <text textAnchor='middle' fontSize='8px' fill='white' x={position.x} y={position.y - 32}>
              {sector.name}
            </text>
          </>
        )}
      </React.Fragment>
    );
  })
);

const Clusters = props => (
  Object.keys(props.x4.map.systems).map(key => (
    <React.Fragment key={Math.random()}>
      {props.x4.map.systems[key].position.x !== -1000 && <Sectors {...props.x4.map.systems[key]} />}
      <polyline fill='none'
                stroke={maps.colors[props.x4.map.systems[key].owner].border}
                points={getHexagonPoints(props.x4.map.systems[key].position)}/>
    </React.Fragment>
  )));

const ClusterTexts = props => (
  Object.keys(props.x4.map.systems).map(key => (
    <React.Fragment key={Math.random()}>
      {props.x4.map.systems[key].position.x !== -1000 && <Sectors {...props.x4.map.systems[key]} text/>}
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
      <div className='x4__map-controls'>
        <span onClick={() => setScale(scale => scale < 3 ? scale += 0.5 : 3)}>+</span>
        <span onClick={() => setScale(scale => scale > 1.5 ? scale -= 0.5 : 1)}>-</span><br/>
      </div>
      {props.x4.map && (
        <div ref={wrapper} className='x4__map-wrapper'>
          <svg ref={svg} width='100%' height='100%' viewBox='20 -140 1700 1150'
               version="1.1" xmlns="http://www.w3.org/2000/svg"
               style={{transform: `scale(${scale}) translate(${moved.x}px, ${moved.y}px)`}}>
            <rect x='20' y='-140' width='1700' height='1150' fill='#051238'/>
            <text x='40' y='-100' fill='white' fontSize='12px'>All items are approximate to about 50km</text>
            <text x='40' y='-80' fill='white' fontSize='12px'>
              Some Xenon stations are not even approximate (for now)
            </text>
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
