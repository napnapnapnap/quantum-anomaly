import {models} from '../models';
import * as esiApiAdapter from '../app/eve-admin-tasks/esi-api-adapter';

const ALLOWED = ['UniverseCategories',
                 'UniverseGroups',
                 'UniverseTypes',
                 'DogmaAttributes',
                 'DogmaEffects',
                 'MarketGroups'];

let currentJob = {
  name:      null,
  startTime: null,
  error:     null
};

function setCurrentJob(error, name) {
  currentJob = {
    name:      name,
    startTime: name === null && error === null ? null : (new Date()).toUTCString(),
    error:     error
  };
}

export function getCurrentJob(req, res) {
  res.json(currentJob);
}

export async function getEsiInformation(req, res) {
  let esiGroups = await Promise.all(
    ALLOWED.map(async type => {
      let info = await models[`Esi${type}`]
        .findAll({
          order: [['updatedAt', 'DESC']]
        });

      return {
        name:                   type,
        numberOfEntries:        info.length,
        numberOfMissingEntries: info.filter(info => info.data === null).length,
        lastUpdate:             info[0].updatedAt
      };
    })
  );
  res.json({
    esiGroups: esiGroups,
    currentJob: currentJob
  });
}

export function fetchEndpoints(req, res) {
  if (currentJob.name !== null) {
    res.json({
      ...currentJob,
      error: 'Already running job'
    });
    return;
  }

  setCurrentJob(null, 'Fetch endpoints');

  esiApiAdapter.fetchEndpoints(ALLOWED)
    .then(() => setCurrentJob(null, null))
    .catch(error => setCurrentJob(error.message, 'Fetch endpoints'));

  res.json(currentJob);
}

export function updateEndpoints(req, res) {
  if (currentJob.name !== null) {
    res.json({
      ...currentJob,
      error: 'Already running job'
    });
    return;
  }

  setCurrentJob(null, 'Updating endpoints');

  esiApiAdapter.updateEndpoints(ALLOWED)
    .then(() => setCurrentJob(null, null))
    .catch(error => setCurrentJob(error.message, 'Update endpoints'));

  res.json(currentJob);
}
