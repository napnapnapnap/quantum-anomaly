import { X4ShipClassEnum, X4ShipInterface } from '../../../redux/x4/fitting';

export const initialStateDisplayRaces: { [key: string]: boolean } = {
  atf: true,
  arg: true,
  par: true,
  spl: true,
  tel: true,
  ter: true,
  yak: true,
  xen: true,
  kha: true,
  pir: true,
  bor: true,
};

export const initialStateDisplayDlcs: { [key: string]: boolean } = {
  base: true,
  cradleOfHumanity: true,
  tidesOfAvarice: true,
  splitVendetta: true,
  kingdomEnd: true,
};

export const initialStateDisplayVariations = { BV: true, VA: true, ST: true, RD: true };

export const initialStateDisplayClass: { [key in X4ShipClassEnum]: boolean } = {
  ship_xl: true,
  ship_l: true,
  ship_m: true,
  ship_s: true,
};

export interface ActiveEquipment {
  thruster: string;
  engine: string;
  engineRace: string;
  shield: string;
  shieldRace: string;
}

export const initialActiveEquipment = {
  thruster: 'thruster_gen_SIZE_combat_01_mk3',
  engine: 'engine_RACE_SIZE_allround_01_mk3',
  engineRace: 'ter',
  shield: 'shield_RACE_SIZE_standard_01_mk3',
  shieldRace: 'ter',
};

export const getShipNativeEquipmentRace = (ship: X4ShipInterface) => {
  let race = ship.race;
  if (ship.race === 'pir') race = 'arg';
  else if (ship.race === 'atf') race = 'ter';
  else if (ship.race === 'yak') race = 'par';

  return race;
};

export const getHighestAvailableThrusterId = (ship: X4ShipInterface, activeEquipment: ActiveEquipment) => {
  const thrusterBaseId = activeEquipment.thruster.split('_');
  thrusterBaseId[2] = ship.class.replace('ship_', '');
  if (ship.class === 'ship_xl' || ship.class === 'ship_l') thrusterBaseId[3] = 'allround';

  return thrusterBaseId.join('_');
};

export const getHighestAvailableEngineId = (ship: X4ShipInterface, activeEquipment: ActiveEquipment) => {
  const engineBaseId = activeEquipment.engine.split('_');
  const isLargeShip = ship.class === 'ship_xl' || ship.class === 'ship_l';
  const isSmallMediumShip = ship.class === 'ship_m' || ship.class === 'ship_s';

  engineBaseId[1] = activeEquipment.engineRace;
  if (engineBaseId[1] === 'native') engineBaseId[1] = getShipNativeEquipmentRace(ship);

  if (ship.race === 'bor') engineBaseId[1] = 'bor';
  if (ship.race === 'xen') engineBaseId[1] = 'xen';
  if (ship.race === 'kha') engineBaseId[1] = 'kha';

  engineBaseId[2] = ship.class.replace('ship_', '');

  if (isLargeShip && engineBaseId[3] === 'combat') engineBaseId[3] = 'allround';

  if (isLargeShip) engineBaseId[5] = 'mk1';
  if (engineBaseId[1] !== 'spl' && engineBaseId[5] === 'mk4') engineBaseId[5] = 'mk3';

  if (ship.race === 'bor' && isLargeShip) engineBaseId[3] = 'travel';
  if (ship.race === 'bor' && isSmallMediumShip) engineBaseId[3] = 'allround';
  if (ship.race === 'kha' && isSmallMediumShip) engineBaseId[3] = 'combat';
  if (ship.race === 'kha' && isSmallMediumShip) engineBaseId[5] = 'mk1';
  if (ship.race === 'xen' && isSmallMediumShip && engineBaseId[3] === 'allround') engineBaseId[3] = 'combat';
  if (ship.race === 'xen') engineBaseId[5] = 'mk1';

  let engineId = engineBaseId.join('_');
  // special cases for ships with their own versions
  if (ship.id === 'ship_pir_xl_battleship_01_a_macro') engineId = 'engine_pir_xl_battleship_01_allround_01_mk1';
  if (ship.id === 'ship_gen_m_yacht_01_a_macro') engineId = 'engine_gen_m_yacht_01_mk1';

  return engineId;
};

export const getHighestAvailableShieldId = (
  ship: X4ShipInterface,
  activeEquipment: ActiveEquipment,
  equipment: any
) => {
  const shieldBaseId = activeEquipment.shield.split('_');
  const isLargeShip = ship.class === 'ship_xl' || ship.class === 'ship_l';
  const isMediumShip = ship.class === 'ship_m';
  const isSmallMediumShip = ship.class === 'ship_m' || ship.class === 'ship_s';

  shieldBaseId[1] = activeEquipment.shieldRace;
  if (shieldBaseId[1] === 'native') shieldBaseId[1] = getShipNativeEquipmentRace(ship);

  if (ship.race === 'bor') shieldBaseId[1] = 'bor';
  if (ship.race === 'xen') shieldBaseId[1] = 'xen';
  if (ship.race === 'kha') shieldBaseId[1] = 'kha';

  shieldBaseId[2] = ship.class.replace('ship_', '');

  if (isLargeShip && activeEquipment.shieldRace !== 'ter') shieldBaseId[5] = 'mk1';
  if (shieldBaseId[5] === 'mk3') {
    if (isLargeShip && activeEquipment.shieldRace === 'ter') shieldBaseId[5] = 'mk2';
    if (isMediumShip && activeEquipment.shieldRace !== 'ter') shieldBaseId[5] = 'mk2';
  }

  if (ship.race === 'xen' && isSmallMediumShip && shieldBaseId[5] === 'mk3') shieldBaseId[5] = 'mk2';
  if (ship.race === 'xen' && ship.class === 'ship_xl' && shieldBaseId[5] === 'mk2') shieldBaseId[5] = 'mk1';
  if (ship.race === 'kha' && isSmallMediumShip) shieldBaseId[5] = 'mk1';

  let shieldId = shieldBaseId.join('_');
  // special cases for ships with their own versions
  if (!equipment[shieldId]) shieldId = shieldId.replace('standard_01', 'standard_02');
  if (ship.id === 'ship_pir_xl_battleship_01_a_macro') shieldId = 'shield_pir_xl_battleship_01_standard_01_mk1';

  return shieldId;
};
