import React, {useEffect, useRef, useState} from 'react';
import {fetchX4Map} from '../../redux/x4Actions';
import {connect} from 'react-redux';
import classnames from 'classnames';
import './Map.scss';
import {maps} from './helpers';

const HEXSIZE = {x: 24.8, y: 42.5};
const HEXSIZE_SMALL = {x: 12.2, y: 21.1};
const HEX_OFFSET = {x: 12.5, y: 21.5};

const getHexagonPoints = (prop, type) => {
  const {x, y} = prop;
  const {x: hx, y: hy} = type === 'small' ? HEXSIZE_SMALL : HEXSIZE;
  return `${x - hx},${y - hy} ${x + hx},${y - hy} ${x + hx * 2},${y} ${x + hx},${y + hy} ${x - hx},${y + hy} ${x - hx * 2},${y} ${x - hx},${y - hy}`;
};

const resolveHexagonCenterByProps = (sectorPosition, sectorIndex, cluster) => {
  switch (sectorPosition) {
    case 'top-right':
      if (sectorIndex === 0) return {x: cluster.x + HEX_OFFSET.x, y: cluster.y - HEX_OFFSET.y};
      else return {x: cluster.x - HEX_OFFSET.x, y: cluster.y + HEX_OFFSET.y};
    case 'top-left':
      if (sectorIndex === 0) return {x: cluster.x - HEX_OFFSET.x, y: cluster.y - HEX_OFFSET.y};
      else return {x: cluster.x + HEX_OFFSET.x, y: cluster.y + HEX_OFFSET.y};
    case 'tripple-right':
      if (sectorIndex === 0) return {x: cluster.x + HEX_OFFSET.x, y: cluster.y + HEX_OFFSET.y};
      else if (sectorIndex === 1) return {x: cluster.x - HEX_OFFSET.x * 2, y: cluster.y};
      else return {x: cluster.x + HEX_OFFSET.x, y: cluster.y - HEX_OFFSET.y};
    case 'singular':
      return {x: cluster.x, y: cluster.y};
  }
};

const Sectors = props => (
  props.sectors.map((sector, index) => {
    let sectorOwner = props.owner;
    if (sector.name === 'Hatikvah\'s Choice I') sectorOwner = 'hatikvah';
    if (sector.name === 'Hewa\'s Twin IV The Cove') sectorOwner = 'none';

    return (
      <React.Fragment key={Math.random()}>
        {props.sectorsPosition !== 'singular' && !props.text && (
          <polyline className='map__hexagon'
                    fill='black'
                    stroke={maps.colors[sectorOwner].border}
                    points={getHexagonPoints(resolveHexagonCenterByProps(props.sectorsPosition, index, props.position), 'small')}/>
        )}

        {props.sectorsPosition !== 'singular' && props.text && (
          <text textAnchor='middle'
                x={resolveHexagonCenterByProps(props.sectorsPosition, index, props.position).x}
                y={resolveHexagonCenterByProps(props.sectorsPosition, index, props.position).y - 8}
                className={classnames('map__sector-name', {[`map__sector-name--${sectorOwner}`]: true})}>
            {sector.name}
          </text>
        )}

        {props.sectorsPosition === 'singular' && !props.text && (
          <polyline className='map__hexagon'
                    fill='black'
                    stroke={maps.colors[props.owner].border}
                    points={getHexagonPoints({x: props.position.x, y: props.position.y})}/>
        )}

        {props.sectorsPosition === 'singular' && props.text && (
          <text textAnchor='middle' x={props.position.x} y={props.position.y - 30}
                className={classnames('map__sector-name', {[`map__sector-name--${sectorOwner}`]: true})}>
            {sector.name}
          </text>
        )}
      </React.Fragment>
    );
  })
);

const Clusters = props => (
  Object.keys(props.x4.map.systems).map(key => (
    <React.Fragment key={Math.random()}>
      {props.x4.map.systems[key].position.x !== -1000 && <Sectors {...props.x4.map.systems[key]} />}
      <polyline className='map__hexagon'
                fill='none'
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

const Gates = props => (
  props.x4.map.gates.map(gate => (
    <React.Fragment key={Math.random()}>
      <circle cx={gate.origin.x} cy={gate.origin.y} fill='gray' stroke='white' strokeWidth='1' r='2'/>
      <circle cx={gate.destination.x} cy={gate.destination.y} fill='gray' stroke='white' strokeWidth='1' r='2'/>
      <line x1={gate.origin.x} y1={gate.origin.y}
            x2={gate.destination.x} y2={gate.destination.y} stroke='black'
            strokeWidth='2'/>
      <line x1={gate.origin.x} y1={gate.origin.y}
            x2={gate.destination.x} y2={gate.destination.y} stroke='white'
            strokeDasharray='1px'/>
    </React.Fragment>
  ))
);

const SuperHighways = props => (
  props.x4.map.superHighways.map(highway => (
    <React.Fragment key={Math.random()}>
      <circle cx={highway.origin.x} cy={highway.origin.y} fill='blue' stroke='white' strokeWidth='1' r='1'/>
      <circle cx={highway.destination.x} cy={highway.destination.y} fill='blue' stroke='white' strokeWidth='1' r='1'/>
      <line x1={highway.origin.x} y1={highway.origin.y}
            x2={highway.destination.x} y2={highway.destination.y}
            stroke='gray' strokeWidth='2'/>
      <line x1={highway.origin.x} y1={highway.origin.y}
            x2={highway.destination.x} y2={highway.destination.y}
            stroke='blue' strokeDasharray='1px'/>
    </React.Fragment>
  ))
);

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
    if (tag !== 'svg' && tag !== 'line' && tag !== 'circle' && tag !== 'polyline' && !isWrapper) return;
    wrapper.current.style.cursor = 'grabbing';
    moving = true;
    currentPosition = svg.current.style.transform.match(/translate\((.*?)\)/)[1].replace(/px/g, '').split(', ');
    startPosition = {x: e.clientX, y: e.clientY};
  };

  const mouseMoveHandler = e => {
    if (moving) {
      dx = (e.clientX - startPosition.x) / (scale);
      dy = (e.clientY - startPosition.y) / (scale);
    }
  };

  const mouseUpHandler = () => {
    if (moving) {
      moving = false;
      wrapper.current.style.cursor = 'grab';
      setMoved({x: parseFloat(currentPosition[0]) + dx, y: parseFloat(currentPosition[1]) + dy});
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
        <span onClick={() => setScale(scale => scale > 1.5 ? scale -= 0.5 : 1)}>-</span>
      </div>
      {props.x4.map && (
        <div ref={wrapper} className='x4__map-wrapper'>
          <svg ref={svg} width='100%' height='100%' viewBox={`20 -140 1700 1150`}
               style={{transform: `scale(${scale}) translate(${moved.x}px, ${moved.y}px)`}}>
            <Clusters {...props} />
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

