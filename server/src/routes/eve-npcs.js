import {models} from '../models';
import Sequelize from 'sequelize';

function simplifyType(type) {
  const simpleTypes = ['Frigate', 'Destroyer', 'Cruiser', 'Battlecruiser', 'Battleship'];
  let result = type;

  simpleTypes.forEach(simpleType => {
    if (type.toLowerCase().indexOf(simpleType.toLowerCase()) !== -1) result = simpleType;
  });

  return result;
}

function checkForEffects(npc) {
  const result = {};
  if (!npc.dogma_effects || !npc.dogma_attributes) return null;
  npc.dogma_effects.map(effect => {
    if (effect.name === 'warpScrambleForEntity') result.scram = true;
    if (effect.name === 'modifyTargetSpeed2') result.web = true;
    if (effect.name === 'npcEntityTrackingDisruptor') result.trackingDisr = true;
    if (effect.name === 'entityEnergyNeutralizerFalloff') result.energyNeut = true;
    if (effect.name === 'entitySensorDampen') result.sensorDamp = true;
    if (effect.name === 'entityECMFalloff') result.ecm = true;
    if (effect.name === 'entityTargetPaint') result.paint = true;
  });
  // this seems not to have any affect if there is no effect name to trigger this behaviour... strange though
  // npc.dogma_attributes.map(attr => {
  //   if (attr.name === 'entityWarpScrambleChance' && attr.value > 0) result.scram = true;
  //   if (attr.name === 'modifyTargetSpeedChance' && attr.value > 0) result.web = true;
  // });
  return result;
}

export async function getNpcByIndex(req, res) {
  const npcs   = await models.EveNpcs.findAll({where: {index: {[Sequelize.Op.or]: req.params.indices.split(';')}}}),
        result = {};

  npcs.forEach(npc => {
    result[npc.index] = {
      ...npc.data,
      flags: {
        ...checkForEffects(npc.data),
        type: simplifyType(npc.data.group_name)
      }
    };
    delete result[npc.index].description;
    delete result[npc.index].group_name;
    // delete result[npc.index].dogma_attributes;
    // delete result[npc.index].dogma_effects;
  });

  res.json(result);
}

export async function getNpcs(req, res) {
  res.json(await models.EveNpcs.findAll());
}

export async function getList(req, res) {
  res.json(await models.EveNpcs.findAll().then(results => results.map(item => item.index)));
}
