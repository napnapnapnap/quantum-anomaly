import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '../../../components/Inputs/Checkbox';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import AppContext from '../../../hooks/app-context';
import LayoutBase from '../../../layouts/Base';
import { getX4Map } from '../../../redux/x4/map';
import { getHexagonPointsV2, maps } from '../x4-helpers';
import { Border } from './Border';
import { Gate, GateConnection } from './Gates';
import './Map.scss';
import Resources from './Resources';
import { Sector } from './Sector';
import { SectorNameTag } from './SectorNameTag';
import Station from './Station';

const X4Map = () => {
  const dispatch = useAppDispatch();
  const context = useContext(AppContext);
  const { map } = useAppSelector((state) => state.x4Map);

  const [scale, setScale] = useState(1);
  const [moved, setMoved] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState('100%');

  const [displayCradleOfHumanity, setDisplayCradleOfHumanity] = useState(true);
  const [displaySplitVendetta, setDisplaySplitVendetta] = useState(true);
  const [displayTidesOfAvarice, setDisplayTidesOfAvarice] = useState(true);
  const [displaykingdomEnd, setDisplaykingdomEnd] = useState(true);
  const [displayStations, setDisplayStations] = useState(true);
  const [displayResources, setDisplayResources] = useState(true);
  const [hideLegend, setHideLegend] = useState(false);
  const [displayInteraction, setDisplayInteraction] = useState(true);
  const [displayKhaak, setDisplayKhaah] = useState(false);

  const svg = useRef<SVGSVGElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  let moving: boolean = false;

  useEffect(() => {
    if (!map) dispatch(getX4Map());
    else {
      seo({
        title: 'X4 Foundations Map',
        metaDescription:
          'X4 Foundations interactive map, includes Split Vendetta, Cradle of Humanity, Tides of Avarice and Kingdom' +
          ' end.',
        keywords: map.clusters.map((cluster) => cluster.sectors.map((sector) => sector.label).join(', ')),
      });
      setMoved({ x: 0, y: 0 });
      setTimeout(() => {
        context.setNavOpen(false);
      }, 100);

      setTimeout(() => {
        setDisplayInteraction(false);
      }, 5000);
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
      <div className="x4-map">
        <h1>X4 Foundations Map</h1>
        {map && (
          <React.Fragment>
            <div ref={wrapper} className="x4-map__wrapper">
              {displayResources && !hideLegend && (
                <div className="x4-map__legend">
                  <span className="x4-map__legend-close" onClick={() => setHideLegend(true)}>
                    X
                  </span>
                  <span>Legend:</span>
                  <div className="x4-map__resources">
                    <p style={{ background: maps.resourceColors.ore }}>Ore</p>
                    <p style={{ background: maps.resourceColors.silicon }}>Silicon</p>
                    <p style={{ background: maps.resourceColors.ice }}>Ice</p>
                    <p style={{ background: maps.resourceColors.nividium }}>Nividium</p>
                    <p style={{ background: maps.resourceColors.hydrogen }}>Hydrogen</p>
                    <p style={{ background: maps.resourceColors.helium }}>Helium</p>
                    <p style={{ background: maps.resourceColors.methane }}>Methane</p>
                    <p style={{ background: maps.resourceColors.rawscrap }}>Scrap</p>
                  </div>
                </div>
              )}
              <div className="x4-map__toggler">
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
                  handleInputChange={() => {
                    setDisplayResources(!displayResources);
                    setHideLegend(false);
                  }}
                />
                <Checkbox
                  label="Potential Khaak"
                  name="displayKhaak"
                  checked={displayKhaak}
                  handleInputChange={() => setDisplayKhaah(!displayKhaak)}
                />
                <button onClick={downloadSvgFile} className="btn btn--cta">
                  Download
                </button>
              </div>
              {displayInteraction && (
                <div className="x4__interaction">
                  <span>Click and drag to move</span>
                  <br />
                  <span>Zoom with mouse wheel</span>
                </div>
              )}
              <div className="x4-map__zoom">
                <input
                  type="range"
                  name="volume"
                  min="1"
                  max="12"
                  step="0.25"
                  value={scale || 1}
                  onChange={(e) => {
                    setScale(parseInt(e.target.value));
                  }}
                />
              </div>
              <svg
                ref={svg}
                width={width}
                height="100%"
                viewBox="-2800 -1800 5250 3000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `scale(${scale}) translate(${moved.x}px, ${moved.y}px)` }}
              >
                <rect x="-2800" y="-1800" width="5250" height="2800" fill="black"></rect>
                {/*Renders sectors*/}
                {map.clusters
                  .filter((cluster) => shouldDisplay(cluster.dlc))
                  .map((cluster) =>
                    cluster.sectors.map((sector) => <Sector cluster={cluster} sector={sector} key={sector.name} />)
                  )}

                {/*Renders cluster border of multiple sectors, reuse loop to render gates in ALL sectors */}
                {map.clusters
                  .filter((cluster) => shouldDisplay(cluster.dlc))
                  .map((cluster) => (
                    <React.Fragment key={cluster.name}>
                      {cluster.sectors.length !== 1 && <Border cluster={cluster} />}
                      {cluster.sectors.map((sector) =>
                        sector.zones.map((zone) => zone.gates.map((gate) => <Gate gate={gate} key={gate.name} />))
                      )}
                      {cluster.sectors.map(
                        (sector) =>
                          sector.potentialHive &&
                          displayKhaak && (
                            <polyline
                              fill="none"
                              stroke="red"
                              strokeWidth="8"
                              key={sector.name}
                              points={getHexagonPointsV2(
                                {
                                  x: cluster.position.x,
                                  y: -cluster.position.z,
                                },
                                1,
                                true
                              )}
                            />
                          )
                      )}
                    </React.Fragment>
                  ))}

                {/*Renders lines between gates*/}
                {map.gateConnections
                  .filter((gate) => shouldDisplay(gate.dlc))
                  .map((gate) => (
                    <GateConnection gateConnection={gate} key={Math.random()} />
                  ))}

                {/*Renders both superhighways gate pairs and lines between them*/}
                {map.sectorHighways
                  .filter((highwayGate) => shouldDisplay(highwayGate.dlc))
                  .map((highwayGate) => (
                    <React.Fragment key={Math.random()}>
                      <Gate gate={{ position: { x: highwayGate.start.x, z: -highwayGate.start.z } }} isHighwayGate />
                      <Gate gate={{ position: { x: highwayGate.exit.x, z: -highwayGate.exit.z } }} isHighwayGate />
                      <GateConnection
                        gateConnection={{
                          start: { x: highwayGate.start.x, z: -highwayGate.start.z },
                          exit: { x: highwayGate.exit.x, z: -highwayGate.exit.z },
                        }}
                        isHighwayGate
                      />
                    </React.Fragment>
                  ))}

                {/*Renders resource boxes and sunlight*/}
                {displayResources &&
                  map.clusters
                    .filter((cluster) => shouldDisplay(cluster.dlc))
                    .map((cluster) => cluster.sectors.map((sector) => <Resources sector={sector} key={sector.name} />))}

                {/*Renders stations */}
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

                {/*Renders sector name tag and box around it */}
                {map.clusters
                  .filter((cluster) => shouldDisplay(cluster.dlc))
                  .map((cluster) =>
                    cluster.sectors.map((sector) => <SectorNameTag sector={sector} key={sector.label} />)
                  )}
              </svg>
            </div>

            <div className="x4-map__controls">
              <Link to={'/x4/resources'} className="link">
                Resource table
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </LayoutBase>
  );
};

export default X4Map;
