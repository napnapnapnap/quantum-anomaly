import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '../../../components/Inputs/Checkbox';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutClient from '../../../layouts/Client';
import { X4MapInterface, getX4Map } from '../../../redux/x4/map';
import { backgroundLabelRectWidth, getHexagonPointsV2, maps } from '../x4-helpers';
import './Map.scss';
import Resources from './Resources';
import Station from './Station';

const X4Map = () => {
  const dispatch = useAppDispatch();
  const { map } = useAppSelector((state) => state.x4Map);

  const [scale, setScale] = useState(3);
  const [moved, setMoved] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(false);
  const [width, setWidth] = useState('100%');

  const [cradleOfHumanity, setCradleOfHumanity] = useState(true);
  const [splitVendetta, setSplitVendetta] = useState(true);
  const [tidesOfAvarice, setTidesOfAvarice] = useState(true);
  const [kingdomsEnd, setKingdomsEnd] = useState(false);

  const svg = useRef<SVGSVGElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  let moving: boolean = false;

  useEffect(() => {
    if (!map) dispatch(getX4Map());
    else {
      seo({
        title: 'X4 Foundations Map',
        metaDescription: 'X4 Foundations, Split Vendetta, Cradle of Humanity map and Tides of Avarice.',
        keywords: map.clusters.map((cluster) => cluster.sectors.map((sector) => sector.label).join(', ')),
      });
    }
  }, [dispatch, map]);

  let startPosition: { x: number; y: number };
  let currentPosition: string[];

  let dx = 0;
  let dy = 0;

  const shouldDisplay = (dlc: string[]) => {
    return !(
      (dlc.includes('cradleOfHumanity') && !cradleOfHumanity) ||
      (dlc.includes('tidesOfAvarice') && !tidesOfAvarice) ||
      (dlc.includes('splitVendetta') && !splitVendetta) ||
      (dlc.includes('kingdomsEnd') && !kingdomsEnd)
    );
  };

  const mouseDownHandler = (e: MouseEvent) => {
    if (wrapper.current && svg.current) {
      const tag = (e.target as HTMLElement).tagName;
      const isWrapper = (e.target as HTMLElement).className === 'x4__map-wrapper';
      if (tag !== 'svg' && tag !== 'line' && tag !== 'circle' && tag !== 'polyline' && tag !== 'rect' && !isWrapper)
        return;
      wrapper.current.style.cursor = 'grabbing';
      moving = true;
      // @ts-ignore
      let currentTransform = svg.current.style.transform.match(/translate\((.*?)\)/)[1];
      if (currentTransform === '0px') currentTransform = '0px, 0px'; // firefox being special
      // snowflake here
      currentPosition = currentTransform.replace(/px/g, '').split(', ');
      startPosition = { x: e.clientX, y: e.clientY };
    }
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (moving) {
      dx = (e.clientX - startPosition.x) / scale;
      dy = (e.clientY - startPosition.y) / scale;
      setMoved({ x: parseFloat(currentPosition[0]) + dx, y: parseFloat(currentPosition[1]) + dy });
    }
  };

  const mouseUpHandler = () => {
    if (moving && wrapper.current) {
      moving = false;
      wrapper.current.style.cursor = 'grab';
      // for some reason, chrome fails in some cases to render things where they should be... quick fix - force redraw...
      setWidth(width === '99.5%' ? '100%' : '99.5%');
    }
  };

  const wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0 && scale > 8) return null;
    if (e.deltaY > 0 && scale < 1.25) return null;
    e.deltaY < 0
      ? setScale((prevScale) => (prevScale < 8 ? prevScale + 0.5 : 8))
      : setScale((prevScale) => (prevScale > 1 ? prevScale - 0.5 : 1));
  };

  const downloadSvgFile = () => {
    if (svg && svg.current) {
      const element = document.createElement('a');
      const svgAsString = svg.current.outerHTML.toString().replace(/style="(.*?)"/, '');
      const file = new Blob([svgAsString], { type: 'image/svg+xml' });
      element.href = URL.createObjectURL(file);
      element.download = 'x4-map.svg';
      document.body.appendChild(element);
      element.click();
    }
  };

  useEffect(() => {
    if (!map) return;
    if (wrapper.current) {
      wrapper.current.addEventListener('mousedown', mouseDownHandler);
      wrapper.current.addEventListener('mousemove', mouseMoveHandler);
      wrapper.current.addEventListener('mouseup', mouseUpHandler);
      wrapper.current.addEventListener('wheel', wheelHandler);
    }
    return () => {
      if (wrapper.current) {
        wrapper.current.removeEventListener('mousedown', mouseDownHandler);
        wrapper.current.removeEventListener('mousemove', mouseMoveHandler);
        wrapper.current.removeEventListener('mouseup', mouseUpHandler);
        wrapper.current.removeEventListener('wheel', wheelHandler);
      }
    };
  }, [map, scale]);

  return (
    <LayoutClient>
      <div className="x4__map">
        <h1>X4 Foundations Map v5.0</h1>
        {map && (
          <React.Fragment>
            <div className="x4__map-controls">
              <Link to={'/x4/resources'} className="link">
                Go to resource table
              </Link>
              <span onClick={() => setShowLegend(!showLegend)}>{showLegend ? 'Hide' : 'Show'} legend</span>
            </div>
            <div ref={wrapper} className="x4__map-wrapper">
              {showLegend && (
                <div className="x4__legend">
                  All locations are approximate <br />
                  Use mouse to move and zoom <br />
                  Resource numbers are explained in resource table
                  <div className="x4__resources">
                    <p style={{ background: maps.resourceColors.ore }}>Ore</p>
                    <p style={{ background: maps.resourceColors.silicon }}>Silicon</p>
                    <p style={{ background: maps.resourceColors.ice }}>Ice</p>
                    <p style={{ background: maps.resourceColors.hydrogen }}>Hydrogen</p>
                    <p style={{ background: maps.resourceColors.helium }}>Helium</p>
                    <p style={{ background: maps.resourceColors.methane }}>Methane</p>
                    <p style={{ background: maps.resourceColors.nividium }}>Nividium</p>
                  </div>
                </div>
              )}
              <svg
                ref={svg}
                width={width}
                height="100%"
                viewBox="-2800 -1800 5300 5000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `scale(${scale}) translate(${moved.x}px, ${moved.y}px)` }}
              >
                {map.clusters.map(
                  (cluster) =>
                    shouldDisplay(cluster.dlc) &&
                    cluster.sectors.map((sector) => (
                      <polyline
                        key={sector.name}
                        stroke={sector.owner ? maps.colors[sector.owner].border : 'gray'}
                        strokeWidth="2"
                        fill={sector.owner ? maps.colors[sector.owner].border : 'gray'}
                        fillOpacity="0.2"
                        points={getHexagonPointsV2(
                          {
                            x: sector.adjusted.x,
                            y: -sector.adjusted.z,
                          },
                          cluster.sectors.length < 2 ? 1 : 2
                        )}
                      />
                    ))
                )}

                {map.clusters.map((cluster) => {
                  if (!shouldDisplay(cluster.dlc)) return;
                  let color = cluster.sectors[0].owner ? maps.colors[cluster.sectors[0].owner].border : 'gray';
                  if (cluster.name === 'Cluster_29_macro') color = maps.colors['argon'].border;
                  return (
                    <polyline
                      key={cluster.name}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      points={getHexagonPointsV2({ x: cluster.position.x, y: -cluster.position.z })}
                    />
                  );
                })}

                {map.clusters.map(
                  (cluster) =>
                    shouldDisplay(cluster.dlc) &&
                    cluster.sectors.map((sector) =>
                      sector.zones.map((zone) =>
                        zone.gates.map((gate, index) => (
                          <React.Fragment key={`${zone.zoneReference}-${index}`}>
                            <circle
                              cx={gate.position.x}
                              cy={-gate.position.z}
                              fill="gray"
                              stroke="white"
                              strokeWidth="1"
                              r="5"
                            />
                          </React.Fragment>
                        ))
                      )
                    )
                )}

                {map.clusters.map(
                  (cluster) =>
                    shouldDisplay(cluster.dlc) &&
                    cluster.sectors.map((sector) =>
                      sector.stations.map((station, index) => (
                        <Station key={station.id} station={station} stationScale={scale === 1 ? 2.5 : 1.5} />
                      ))
                    )
                )}

                {Object.values(map.gates).map(
                  (gate) =>
                    gate.end &&
                    shouldDisplay(gate.dlc) && (
                      <React.Fragment key={Math.random()}>
                        <line
                          x1={gate.start.x}
                          y1={-gate.start.z}
                          x2={gate.end.x}
                          y2={-gate.end.z}
                          stroke="black"
                          strokeWidth="5"
                        />
                        <line
                          x1={gate.start.x}
                          y1={-gate.start.z}
                          x2={gate.end.x}
                          y2={-gate.end.z}
                          stroke="white"
                          strokeWidth="3"
                          strokeDasharray="2"
                        />
                      </React.Fragment>
                    )
                )}

                {map.sectorHighways.map(
                  (highway) =>
                    shouldDisplay(highway.dlc) && (
                      <React.Fragment key={Math.random()}>
                        <circle
                          cx={highway.origin.x}
                          cy={highway.origin.y}
                          fill="blue"
                          stroke="white"
                          strokeWidth="1"
                          r="3"
                        />
                        <circle
                          cx={highway.destination.x}
                          cy={highway.destination.y}
                          fill="blue"
                          stroke="white"
                          strokeWidth="1"
                          r="3"
                        />
                        <line
                          x1={highway.origin.x}
                          y1={highway.origin.y}
                          x2={highway.destination.x}
                          y2={highway.destination.y}
                          stroke="gray"
                          strokeWidth="3"
                        />
                        <line
                          x1={highway.origin.x}
                          y1={highway.origin.y}
                          x2={highway.destination.x}
                          y2={highway.destination.y}
                          stroke="blue"
                          strokeDasharray="1"
                        />
                      </React.Fragment>
                    )
                )}

                {map.clusters.map(
                  (cluster) =>
                    shouldDisplay(cluster.dlc) &&
                    cluster.sectors.map((sector) => <Resources sector={sector} key={sector.name} />)
                )}

                {map.clusters.map(
                  (cluster) =>
                    shouldDisplay(cluster.dlc) &&
                    cluster.sectors.map((sector) => {
                      const backgroundWidth = sector.label.length * 3 - backgroundLabelRectWidth(sector.label);
                      const verticalOffset = sector.transformation ? 45 : 95;
                      return (
                        <React.Fragment key={sector.label}>
                          <rect
                            x={sector.adjusted.x - backgroundWidth}
                            y={-sector.adjusted.z - verticalOffset}
                            width={backgroundWidth * 2}
                            height="13"
                            fill="black"
                            stroke={sector.owner ? maps.colors[sector.owner].border : 'white'}
                            strokeWidth="1"
                          />
                          <text
                            x={sector.adjusted.x}
                            y={-sector.adjusted.z - verticalOffset + 10}
                            fontSize="12px"
                            textAnchor="middle"
                            fill="white"
                          >
                            {sector.label}
                          </text>
                        </React.Fragment>
                      );
                    })
                )}
              </svg>
            </div>
            <div className="x4__map-filters">
              <div>
                <Checkbox
                  label="Split Vendetta"
                  name="splitVendetta"
                  checked={splitVendetta}
                  isInline
                  handleInputChange={() => setSplitVendetta(!splitVendetta)}
                />
                <Checkbox
                  label="Cradle Of Humanity"
                  name="displayRace"
                  checked={cradleOfHumanity}
                  isInline
                  handleInputChange={() => setCradleOfHumanity(!cradleOfHumanity)}
                />
                <Checkbox
                  label="Tides Of Avarice"
                  name="displayRace"
                  checked={tidesOfAvarice}
                  isInline
                  handleInputChange={() => setTidesOfAvarice(!tidesOfAvarice)}
                />
                <Checkbox
                  label="Kingdoms End"
                  name="displayRace"
                  checked={kingdomsEnd}
                  isInline
                  isDisabled
                  handleInputChange={() => setKingdomsEnd(!kingdomsEnd)}
                />
              </div>
              <button onClick={downloadSvgFile} className="btn btn--cta">
                Click here to download as svg
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </LayoutClient>
  );
};

export default X4Map;
