import {models} from '../models';
import unitsInfo from '../app/eve-fitting-simulator/units';

import * as logger from '../helpers/logger';
import {dynamicSortMultiple} from "../helpers";

export function getShipGroups(req, res) {
  models.EveShipGroups.findAll({
    order: ['name']
  }).then(data => data.map(data => {
    return {id: data.id, name: data.name};
  })).then(data => res.json(data));
}

export function getShipGroup(req, res) {
  models.EveShipGroups.findOne({
    where: {id: req.body.id}
  }).then(group => {
    res.json({
      name:  group.name,
      id:    group.id,
      ships: group.data
    });
  });
}

export function getModuleGroups(req, res) {
  models.EveCache.findOne({
    where: {name: 'modules'}
  }).then(modules => res.json(modules.data));
}

export function getModuleGroup(req, res) {
  return models.EveModules
    .findAll({where: {market_group_id: req.body.id}})
    .then(modules => modules.map(module => {
      let dogmaAttributesObject = {},
          dogmaEffectsObject    = {};

      module.data.dogma_attributes.forEach(attr => dogmaAttributesObject[attr.attribute_id] = attr.value);
      module.data.dogma_attributes = dogmaAttributesObject;

      module.data.dogma_effects.forEach(attr => dogmaEffectsObject[attr.attribute_id] = attr.value);
      module.data.dogma_effects = dogmaEffectsObject;

      return {
        id:         module.id,
        name:       module.name,
        meta_level: module.data.meta_level,
        data:       module.data,
        group_name: module.data.group_name
      };
    }))
    .then(modules => modules.sort(dynamicSortMultiple('group_name', 'meta_level', 'name')))
    .then(modules => {
      let grouped = {};
      modules.forEach(module => {
        if (!grouped.hasOwnProperty(module.group_name)) grouped[module.group_name] = [];
        grouped[module.group_name].push(module);
      });
      return grouped;
    })
    .then(grouped => res.json(grouped));
}

export async function getDogma(req, res) {
  let dogmaAttributes = await models.EsiDogmaAttributes.findAll(),
      // TODO: THESE ARE THE SAME AS ATTR??? Further inspection needed
      dogmaEffects    = await models.EsiDogmaAttributes.findAll(),
      units           = unitsInfo();

  let dogmaAttributesObject = {},
      dogmaEffectsObject    = {},
      dogmaReverseInfo      = {};

  dogmaAttributes.forEach(attr => {
    if (attr.data.published) {
      let unit = units[attr.data.unit_id];
      if (unit) attr.data.unit = unit;
      dogmaAttributesObject[attr.id] = {...attr.data};
      // 1377 is weird case in API which overrides 48, investigate later
      if (attr.data.display_name && attr.id !== 1377) dogmaReverseInfo[attr.data.display_name] = attr.id;
    }
  });

  dogmaEffects.forEach(effect => {
    if (effect.data.published) {
      let unit = units[effect.data.unit_id];
      if (unit) effect.data.unit = unit;
      dogmaEffectsObject[effect.id] = {...effect.data};
    }
  });

  res.json({
    dogmaAttributes:  dogmaAttributesObject,
    dogmaEffects:     dogmaEffectsObject,
    dogmaReverseInfo: dogmaReverseInfo
  });
}

export async function getShip(req, res) {
  let ship = (await models.EveShips.findOne({where: {id: req.body.id}})).data;

  let dogmaAttributeObjects = {},
      dogmaEffectObjects    = {};

  ship.dogma_attributes.forEach(attr => dogmaAttributeObjects[attr.attribute_id] = attr.value);
  ship.dogma_effects.forEach(attr => dogmaEffectObjects[attr.attribute_id] = attr.value);

  ship.dogma_attributes = dogmaAttributeObjects;
  ship.dogma_effects    = dogmaEffectObjects;

  res.json(ship);
}
