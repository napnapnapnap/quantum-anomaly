import axios from 'axios';

import { wait } from '../../helpers';
import * as logger from '../../helpers/logger';

const HEADER = process.env.USER_AGENT_CACHE;
const BASE_URL = 'https://esi.evetech.net/latest/universe/categories';
const APPENDIX = '?datasource=tranquility&language=en-us';
const THROTTLE_MS = 30;

function requestIds(currentPage, ids = []) {
  const url = `${BASE_URL}/${APPENDIX}&page=${currentPage}`;
  logger.action(url);

  return axios
    .get(url, HEADER)
    .then((response) => {
      ids = ids.concat(response.data);

      return currentPage < parseInt(response.headers['x-pages'], 10) ? requestIds(currentPage + 1, ids) : ids;
    })
    .catch(function (error) {
      logger.error(`URL: ${BASE_URL}&page=${currentPage}, ${error}`);
    });
}

async function requestItem(id, index, isRetry = false) {
  await wait(index * THROTTLE_MS);
  const url = `${BASE_URL}/${id}/${APPENDIX}`;
  if (isRetry) logger.action(`Retrying ${url}`);

  return axios
    .get(url, HEADER)
    .then((response) => {
      if (response.data) return response.data;
      else return { category_id: id, name: 'unknown' };
    })
    .catch(function (error) {
      logger.error(`URL: ${url} ${error.message}`);
      return { category_id: id, name: 'unknown' };
    });
}

export async function scrapCategories() {
  logger.action(`Getting all ID's  of categories`);
  const ids = [].concat(await requestIds(1));
  logger.action(`Found ${ids.length} categories`);

  let items = await Promise.all(ids.map(async (id, index) => await requestItem(id, index)));

  items = await Promise.all(
    items.map(async (item) => {
      if (item.name === 'unknown') return await requestItem(item.category_id, 0, true);
      else return item;
    })
  );

  items = await Promise.all(
    items.map(async (item) => {
      if (item.name === 'unknown') return await requestItem(item.category_id, 0, true);
      else return item;
    })
  );

  logger.action(`Fetched ${items.length} categories definitions`);
  items = items.filter((item) => item.published !== false);
  logger.action(`Filtered ${items.length} useful categories definitions`);

  return items;
}
