import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import ShipPreview from './ShipPreview';
import {fetchX4Equipment, fetchX4Ships} from '../../redux/x4Actions';
import {fillOntoShip} from './x4-fitting-tool';
import {maps, separateWord} from './helpers';
import './X4.scss';

const RadioGroups = props => {
  if (props.items.length === 0) return null;

  const mkGroups = {};
  props.items.forEach(item => {
    let base = item.name.replace(/ Mk\d/, '');
    let race = 'GEN';
    if (item.name.indexOf('Thrusters') === -1) {
      base = item.name.replace(/ Mk\d/, '').replace(/\w\w\w /, '');
      race = item.name.substring(0, 3);
    }
    if (!mkGroups[base]) mkGroups[base] = {};
    if (!mkGroups[base][race]) mkGroups[base][race] = [];
    let mk = item.name.replace(base, '').trim().replace('  ', ' ');
    if (mk.length < 4) mk = `GEN ${mk}`;
    mkGroups[base][race].push({...item, mk});
  });
  const groupRandomName = Math.random();

  return (
    <div className={classnames('x4__radio-group', {['x4__radio-group--wide']: props.isBig})}>
      {Object.keys(mkGroups).map(baseKey => (
        <div className='x4__radio-base' key={baseKey}>
          <p className='x4__radio-title'>{baseKey}</p>
          {Object.keys(mkGroups[baseKey]).map(raceKey => (
            <div className='x4__radio-race' key={raceKey}>
              {mkGroups[baseKey][raceKey].map((item, index) => (
                <label className='x4__radio-label' key={item.id}>
                  <input type='radio'
                         name={groupRandomName}
                         value={item.id}
                         onChange={e => props.onChange(e.target.value)}/>
                  {item.mk}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const RadioSize = props => (
  <div className='x4__radio-group x4__radio-group--size'>
    <p className='x4__radio-title'>Size of ships to display</p>
    {props.sizes.map(size => (
      <label className='x4__radio-label' key={size}>
        <input type='radio'
               name='size'
               value={size}
               checked={size === props.size}
               onChange={e => {
                 props.setActiveShields(null);
                 props.setActiveEngines(null);
                 props.setActiveThrusters(null);
                 props.setActiveType(null);
                 props.setSize(e.target.value);
               }}/>
        {size.replace('ship_', '')
          .replace('xl', 'Extra Large')
          .replace('l', 'Large')
          .replace('m', 'Medium')
          .replace('s', 'Small')}
      </label>
    ))}
    <label className='label--checkbox'>
      <input type='checkbox' onChange={e => props.setComparisonMode(comparisonMode => !comparisonMode)}/>
      Comparison mode
    </label>
    <p className='x4__radio-title'>Types of ships to display</p>
    <label className='x4__radio-label capitalize'>
      <input type='radio' name='type' value='all' onChange={e => {
        props.setActiveType(e.target.value);
      }} checked={!props.activeType || props.activeType === 'all'}/>
      All types
    </label>
    {props.types.map(type => (
      <label className='x4__radio-label capitalize' key={type}>
        <input type='radio' name='type' value={type} onChange={e => {
          props.setActiveType(e.target.value);
        }}/>
        {separateWord(type)}
      </label>
    ))}
  </div>
);

const Races = props => (
  <div className='x4__checkboxes'>
    <div className='x4__checkbox-group'>
      <p className='x4__radio-title'>Display following races</p>
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
      ))}
    </div>
    <div className='x4__checkbox-group'>
      <p className='x4__radio-title'>Display following subtypes</p>
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
    <div className={classnames('x4', {['x4--comparison']: comparisonMode})}>
      <h1>X4 Ship Previewer</h1>
      <div className='x4__controls'>
        <RadioSize sizes={['ship_xl', 'ship_l', 'ship_m', 'ship_s']}
                   setSize={setSize}
                   setActiveShields={setActiveShield}
                   setActiveEngines={setActiveEngine}
                   setActiveThrusters={setActiveThruster}
                   setActiveType={setActiveType}
                   activeType={activeType}
                   setComparisonMode={setComparisonMode}
                   size={size}
                   types={types}
        />
        <Races setRace={setRace} setSubtype={setSubtype}/>
        <p className='divider'/>
        <RadioGroups items={[...engines]} onChange={setActiveEngine} isBig/>
        <RadioGroups items={[...shields]} onChange={setActiveShield}/>
        <RadioGroups items={[...thrusters]} onChange={setActiveThruster}/>
      </div>
      <p className='divider'/>
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
