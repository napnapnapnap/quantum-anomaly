import { X4ShipInterface } from '../../redux/x4/fitting';

export const applyEngineToTheShip = (ship: X4ShipInterface, equipment: any, engineId: string) => {
  const engine = equipment[engineId];

  ship.speed = {
    ...ship.speed,
    forward: (ship.engines.quantity * parseFloat(engine.thrust.forward)) / ship.drag.forward,
    acceleration: (ship.engines.quantity * parseFloat(engine.thrust.forward)) / ship.mass,
    travel: {
      speed:
        (ship.engines.quantity * parseFloat(engine.thrust.forward) * parseFloat(engine.travel.thrust)) /
        ship.drag.forward,
      attack: parseFloat(engine.travel.attack),
      charge: parseFloat(engine.travel.charge),
      release: parseFloat(engine.travel.release),
    },
    boost: {
      speed:
        (ship.engines.quantity * parseFloat(engine.thrust.forward) * parseFloat(engine.boost.thrust)) /
        ship.drag.forward,
      attack: parseFloat(engine.boost.attack),
      duration: parseFloat(engine.boost.duration),
      release: parseFloat(engine.boost.release),
    },
  };
};

export const applyThrusterToTheShip = (ship: X4ShipInterface, equipment: any, thrusterId: string) => {
  const thruster = equipment[thrusterId];

  ship.speed = {
    ...ship.speed,
    pitch: thruster.thrust.pitch / ship.drag.pitch,
    roll: thruster.thrust.roll / ship.drag.roll,
    yaw: thruster.thrust.yaw / ship.drag.yaw,
  };
};

export const applyShieldToTheShip = (ship: X4ShipInterface, equipment: any, shieldId: string) => {
  const shield = equipment[shieldId];

  ship.shield = {
    max: ship.shields.quantity * shield.recharge.max,
    rate: ship.shields.quantity * shield.recharge.rate,
    delay: shield.recharge.delay,
  };
};
