// To use, send pure ship and equipment from store, then pass item ids as array of string, this function will fill out
// the available slots with that item and return modified ship
const int = arg => parseInt(arg, 10);
const float = arg => parseFloat(arg, 10);

export function fillOntoShip(ship, equipment, size, items) {
  items.forEach(item => {
    if (item.indexOf('shield') !== -1) {
      const shield = equipment[size][item].recharge.max;
      ship.shield = {
        max: int(ship.shields.quantity) * int(shield),
        rate: int(equipment[size][item].recharge.rate),
        delay: int(equipment[size][item].recharge.delay)
      }
    }
    if (item.indexOf('engine') !== -1) {
      const thrust = equipment[size][item].thrust.forward;
      const boost = equipment[size][item].boost.thrust;
      const travel = equipment[size][item].travel.thrust;
      ship.speed = {
        ... ship.speed,
        forward: (int(ship.engines.quantity) * float(thrust)) / float(ship.drag.forward),
        acceleration: (int(ship.engines.quantity) * float(thrust)) / float(ship.mass),
        travel: (float(ship.engines.quantity) * float(thrust) * float(travel)) / float(ship.drag.forward),
        boost:(float(ship.engines.quantity) * float(thrust) * float(boost)) / float(ship.drag.forward)
      }
    }
    if (item.indexOf('thruster') !== -1) {
      const pitch = equipment[size][item].thrust.pitch;
      const roll = equipment[size][item].thrust.roll;
      const yaw = equipment[size][item].thrust.yaw;
      ship.speed = {
        ... ship.speed,
        pitch: (float(pitch)) / float(ship.drag.pitch),
        roll: (float(roll)) / float(ship.drag.roll),
        yaw: (float(yaw)) / float(ship.drag.yaw)
      }
    }
  });
  return ship;
}
