import * as logger from '../../helpers/logger';
import incursionTypes from './static-assets/incursion-types';

function addSystemsToConstellations(mapData, sequelize) {
  const query = 'SELECT "solarSystemID", "solarSystemName", "radius", "security", "constellationID" ' +
    'FROM "mapSolarSystems" ';

  let promiseArray = [];

  mapData.forEach(constellation => {
    promiseArray.push(
      sequelize.query(query + ' WHERE "constellationID"=' + constellation.constellationID, {type: sequelize.QueryTypes.SELECT})
        .then(systems => {
          systems.forEach(system => {
            system.radius        = (system.radius / 149597870700).toFixed(1);
            system.security      = system.security.toFixed(1);
            system.hasRepairs    = false;
            system.stations      = [];
            system.incursionType = incursionTypes(system.solarSystemID) || 'N/A';
          });
          constellation.systems = systems;
          return constellation;
        })
    );
  });

  return Promise.all(promiseArray);
}

// take this as granted, this is list of ID with repairs
function hasRepairs(operationID) {
  let operationIDWithRepairs = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 32, 33, 37,
    38, 39, 40, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55];
  return operationIDWithRepairs.indexOf(operationID) !== -1;
}

function getConstellationById(mapData, id) {
  let constellationFound = null;
  mapData.forEach(constellation => {
    if (id === constellation.constellationID) {
      constellationFound = constellation;
    }
  });
  return constellationFound;
}

function getSystemInConstellationById(constellation, id) {
  let systemFound = null;
  constellation.systems.forEach(system => {
    if (id === system.solarSystemID) {
      systemFound = system;
    }
  });
  return systemFound;
}

function addStationsToSystems(mapData, sequelize) {
  const query = 'SELECT * FROM "staStations";';

  return sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(stations => {
      stations.forEach(station => {
        let constellation = getConstellationById(mapData, station.constellationID);
        if (!constellation) return;
        let system = getSystemInConstellationById(constellation, station.solarSystemID);
        if (!system) return;
        system.stations.push({
          stationID:   station.stationID,
          stationName: station.stationName,
          operationID: station.operationID,
          hasRepairs:  hasRepairs(station.operationID)
        });
      });
      return mapData;
    });
}

export default function (sequelize) {
  const query = 'SELECT "mapConstellations"."constellationID", "mapConstellations"."constellationName", ' +
    '"chrFactions"."factionName", "chrFactions"."factionID" ' +
    'FROM "mapConstellations" ' +
    'JOIN "chrFactions" ON "mapConstellations"."factionID" = "chrFactions"."factionID";';

  return sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(mapData => {
      logger.action(`Grabbed data for ${mapData.length} constellations`);
      return addSystemsToConstellations(mapData, sequelize);
    }).then(mapData => {
      logger.action('Added systems to constellations');
      return addStationsToSystems(mapData, sequelize);
    }).then(mapData => {
      logger.action('Added stations to systems');
      return mapData;
    });
};
