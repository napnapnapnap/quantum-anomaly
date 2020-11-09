import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import ShipRow from './ShipRow';
import {fetchX4Equipment, fetchX4Ships} from '../../redux/x4Actions';
import {fillOntoShip} from './x4-fitting-tool';
import './X4.scss';

const racesMap = [{label: 'Argon', value: 'arg'}, {label: 'Kha\'ak', value: 'kha'}, {label: 'Paranid', value: 'par'},
                  {label: 'Split', value: 'spl'}, {label: 'Teladi', value: 'tel'}, {label: 'Xenon', value: 'xen'}];
const subtypeMap = [{label: 'Base variation', value: 'BV'}, {label: 'Vanguard', value: 'VA'},
                    {label: 'Sentinel', value: 'ST'}, {label: 'Raider', value: 'RD'}];
const sizeMap = {ship_xl: 'extralarge', ship_l: 'large', ship_m: 'medium', ship_s: 'small'};
const separateWord = arg => arg.replace('large', 'large ').replace('heavy', 'heavy ');

const Dropdowns = props => (
  <div className='x4__dropdown'>
    <select onChange={e => {
      props.setActiveShields(null);
      props.setActiveEngines(null);
      props.setActiveThrusters(null);
      props.setActiveType(null);
      props.setSize(e.target.value);
    }}>
      <option value='ship_xl'>Extra Large Ships</option>
      <option value='ship_l'>Large Ships</option>
      <option value='ship_m'>Medium Ships</option>
      <option value='ship_s'>Small Ships</option>
    </select>
    <select onChange={e => props.setActiveShields(e.target.value)}>
      <option value='none'>Select shields</option>
      {props.shields.map(shield => (
        <option key={shield.id} value={shield.id}>{shield.name}</option>
      ))}
    </select>
    <select onChange={e => props.setActiveEngines(e.target.value)}>
      <option value='none'>Select engines</option>
      {props.engines.map(engine => (
        <option key={engine.id} value={engine.id}>{engine.name}</option>
      ))}
    </select>
    <select onChange={e => props.setActiveThrusters(e.target.value)}>
      <option value='none'>Select thrusters</option>
      {props.thrusters.map(thruster => (
        <option key={thruster.id} value={thruster.id}>{thruster.name}</option>
      ))}
    </select>
    <select onChange={e => props.setActiveType(e.target.value)}>
      <option value='all'>All types of ship</option>
      {props.types.map(type => (
        <option key={type} value={type}>{separateWord(type)}</option>
      ))}
    </select>
  </div>
);

const Races = props => (
  <div>
    Show: &nbsp;&nbsp;
    {racesMap.map(raceMap => (
      <label className='label--checkbox' key={raceMap.value}>
        <input type='checkbox'
               onChange={e => props.setRace(race => {
                 const selectedRace = {};
                 selectedRace[raceMap.value] = e.target.checked;
                 return {...race, ...selectedRace};
               })}
               defaultChecked
        />
        {raceMap.label}
      </label>
    ))}
    {subtypeMap.map(subtypeMap => (
      <label className='label--checkbox' key={subtypeMap.value}>
        <input type='checkbox'
               onChange={e => props.setSubtype(subtype => {
                 const selectedSubtype = {};
                 selectedSubtype[subtypeMap.value] = e.target.checked;
                 return {...subtype, ...selectedSubtype};
               })}
               defaultChecked
        />
        {subtypeMap.label}
      </label>
    ))}
  </div>
);

const index = (props) => {
  const [size, setSize] = useState('ship_xl');
  const [race, setRace] = useState({arg: true, par: true, spl: true, tel: true, xen: true, kha: true});
  const [subtype, setSubtype] = useState({BV: true, VA: true, ST: true, RD: true});
  const [types, setTypes] = useState([]);

  const [shields, setShields] = useState([]);
  const [activeShield, setActiveShield] = useState(null);
  const [engines, setEngines] = useState([]);
  const [activeEngine, setActiveEngine] = useState(null);
  const [thrusters, setThrusters] = useState([]);
  const [activeThruster, setActiveThruster] = useState(null);
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    if (!props.x4.ships) props.fetchX4Ships();
    if (!props.x4.equipment) props.fetchX4Equipment();

    if (props.x4.ships) {
      const ships = props.x4.ships[size];
      const availableTypes = [];
      Object.keys(ships).forEach(key => (availableTypes.indexOf(ships[key].type) === -1 && availableTypes.push(ships[key].type)));
      setTypes(availableTypes);
    }

    if (props.x4.equipment) {
      const equipment = props.x4.equipment[sizeMap[size]];
      const eligibleShields = [];
      const eligibleEngines = [];
      const eligibleThrusters = [];

      Object.keys(equipment).forEach(key => {
        equipment[key].class === 'shield' && eligibleShields.push({name: equipment[key].name, id: key});
        equipment[key].class === 'engine' && eligibleEngines.push({name: equipment[key].name.replace('APL','SPL'), id: key});
        equipment[key].class === 'thruster' && eligibleThrusters.push({name: equipment[key].name, id: key});
      });

      setShields(() => eligibleShields);
      setEngines(() => eligibleEngines);
      setThrusters(() => eligibleThrusters);
    }
  }, [props.x4, size]);

  return (
    <div className='x4'>
      <h1>X4 Ship Previewer</h1>
      <div className='x4__dropdowns'>
        <Dropdowns shields={shields} setActiveShields={setActiveShield}
                   engines={engines} setActiveEngines={setActiveEngine}
                   thrusters={thrusters} setActiveThrusters={setActiveThruster}
                   setSize={setSize} setActiveType={setActiveType}
                   types={types}
        />
        <Races setRace={setRace} setSubtype={setSubtype} />
      </div>

      <div className='not-going-to-mobile'>
        <table>
          <tbody>
          {props.x4.ships && Object.keys(props.x4.ships[size]).map(id => {
            let ship = {...props.x4.ships[size][id]};
            if (!race[ship.race]) return null;
            if (!subtype[ship.shortvariation]) return null;
            if (activeType && activeType !== 'all' && ship.type !== activeType) return null;
            if (activeShield) ship = fillOntoShip(ship, props.x4.equipment, sizeMap[size], [activeShield]);
            if (activeEngine) ship = fillOntoShip(ship, props.x4.equipment, sizeMap[size], [activeEngine]);
            if (activeThruster) ship = fillOntoShip(ship, props.x4.equipment, sizeMap[size], [activeThruster]);
            return <ShipRow key={ship.id} ship={ship}/>;
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Ships, fetchX4Equipment};

export default connect(mapStateToProps, mapDispatchToProps)(index);
