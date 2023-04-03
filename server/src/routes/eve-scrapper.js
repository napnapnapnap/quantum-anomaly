import { scrapCategories } from '../app/eve-scrapper/categories';
import * as logger from '../helpers/logger';
import { models } from '../models';

export async function scrapeCategories(req, res) {
  const model = models['EveUniverseCategories'];
  const categories = await scrapCategories();

  const existingCategories = await model.findAll();

  logger.action(`Deleting ${existingCategories.length} rows from EveUniverseCategories`);
  await model.destroy({ truncate: true });

  logger.action(`Adding ${categories.length} rows into EveUniverseCategories`);
  await model.bulkCreate(
    categories.map((category) => ({
      id: category.category_id,
      groups: category.groups,
      name: category.name,
    }))
  );

  res.json(categories);
}
