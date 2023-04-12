import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '../../../components/Inputs/Checkbox';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
import { getX4Map } from '../../../redux/x4/map';
import { backgroundLabelRectWidth, getHexagonPointsV2, maps } from '../x4-helpers';
import './Map.scss';
import Resources from './Resources';
import Station from './Station';

const X4Map = () => {
  const dispatch = useAppDispatch();
  const { map } = useAppSelector((state) => state.x4Map);

  const [scale, setScale] = useState(1.5);
  const [moved, setMoved] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(false);
  const [width, setWidth] = useState('100%');

  const [displayCradleOfHumanity, setDisplayCradleOfHumanity] = useState(true);
  const [displaySplitVendetta, setDisplaySplitVendetta] = useState(true);
  const [displayTidesOfAvarice, setDisplayTidesOfAvarice] = useState(true);
  const [displaykingdomEnd, setDisplaykingdomEnd] = useState(true);
  const [displayStations, setDisplayStations] = useState(true);
  const [displayResources, setDisplayResources] = useState(true);

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
      setMoved({ x: 30, y: 150 });
    }
  }, [dispatch, map]);

  let startPosition: { x: number; y: number };
  let currentPosition: string[];

  let dx = 0;
  let dy = 0;

  const shouldDisplay = (dlc: string[]) => {
    return !(
      (dlc.includes('cradleOfHumanity') && !displayCradleOfHumanity) ||
      (dlc.includes('tidesOfAvarice') && !displayTidesOfAvarice) ||
      (dlc.includes('splitVendetta') && !displaySplitVendetta) ||
      (dlc.includes('kingdomEnd') && !displaykingdomEnd)
    );
  };

  const mouseDownHandler = (e: MouseEvent | TouchEvent) => {
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

      let x = 0;
      let y = 0;
      if ('touches' in e) {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      startPosition = { x, y };
    }
  };

  const mouseMoveHandler = (e: MouseEvent | TouchEvent) => {
    if (moving) {
      let x = 0;
      let y = 0;
      if ('touches' in e) {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      dx = (x - startPosition.x) / scale;
      dy = (y - startPosition.y) / scale;
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
    if (e.deltaY < 0 && scale > 10) return null;
    if (e.deltaY > 0 && scale < 1.25) return null;
    e.deltaY < 0
      ? setScale((prevScale) => (prevScale < 8 ? prevScale + 0.8 : 12))
      : setScale((prevScale) => (prevScale > 1 ? prevScale - 0.8 : 1));
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
    const current = wrapper.current;

    if (current) {
      current.addEventListener('mousedown', mouseDownHandler, { passive: true });
      current.addEventListener('mousemove', mouseMoveHandler, { passive: true });
      current.addEventListener('mouseup', mouseUpHandler, { passive: true });
      current.addEventListener('touchstart', mouseDownHandler, { passive: true });
      current.addEventListener('touchmove', mouseMoveHandler, { passive: true });
      current.addEventListener('touchend', mouseUpHandler, { passive: true });
      current.addEventListener('wheel', wheelHandler, { passive: true });
    }
    return () => {
      if (current) {
        current.removeEventListener('mousedown', mouseDownHandler);
        current.removeEventListener('mousemove', mouseMoveHandler);
        current.removeEventListener('mouseup', mouseUpHandler);
        current.removeEventListener('touchstart', mouseDownHandler);
        current.removeEventListener('touchmove', mouseMoveHandler);
        current.removeEventListener('touchend', mouseUpHandler);
        current.removeEventListener('wheel', wheelHandler);
      }
    };
  }, [map, scale]);

  return (
    <LayoutBase>
      <div className="x4__map">
        <h1>X4 Foundations Map</h1>
        {map && (
          <React.Fragment>
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
                {map.clusters
                  .filter((cluster) => shouldDisplay(cluster.dlc))
                  .map((cluster) =>
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

                {map.clusters
                  .filter((cluster) => shouldDisplay(cluster.dlc))
                  .map((cluster) => {
                    let color = cluster.sectors[0].owner ? maps.colors[cluster.sectors[0].owner].border : 'gray';
                    if (cluster.name === 'Cluster_29_macro') color = maps.colors['argon'].border;
                    return (
                      <React.Fragment key={cluster.name}>
                        <polyline
                          fill="none"
                          stroke={color}
                          strokeWidth="2"
                          points={getHexagonPointsV2({ x: cluster.position.x, y: -cluster.position.z })}
                        />
                        {cluster.sectors.map((sector) =>
                          sector.zones.map((zone) =>
                            zone.gates.map((gate, index) => (
                              <circle
                                key={`${zone.zoneReference}-${index}`}
                                cx={gate.position.x}
                                cy={-gate.position.z}
                                fill="gray"
                                stroke="white"
                                strokeWidth="1"
                                r="5"
                              />
                            ))
                          )
                        )}
                      </React.Fragment>
                    );
                  })}

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

                {map.sectorHighways
                  .filter((highway) => shouldDisplay(highway.dlc))
                  .map((highway) => (
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
                  ))}

                {displayResources &&
                  map.clusters
                    .filter((cluster) => shouldDisplay(cluster.dlc))
                    .map((cluster) => cluster.sectors.map((sector) => <Resources sector={sector} key={sector.name} />))}

                {displayStations &&
                  map.clusters
                    .filter((cluster) => shouldDisplay(cluster.dlc))
                    .map((cluster) =>
                      cluster.sectors.map((sector) =>
                        sector.stations.map((station) => (
                          <Station key={station.id} station={station} stationScale={1.5} />
                        ))
                      )
                    )}

                {map.clusters
                  .filter((cluster) => shouldDisplay(cluster.dlc))
                  .map((cluster) =>
                    cluster.sectors.map((sector) => {
                      const backgroundWidth = sector.label.length * 3 - backgroundLabelRectWidth(sector.label) + 5;
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
                            y={-sector.adjusted.z - verticalOffset + 10.5}
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

            <div className="x4__map-controls">
              <Link to={'/x4/resources'} className="link">
                Go to resource table
              </Link>
              <span onClick={() => setShowLegend(!showLegend)}>{showLegend ? 'Hide' : 'Show'} legend</span>
            </div>
            <div className="x4__map-filters">
              <div>
                <Checkbox
                  label="Stations"
                  name="displayStations"
                  checked={displayStations}
                  handleInputChange={() => setDisplayStations(!displayStations)}
                />
                <Checkbox
                  label="Resources"
                  name="displayResouces"
                  checked={displayResources}
                  handleInputChange={() => setDisplayResources(!displayResources)}
                />
                <Checkbox
                  label="Split Vendetta"
                  name="displaySplitVendetta"
                  checked={displaySplitVendetta}
                  handleInputChange={() => setDisplaySplitVendetta(!displaySplitVendetta)}
                />
                <Checkbox
                  label="Cradle Of Humanity"
                  name="displayRace"
                  checked={displayCradleOfHumanity}
                  handleInputChange={() => setDisplayCradleOfHumanity(!displayCradleOfHumanity)}
                />
                <Checkbox
                  label="Tides Of Avarice"
                  name="displayRace"
                  checked={displayTidesOfAvarice}
                  handleInputChange={() => setDisplayTidesOfAvarice(!displayTidesOfAvarice)}
                />
                <Checkbox
                  label="Kingdom End"
                  name="displayRace"
                  checked={displaykingdomEnd}
                  handleInputChange={() => setDisplaykingdomEnd(!displaykingdomEnd)}
                />
              </div>
              <button onClick={downloadSvgFile} className="btn btn--cta">
                Click here to download as svg
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </LayoutBase>
  );
};

export default X4Map;
