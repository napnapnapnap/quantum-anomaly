const number = arg => arg ? parseInt(arg, 10).toLocaleString('de-DE', {style: 'decimal'}) : 0;
const float = arg => arg ? parseFloat(arg, 10).toLocaleString('de-DE', {
  style: 'decimal',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
}) : 0;

const separateWord = arg => arg.replace('large', 'large ').replace('heavy', 'heavy ');
const translateRace = arg => arg
  .replace('arg', 'Argon ')
  .replace('kha', 'Kha\'ak ')
  .replace('par', 'Paranid')
  .replace('spl', 'Split')
  .replace('tel', 'Teladi')
  .replace('xen', 'Xenon');

const Ship = ({ship}) => (
  <tr className='ship'>
    <td className='ship__image'><img src='/images/x4/na.png'/></td>
    <td className='ship__attributes ship__attributes--name ship__attributes--left'>
      <h2 className='ship__name bold'>{ship.name}</h2>
      <p className='ship__type'>{translateRace(ship.race)} {separateWord(ship.type)}</p>
      <p>Crew complement {ship.storage.people}</p>
    </td>
    <td className='ship__attributes ship__attributes--health'>
      <p>
        <span className='label'>Hull </span>
        <span className='value'>{number(ship.hull)} MJ</span>
      </p>
      <p>
        <span className='label'>Shields </span>
        <span className='value'>{number(ship.shield.max)} MJ</span>
      </p>
      <p>
        <span className='label'>Recharge </span>
        <span className='value'>{number(ship.shield.rate)} MJ/s</span>
      </p>
      <p>
        <span className='label'>Delay </span>
        <span className='value'>{number(ship.shield.delay)} s</span>
      </p>
    </td>
    <td className='ship__attributes ship__attributes--speed'>
      <p><span className='label'>Speed </span><span className='value'>{number(ship.speed.forward)} m/s</span></p>
      <p><span className='label'>Acc </span><span className='value value--unit-shifted'>{number(ship.speed.acceleration)} m/s²</span></p>
      <p><span className='label'>Boost </span><span className='value'>{number(ship.speed.boost)} m/s</span></p>
      <p><span className='label'>Travel </span><span className='value'>{number(ship.speed.travel)} m/s</span></p>
    </td>
    <td className='ship__attributes ship__attributes--maneuverability'>
      <p><span className='label'>Pitch </span><span className='value'>{float(ship.speed.pitch)} °/s</span></p>
      <p><span className='label'>Roll </span><span className='value'>{float(ship.speed.roll)} °/s</span></p>
      <p><span className='label'>Yaw </span><span className='value'>{float(ship.speed.yaw)} °/s</span></p>
    </td>
    <td className='ship__attributes ship__attributes--offensive'>
      <p><
        span className='label'>Weapons </span>
        <span className='value'>{ship.weapons.reduce((total, weapon) => total += weapon.quantity, 0)}</span></p>
      <p>
        <span className='label'>Turrets </span>
        <span className='value'>{ship.turrets.reduce((total, turret) => total += turret.quantity, 0)}</span></p>
      <p>
        <span className='label'>Missiles </span>
        <span className='value'>{ship.storage.missile}</span></p>
    </td>
    <td className='ship__attributes ship__attributes--defensive'>
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
        <span className='label capitalize'>{ship.storage.capacityType} storage</span>
        <span className='value'>{ship.storage.capacity} m³</span>
      </p>
    </td>
    <td></td>
  </tr>
);

export default Ship;
