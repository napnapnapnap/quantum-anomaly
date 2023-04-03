import Sequelize from 'sequelize';

import * as logger from '../../helpers/logger';
import { models } from '../../models';

export default async function () {
  logger.action(`Started generating NPC data`);

  // first in categories look up for entity ID, this will give you ID's of groups that fall into this category
  const entityGroups = (await models.EsiUniverseCategories.findOne({ where: { id: 11 } })).data.groups;

  // get all the categories that are related to entities
  let categories = await models.EsiUniverseGroups.findAll({ where: { id: { [Sequelize.Op.or]: entityGroups } } });

  // filter out those which don't have any types (items) assigned and map the rest into temp variables for later lookup
  const groupIdNameMap = {};
  let typeIds = [];

  categories = categories.filter((category) => {
    const hasTypes = category.data.types.length !== 0;
    if (hasTypes) {
      groupIdNameMap[category.id] = category.data.name;
      typeIds = typeIds.concat(category.data.types);
    }
    return hasTypes;
  });

  // let's save some database queries and hope we don't crash memory...
  let types = await models.EsiUniverseTypes.findAll({ where: { id: { [Sequelize.Op.or]: typeIds } } }),
    dogmaAttributes = await models.EsiDogmaAttributes.findAll(),
    EsiDogmaEffects = await models.EsiDogmaEffects.findAll();

  // we care only about inner data
  types = types.map((type) => type.data);

  // augment the dogma_attributes and add missing properties
  let npcs = types.map((npc) => {
    if (npc.dogma_attributes)
      npc.dogma_attributes = npc.dogma_attributes.map((attr) => {
        let fullAttribute = dogmaAttributes.find((dogmaAttr) => dogmaAttr.id === attr.attribute_id);
        return {
          name:
            fullAttribute.data.display_name.length !== 0 ? fullAttribute.data.display_name : fullAttribute.data.name,
          value: attr.value,
        };
      });

    if (npc.dogma_effects)
      npc.dogma_effects = npc.dogma_effects.map(
        (effect) => EsiDogmaEffects.find((dogmaEffect) => dogmaEffect.id === effect.effect_id).data
      );

    npc.group_name = groupIdNameMap[npc.group_id];

    npc = {
      id: npc.type_id,
      name: npc.name,
      data: npc,
      index: npc.name.replace(/ /g, '-').replace(/'/g, '').toLowerCase(),
    };

    return npc;
  });

  await models.EveNpcs.destroy({ truncate: true });
  logger.action(`Deleted EveNpcs items table`);

  await models.EveNpcs.bulkCreate(npcs);
  logger.action(`Added ${npcs.length} rows in EveNpcs group table`);
}
