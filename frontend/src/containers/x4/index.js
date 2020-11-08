import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchX4Equipment, fetchX4Ships} from '../../redux/x4Actions';
import {fillOntoShip} from './x4-fitting-tool';
import './X4.scss';

const racesMap = [{label: 'Argon', value: 'arg'}, {label: 'Paranid', value: 'par'},
  {label: 'Split', value: 'spl'}, {label: 'Teladi', value: 'tel'}, {label: 'Xenon', value: 'xen'}];

const sizeMap = {ship_xl: 'extralarge', ship_l: 'large', ship_m: 'medium', ship_s: 'small'};
const number = arg => arg ? parseInt(arg, 10).toLocaleString('de-DE', {style: 'decimal'}) : 0;

const Dropdowns = props => (
  <div className='x4__dropdown'>
    <select onChange={e => {
      props.setActiveShields(null);
      props.setActiveEngines(null);
      props.setActiveThrusters(null);
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
  </div>
);

const Races = props => (
  <div>
    Show following races: &nbsp;&nbsp;
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
  </div>
);

const Ship = (ship) => (
  <tr key={ship.id} className='ship'>
    <td className='ship__image'><img src='/images/x4/na.png'/></td>
    <td className='ship__attributes ship__attributes--left'>
      <h2 className='ship__name bold'>{ship.name}</h2>
      <p className='ship__type'>{ship.type}</p>
      <p>{ship.storage.capacity}m³ {ship.storage.capacityType}</p>
      <p>Crew: {ship.storage.people}</p>
    </td>
    <td className='ship__attributes'>
      <p>Hull: {number(ship.hull)} MJ</p>
      <p>Shields: {number(ship.shield.max)} MJ</p>
      <p>Recharge: {number(ship.shield.rate)} MJ/s</p>
      <p>Delay: {number(ship.shield.delay)} s</p>
    </td>
    <td className='ship__attributes'>
      <p>Speed: {number(ship.speed.forward)} m/s</p>
      <p>Acc: {number(ship.speed.acceleration)} m/s²</p>
      <p>Boost: {number(ship.speed.boost)} m/s</p>
      <p>Travel: {number(ship.speed.travel)} m/s</p>
    </td>
    <td className='ship__attributes'>
      <p>Weapons: {ship.weapons.reduce((total, weapon) => total+=weapon.quantity, 0)}</p>
      <p>Turrets: {ship.turrets.reduce((total, turret) => total+=turret.quantity, 0)}</p>
      <p>Missiles: {ship.storage.missile}</p>
    </td>
    <td className='ship__attributes'>
      <p>Drones: {ship.storage.unit || 0}</p>
      <p>Deployables: {ship.storage.deployable}</p>
      <p>Countermeasures: {ship.storage.countermeasure}</p>
    </td>
    <td></td>
  </tr>
);

const index = (props) => {
  const [size, setSize] = useState('ship_xl');
  const [race, setRace] = useState({arg: true, par: true, spl: true, tel: true, xen: true});
  const [shields, setShields] = useState([]);
  const [activeShield, setActiveShield] = useState(null);
  const [engines, setEngines] = useState([]);
  const [activeEngine, setActiveEngine] = useState(null);
  const [thrusters, setThrusters] = useState([]);
  const [activeThruster, setActiveThruster] = useState(null);

  useEffect(() => {
    if (!props.x4.ships) props.fetchX4Ships();
    if (!props.x4.equipment) props.fetchX4Equipment();

    if (props.x4.equipment) {
      const eligibleShields = Object.keys(props.x4.equipment[sizeMap[size]]).filter(key => key.indexOf('shield') !== -1);
      setShields(() => {
        return eligibleShields.map(eligibleShield => ({
          name: props.x4.equipment[sizeMap[size]][eligibleShield].name,
          id: eligibleShield
        }));
      });
      const eligibleEngines = Object.keys(props.x4.equipment[sizeMap[size]]).filter(key => key.indexOf('engine') !== -1);
      setEngines(() => {
        return eligibleEngines.map(eligibleEngine => ({
          name: props.x4.equipment[sizeMap[size]][eligibleEngine].name,
          id: eligibleEngine
        }));
      });
      const eligibleThrusters = Object.keys(props.x4.equipment[sizeMap[size]]).filter(key => key.indexOf('thruster') !== -1);
      setThrusters(() => {
        return eligibleThrusters.map(eligibleThruster => ({
          name: props.x4.equipment[sizeMap[size]][eligibleThruster].name,
          id: eligibleThruster
        }));
      });
    }
  }, [props.x4, size]);

  return (
    <div className='x4'>
      <h1>X4 Ship Previewer</h1>
      <div className='x4__dropdowns'>
        <Dropdowns shields={shields} setActiveShields={setActiveShield}
                   engines={engines} setActiveEngines={setActiveEngine}
                   thrusters={thrusters} setActiveThrusters={setActiveThruster}
                   setSize={setSize}
        />
        <Races setRace={setRace}/>
      </div>

      <div className='not-going-to-mobile'>
        <table>
          <tbody>
          {props.x4.ships && Object.keys(props.x4.ships[size]).map(id => {
            let ship = {...props.x4.ships[size][id]};
            if (!race[ship.race]) return null;
            if (activeShield) ship = fillOntoShip(ship, props.x4.equipment, sizeMap[size], [activeShield]);
            if (activeEngine) ship = fillOntoShip(ship, props.x4.equipment, sizeMap[size], [activeEngine]);
            if (activeThruster) ship = fillOntoShip(ship, props.x4.equipment, sizeMap[size], [activeThruster]);
            return Ship(ship);
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
