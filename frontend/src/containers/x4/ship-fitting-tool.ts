import { X4ShipInterface } from '../../redux/x4/fitting';

export const applyEngineToTheShip = (ship: X4ShipInterface, equipment: any, engineId: string, mod?: string[]) => {
  const engine = equipment[engineId];

  let travelThrust = parseFloat(engine.travel.thrust);
  let shipDragForward = ship.drag.forward;

  if (mod?.includes('reaver')) travelThrust = travelThrust * 1.4;
  if (mod?.includes('polisher')) shipDragForward = shipDragForward * 0.84;

  ship.speed = {
    ...ship.speed,
    forward: (ship.engines.quantity * parseFloat(engine.thrust.forward)) / shipDragForward,
    acceleration: (ship.engines.quantity * parseFloat(engine.thrust.forward)) / ship.mass,
    travel: {
      speed: (ship.engines.quantity * parseFloat(engine.thrust.forward) * travelThrust) / shipDragForward,
      attack: parseFloat(engine.travel.attack),
      charge: parseFloat(engine.travel.charge),
      release: parseFloat(engine.travel.release),
    },
    boost: {
      speed:
        (ship.engines.quantity * parseFloat(engine.thrust.forward) * parseFloat(engine.boost.thrust)) / shipDragForward,
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

export const timeToCoverDistance = (distance: number, acceleration: number) => {
  return Math.sqrt((2 * distance) / acceleration);
};
