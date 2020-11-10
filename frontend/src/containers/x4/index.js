import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import ShipPreview from './ShipPreview';
import {fetchX4Equipment, fetchX4Ships} from '../../redux/x4Actions';
import {fillOntoShip} from './x4-fitting-tool';
import {maps, separateWord} from './helpers';
import './X4.scss';

const GroupedOptions = props => {
  if (props.items.length === 0) return null;

  const groups = {};
  props.items.forEach(item => {
    const race = item.name.substring(0, 3);
    groups[race] ? groups[race].push(item) : groups[race] = [item];
  });

  return Object.keys(groups).map(key => (
    <optgroup key={key} label={maps.reverseRace[key.toLowerCase()]}>
      {groups[key].map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
    </optgroup>
  ));
};

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
      <option value='none'>No shields</option>
      <GroupedOptions items={[...props.shields]}/>
    </select>
    <select onChange={e => props.setActiveEngines(e.target.value)}>
      <option value='none'>No engine</option>
      <GroupedOptions items={[...props.engines]}/>
    </select>
    <select onChange={e => props.setActiveThrusters(e.target.value)}>
      <option value='none'>No thrusters</option>
      <optgroup label='Thrusters'>
        {props.thrusters.map(thruster => (
          <option key={thruster.id} value={thruster.id}>{thruster.name}</option>
        ))}
      </optgroup>
    </select>
    <select onChange={e => props.setActiveType(e.target.value)}>
      <option value='all'>All types of ship</option>
      <optgroup label='Ship Types'>
        {props.types.map(type => (
          <option key={type} value={type}>{separateWord(type)}</option>
        ))}
      </optgroup>
    </select>
  </div>
);

const Races = props => (
  <div>
    {maps.race.map(mapRace => (
      <label className='label--checkbox' key={mapRace.value}>
        <input type='checkbox'
               onChange={e => props.setRace(race => {
                 const selectedRace = {};
                 selectedRace[mapRace.value] = e.target.checked;
                 return {...race, ...selectedRace};
               })}
               defaultChecked
        />
        {mapRace.label}
      </label>
    ))}<br/>
    <label className='label--checkbox'>
      <input type='checkbox' onChange={e => props.setComparisonMode(comparisonMode => !comparisonMode)}/>
      Compare mode
    </label>
    {maps.subtype.map(mapSubtype => (
      <label className='label--checkbox' key={mapSubtype.value}>
        <input type='checkbox'
               onChange={e => props.setSubtype(subtype => {
                 const selectedSubtype = {};
                 selectedSubtype[mapSubtype.value] = e.target.checked;
                 return {...subtype, ...selectedSubtype};
               })}
               defaultChecked
        />
        {mapSubtype.label}
      </label>
    ))}
  </div>
);

const index = (props) => {
  const [size, setSize] = useState('ship_xl');
  const [race, setRace] = useState({arg: true, par: true, spl: true, tel: true, xen: true, kha: true});
  const [subtype, setSubtype] = useState({BV: true, VA: true, ST: true, RD: true});
  const [types, setTypes] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const [shields, setShields] = useState([]);
  const [activeShield, setActiveShield] = useState(null);
  const [engines, setEngines] = useState([]);
  const [activeEngine, setActiveEngine] = useState(null);
  const [thrusters, setThrusters] = useState([]);
  const [activeThruster, setActiveThruster] = useState(null);
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    if (!props.x4.ships) props.fetchX4Ships().then(() => props.fetchX4Equipment());

    if (props.x4.ships) {
      const ships = props.x4.ships[size];
      const availableTypes = [];
      Object.keys(ships).forEach(key => (availableTypes.indexOf(ships[key].type) === -1 && availableTypes.push(ships[key].type)));
      setTypes(availableTypes);
    }

    if (props.x4.equipment) {
      const equipment = props.x4.equipment[maps.size[size]];
      const eligibleShields = [];
      const eligibleEngines = [];
      const eligibleThrusters = [];

      Object.keys(equipment).forEach(key => {
        equipment[key].class === 'shield' && eligibleShields.push({name: equipment[key].name, id: key});
        equipment[key].class === 'engine' && eligibleEngines.push({name: equipment[key].name, id: key});
        equipment[key].class === 'thruster' && eligibleThrusters.push({name: equipment[key].name, id: key});
      });

      setShields(() => eligibleShields);
      setEngines(() => eligibleEngines);
      setThrusters(() => eligibleThrusters);
    }
  }, [props.x4, size]);

  return (
    <div className={classnames('x4', {['x4--comparison']: comparisonMode })}>
      <h1>X4 Ship Previewer</h1>
      <div className='x4__dropdowns'>
        <Dropdowns shields={shields} setActiveShields={setActiveShield}
                   engines={engines} setActiveEngines={setActiveEngine}
                   thrusters={thrusters} setActiveThrusters={setActiveThruster}
                   setSize={setSize} setActiveType={setActiveType}
                   types={types}
        />
        <Races setRace={setRace} setSubtype={setSubtype} setComparisonMode={setComparisonMode}/>
      </div>

      <div className='x4__ships'>
        {props.x4.ships && Object.keys(props.x4.ships[size]).map(id => {
          let ship = {...props.x4.ships[size][id]};
          if (!race[ship.race]) return null;
          if (!subtype[ship.shortvariation]) return null;
          if (activeType && activeType !== 'all' && ship.type !== activeType) return null;
          if (activeShield) ship = fillOntoShip(ship, props.x4.equipment, maps.size[size], [activeShield]);
          if (activeEngine) ship = fillOntoShip(ship, props.x4.equipment, maps.size[size], [activeEngine]);
          if (activeThruster) ship = fillOntoShip(ship, props.x4.equipment, maps.size[size], [activeThruster]);
          return <ShipPreview key={ship.id} ship={ship}/>;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Ships, fetchX4Equipment};

export default connect(mapStateToProps, mapDispatchToProps)(index);
