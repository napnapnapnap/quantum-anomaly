import React from 'react';
import {float, int, maps, separateWord, translateRace} from '../helpers';
import './ShipPreview.scss';

const Armaments = props => {
  const {large, medium, small} = props.ship.armaments[props.type];
  if (large === 0 && medium === 0 && small === 0) return 'none';
  return (
    <span>
      {large !== 0 && <span className='x4__armament-item'>{large} L</span>}
      {medium !== 0 && <span className='x4__armament-item'>{medium} M</span>}
      {small !== 0 && <span className='x4__armament-item'>{small} S</span>}
   </span>
  );
};

const ShipPreview = ({ship}) => (
  <div className='x4__ship'>
    <h4 className='x4__name'>
      <span className='bold'>{ship.name}</span> {translateRace(ship.race)} {separateWord(ship.type)}
    </h4>
    <div className='x4__image'>
      <img src={`/images/x4/${ship.id}.jpg`}/>
      {ship.description && (
        <div className='x4__ship-description' title={ship.description.replace(/\\n/g, ' ')}>?</div>
      )}
    </div>
    <div className='x4__attributes'>
      <div className='x4__attributes-column'>
        <p className='x4__attribute-line x4__attribute-line--double x4__attribute-line--large-number'>
          <span>Hull</span>
          <span>{int(ship.hull)} MJ</span>
          <span>Mass</span>
          <span>{int(ship.mass)} t</span>
        </p>
        <p className='divider'/>
        <p className='x4__attribute-line x4__attribute-line--double x4__attribute-line--large-number'>
          <span>Shields</span>
          <span>{int(ship.shield.max)} MJ</span>
          <span>Recharge</span>
          <span>{int(ship.shield.rate)} MJ/s</span>
        </p>
        {ship.class === 'ship_s' && (
          <p className='x4__attribute-line x4__attribute-line--half'>
            <span>Recharge delay</span>
            <span>{int(ship.shield.delay)} s</span>
          </p>)}
        <p className='divider'/>
        <p className='x4__attribute-line x4__attribute-line--double'>
          <span>Speed</span>
          <span>{int(ship.speed.forward)} m/s</span>
          <span>Travel speed</span>
          <span>{int(ship.speed.travel)} m/s</span>
        </p>
        <p className='x4__attribute-line x4__attribute-line--double'>
          <span>Acceleration</span>
          <span className='unit-shifted'>{int(ship.speed.acceleration)} m/s²</span>
          <span>Boost speed</span>
          <span>{int(ship.speed.boost)} m/s</span>
        </p>
        <p className='divider'/>
        <p className='x4__attribute-line x4__attribute-line--manuverability'>
          <span>Pitch</span>
          <span>{float(ship.speed.pitch)} °/s</span>
          <span>Roll</span>
          <span>{float(ship.speed.roll)} °/s</span>
          <span>Yaw</span>
          <span>{float(ship.speed.yaw)} °/s</span>
        </p>
        <p className='divider'/>
        <p className='x4__attribute-line'>
          <span className='label label--flip'>Main seller:</span>
          <span className='value value--flip'>
            {ship.manufacturer === 'khaak' || ship.manufacturer === 'xenon'
              ? 'Not sold'
              : maps.factions[ship.manufacturer] || ship.manufacturer
            }
         </span>
        </p>
        <p className='x4__attribute-line'>
          <span>Average cost:</span>
          <span>
            {ship.manufacturer === 'khaak' || ship.manufacturer === 'xenon'
              ? 'Not sold'
              : `${int(ship.price.average)} CR`
            }
         </span>
        </p>
        <p className='divider'/>
      </div>

      <div className='x4__attributes-column'>
        <p className='x4__attribute-line x4__attribute-line--double'>
          <span>Weapons</span>
          <span><Armaments ship={ship} type='weapons'/></span>
          <span>Turrets</span>
          <span><Armaments ship={ship} type='turrets'/></span>
        </p>
        <p className='x4__attribute-line x4__attribute-line--double'>
          <span>Missiles</span>
          <span>{ship.storage.missile} units</span>
          <span>Countermeasures</span>
          <span>{ship.storage.countermeasure}</span>
        </p>
        <p className='divider'/>
        <p className='x4__attribute-line x4__attribute-line--double'>
          <span>Drones</span>
          <span>{ship.storage.unit || 0} units</span>
          <span>Deployables</span>
          <span>{ship.storage.deployable} units</span>
        </p>
        <p className='divider'/>
        <p className='x4__attribute-line x4__attribute-line--double x4__attribute-line--cargo'>
          <span>Crew</span>
          <span>{ship.storage.people}</span>
          <span className='value capitalize'>{ship.storage.capacityType}</span>
          <span className='unit-shifted'>{int(ship.storage.capacity)} m³</span>
        </p>
        <p className='divider'/>
        {ship.class !== 'ship_s' && (
          <>
            <p className='x4__attribute-line x4__attribute-line--double'>
              <span>M dock</span>
              <span>{ship.shipstorage.dock_m} ships</span>
              <span>S dock</span>
              <span>{ship.shipstorage.dock_s} ships</span>
            </p>
            <p className='divider'/>
          </>)}
        {ship.manufacturer !== 'khaak' && (
          <div key={Math.random()}>
            <p className='x4__attribute-line'>
              <span>Time to build</span>
              <span>{Math.floor(ship.production.time / 60)} min {ship.production.time % 60} sec</span>
            </p>
            {ship.production.primary.ware.map(item => (
              <p className='x4__attribute-line' key={Math.random()}>
                <span className='label capitalize'>{separateWord(item.ware)}</span>
                <span>{int(item.amount)}</span>
              </p>
            ))}
            <p className='divider'/>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ShipPreview;
