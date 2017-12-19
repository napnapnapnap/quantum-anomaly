import * as logger from '../../helpers/logger';

function addTraitsToShips(ships, sequelize) {
  const query = 'SELECT * FROM "invTraits"';

  let promiseArray = [];

  ships.forEach(ship => {
    promiseArray.push(
      sequelize.query(query + ' WHERE "typeID"=' + ship.typeID, {type: sequelize.QueryTypes.SELECT})
        .then(traits => {
          traits.forEach(trait => {
            if (trait.bonusText) {
              trait.bonusText = trait.bonusText.replace(/<a.*?>/g, '').replace(/<\/a>/g, '');
            }
            if (!ship.traits) ship.traits = {};
            if (trait.skillID === -1) {
              if (!ship.traits['Ship']) ship.traits['Ship'] = [];
              ship.traits['Ship'].push(trait);
            } else {
              if (!ship.traits[trait.skillID]) ship.traits[trait.skillID] = [];
              ship.traits[trait.skillID].push(trait);
            }
          });
        })
    );
  });

  return Promise.all(promiseArray);
}


function addPropertiesToShips(ships, sequelize) {
  const query = 'SELECT * FROM "dgmTypeAttributes" ' +
    'INNER JOIN "dgmAttributeTypes" ' +
    'ON "dgmTypeAttributes"."attributeID" = "dgmAttributeTypes"."attributeID"';

  let promiseArray = [];

  ships.forEach(ship => {
    promiseArray.push(
      sequelize.query(query + ' WHERE "typeID"=' + ship.typeID, {type: sequelize.QueryTypes.SELECT})
        .then(attributes => {
          attributes.forEach(attribute => {
            if (attribute.published) {
              ship[attribute.attributeName] = attribute.valueFloat;
              if (!ship[attribute.attributeName]) {
                ship[attribute.attributeName] = attribute.valueInt;
              }
            }
          });
        })
    );
  });

  return Promise.all(promiseArray);
}

function percentagize(value) {
  return Math.round((1 - value) * 1000) / 10;
}

function cleanExtraKeysAndReformatProperties(ships) {
  ships.forEach(ship => {
    // Delete unused attributes
    delete ship.anchorable;
    delete ship.anchored;
    delete ship.categoryID;
    delete ship.categoryName;
    delete ship.description;
    delete ship.fittableNonSingleton;
    delete ship.graphicID;
    delete ship.groupID;
    delete ship.iconID;
    delete ship.marketGroupID;
    delete ship.portionSize;
    delete ship.published;
    delete ship.shortDescription;
    delete ship.soundID;
    delete ship.useBasePrice;

    // As of version EVE version 119.5 ships without Race ID are Concord ships
    // Afterwards delete raceID since we don't need it
    if (ship.raceID === null) {
      ship.raceName = 'Concord';
    }
    delete ship.raceID;

    // Let's compress this into one object for easier access and lets unify the attribute naming
    // Afterwards delete original attributes
    ship.shieldProfile = {
      em:        percentagize(ship.shieldEmDamageResonance),
      thermal:   percentagize(ship.shieldThermalDamageResonance),
      kinetic:   percentagize(ship.shieldKineticDamageResonance),
      explosive: percentagize(ship.shieldExplosiveDamageResonance)
    };

    ship.armorProfile = {
      em:        percentagize(ship.armorEmDamageResonance),
      thermal:   percentagize(ship.armorThermalDamageResonance),
      kinetic:   percentagize(ship.armorKineticDamageResonance),
      explosive: percentagize(ship.armorExplosiveDamageResonance)
    };

    ship.hullProfile = {
      em:        percentagize(ship.emDamageResonance),
      thermal:   percentagize(ship.thermalDamageResonance),
      kinetic:   percentagize(ship.kineticDamageResonance),
      explosive: percentagize(ship.explosiveDamageResonance)
    };

    delete ship.shieldEmDamageResonance;
    delete ship.shieldThermalDamageResonance;
    delete ship.shieldKineticDamageResonance;
    delete ship.shieldExplosiveDamageResonance;

    delete ship.armorEmDamageResonance;
    delete ship.armorThermalDamageResonance;
    delete ship.armorKineticDamageResonance;
    delete ship.armorExplosiveDamageResonance;

    delete ship.emDamageResonance;
    delete ship.thermalDamageResonance;
    delete ship.kineticDamageResonance;
    delete ship.explosiveDamageResonance;
    
    // Figure out meta level's and mark special ships (rare limited edition ships)
    if (ship.metaLevel === 9) ship.special = true;
    if (ship.metaLevel === 5) ship.metaLevel = 'Tech II';
    else if (ship.metaLevel > 5) ship.metaLevel = 'Faction';
    else if (ship.metaLevel) ship.metaLevel = 'Tech I';

    // Let's compress this into one object for easier access and lets unify the attribute naming
    // Afterwards delete original attributes
    ship.sensorStrength = {};
    if (ship['scanGravimetricStrength'] > 0) {
      ship.sensorStrength.value = ship['scanGravimetricStrength'];
      ship.sensorStrength.label = 'Gravimetric';
    }
    else if (ship['scanLadarStrength'] > 0) {
      ship.sensorStrength.value = ship['scanLadarStrength'];
      ship.sensorStrength.label = 'Ladar';
    }
    else if (ship['scanMagnetometricStrength'] > 0) {
      ship.sensorStrength.value = ship['scanMagnetometricStrength'];
      ship.sensorStrength.label = 'Magnetometric';
    }
    else if (ship['scanRadarStrength'] > 0) {
      ship.sensorStrength.value = ship['scanRadarStrength'];
      ship.sensorStrength.label = 'Radar';
    }

    delete ship.scanGravimetricStrength;
    delete ship.scanLadarStrength;
    delete ship.scanMagnetometricStrength;
    delete ship.scanRadarStrength;
    
    // For future, let's delete base market price and add attribute for price updates
    delete ship.basePrice;
    ship.price = 0;
  });
}

export default function (sequelize) {
  let ships;

  const query = 'SELECT * FROM "invTypes" ' +
    'JOIN "invGroups" ON "invTypes"."groupID" = "invGroups"."groupID" ' +
    'JOIN "invCategories" ON "invGroups"."categoryID" = "invCategories"."categoryID" ' +
    'LEFT JOIN "chrRaces" ON "invTypes"."raceID" = "chrRaces"."raceID" ' +
    'WHERE "invCategories"."categoryID"=6 AND "invTypes"."published"=true';

  return sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(shipsData => {
      ships = shipsData;
      logger.action('Grabbed data for ' + ships.length + ' ships');
      return addTraitsToShips(ships, sequelize);
    }).then(() => {
      logger.action('Added traits to each ship');
      return addPropertiesToShips(ships, sequelize);
    }).then(() => {
      logger.action('Added properties to each ship');
      cleanExtraKeysAndReformatProperties(ships);
      return ships;
    });
};
