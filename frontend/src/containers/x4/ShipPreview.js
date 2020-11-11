import {float, int, maps, separateWord, translateRace} from './helpers';

const Armaments = props => {
  const {large, medium, small} = props.ship.armaments[props.type];
  if (large === 0 && medium === 0 && small === 0) return 'None';
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
    <h4 className='x4__title'>
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
        <p>
          <span className='label'>Hull</span>
          <span className='value'>{int(ship.hull)} MJ</span>
        </p>
        <p>
          <span className='label'>Mass</span>
          <span className='value'>{int(ship.mass)} t</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label'>Shields</span>
          <span className='value'>{int(ship.shield.max)} MJ</span>
        </p>
        <p>
          <span className='label'>Recharge</span>
          <span className='value'>{int(ship.shield.rate)} MJ/s</span>
        </p>
        <p>
          <span className='label'>Recharge delay</span>
          <span className='value'>{int(ship.shield.delay)} s</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label'>Speed </span>
          <span className='value'>{int(ship.speed.forward)} m/s</span>
        </p>
        <p><
          span className='label'>Acceleration </span>
          <span className='value value--unit-shifted'>{int(ship.speed.acceleration)} m/s²</span>
        </p>
        <p>
          <span className='label'>Boost </span>
          <span className='value'>{int(ship.speed.boost)} m/s</span>
        </p>
        <p>
          <span className='label'>Travel </span>
          <span className='value'>{int(ship.speed.travel)} m/s</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label'>Pitch </span>
          <span className='value'>{float(ship.speed.pitch)} °/s</span>
        </p>
        <p>
          <span className='label'>Roll </span>
          <span className='value'>{float(ship.speed.roll)} °/s</span>
        </p>
        <p>
          <span className='label'>Yaw </span>
          <span className='value'>{float(ship.speed.yaw)} °/s</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label label--flip'>Main seller:</span>
          <span className='value value--flip'>
            {ship.manufacturer === 'khaak' || ship.manufacturer === 'xenon'
              ? 'Not sold'
              : maps.factions[ship.manufacturer] || ship.manufacturer
            }
          </span>
        </p>
        <p>
          <span className='label'>Average cost: </span>
          <span className='value'>
            {ship.manufacturer === 'khaak' || ship.manufacturer === 'xenon'
              ? 'Not sold'
              : `${int(ship.price.average)} CR`
            }
          </span>
        </p>
        <p className='divider'/>
      </div>

      <div className='x4__attributes-column'>
        <p>
          <span className='label'>Weapons </span>
          <span className='value'><Armaments ship={ship} type='weapons'/></span>
        </p>
        <p>
          <span className='label'>Turrets </span>
          <span className='value'><Armaments ship={ship} type='turrets'/></span>
        </p>
        <p>
          <span className='label'>Missiles </span>
          <span className='value'>{ship.storage.missile} units</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label'>Drones </span>
          <span className='value'>{ship.storage.unit || 0} units</span>
        </p>
        <p>
          <span className='label'>Deployables </span>
          <span className='value'>{ship.storage.deployable} units</span>
        </p>
        <p>
          <span className='label'>Countermeasures </span>
          <span className='value'>{ship.storage.countermeasure} units</span>
        </p>
        <p>
          <span className='label'>Crew </span>
          <span className='value'>{ship.storage.people} people</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label'>Storage type</span><span
          className='value capitalize'>{ship.storage.capacityType}</span>
        </p>
        <p>
          <span className='label'>Capacity</span>
          <span className='value'>{int(ship.storage.capacity)} m³</span>
        </p>
        <p className='divider'/>
        <p>
          <span className='label'>Medium dock</span>
          <span className='value'>{ship.shipstorage.dock_m} ships</span>
        </p>
        <p>
          <span className='label'>Small dock</span>
          <span className='value'>{ship.shipstorage.dock_s} ships</span>
        </p>
        <p className='divider'/>
        {ship.manufacturer !== 'khaak' && (
          <div key={Math.random()}>
            <p>
              <span className='label'>Time to build</span>
              <span className='value'>{Math.floor(ship.production.time / 60)} min {ship.production.time % 60} sec</span>
            </p>
            {ship.production.primary.ware.map(item => (
              <p key={Math.random()}>
                <span className='label capitalize'>{separateWord(item.ware)}</span>
                <span className='value'>{int(item.amount)}</span>
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
