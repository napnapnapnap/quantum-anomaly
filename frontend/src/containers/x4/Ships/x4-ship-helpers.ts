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
};

export const initialStateDisplayDlcs: { [key: string]: boolean } = {
  base: true,
  cradleOfHumanity: true,
  tidesOfAvarice: true,
  splitVendetta: true,
  kingdomsEnd: false,
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

export const getHighestAvailableThrusterId = (ship: X4ShipInterface, activeEquipment: ActiveEquipment) => {
  const thrusterBaseId = activeEquipment.thruster.split('_');
  thrusterBaseId[2] = ship.class.replace('ship_', '');
  if (ship.class === 'ship_xl' || ship.class === 'ship_l') thrusterBaseId[3] = 'allround';

  return thrusterBaseId.join('_');
};

export const getHighestAvailableEngineId = (ship: X4ShipInterface, activeEquipment: ActiveEquipment) => {
  const engineBaseId = activeEquipment.engine.split('_');
  engineBaseId[1] = activeEquipment.engineRace;
  engineBaseId[2] = ship.class.replace('ship_', '');
  if ((ship.class === 'ship_xl' || ship.class === 'ship_l') && engineBaseId[3] === 'combat')
    engineBaseId[3] = 'allround';

  if (ship.class === 'ship_xl' || ship.class === 'ship_l') engineBaseId[5] = 'mk1';

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
  shieldBaseId[1] = activeEquipment.shieldRace;
  shieldBaseId[2] = ship.class.replace('ship_', '');
  if ((ship.class === 'ship_xl' || ship.class === 'ship_l') && activeEquipment.shieldRace !== 'ter')
    shieldBaseId[5] = 'mk1';
  if (
    (ship.class === 'ship_xl' || ship.class === 'ship_l') &&
    (shieldBaseId[5] === 'mk2' || shieldBaseId[5] === 'mk3') &&
    activeEquipment.shieldRace === 'ter'
  )
    shieldBaseId[5] = 'mk2';
  if (ship.class === 'ship_m' && shieldBaseId[5] === 'mk3' && activeEquipment.shieldRace !== 'ter')
    shieldBaseId[5] = 'mk2';

  let shieldId = shieldBaseId.join('_');
  // special cases for ships with their own versions
  if (!equipment[shieldId]) shieldId = shieldId.replace('standard_01', 'standard_02');
  if (ship.id === 'ship_pir_xl_battleship_01_a_macro') shieldId = 'shield_pir_xl_battleship_01_standard_01_mk1';

  return shieldId;
};
