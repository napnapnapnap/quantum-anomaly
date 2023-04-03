import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';

import terraform from '../../../static-files/x4-manual-input/_terraforming.json';
import { translateRecursive } from './translations';

export async function getTerraforming(resourcesPath, translations, wares) {
  let parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  const pathToFile = path.join(resourcesPath, 'libraries', 'terraforming.xml');
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));

  parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  const pathToSplitTerraform = path.join(resourcesPath, 'extensions', 'ego_dlc_split', 'libraries', 'terraforming.xml');
  const pathToTerranTerraform = path.join(
    resourcesPath,
    'extensions',
    'ego_dlc_terran',
    'libraries',
    'terraforming.xml'
  );
  const splitParsed = await parser.parseStringPromise(await fs.readFile(pathToSplitTerraform));
  const terranParsed = await parser.parseStringPromise(await fs.readFile(pathToTerranTerraform));

  if (splitParsed.diff.add.sel === '/terraforming/projects')
    parsed.terraforming.projects.project = parsed.terraforming.projects.project.concat(splitParsed.diff.add.project);

  if (terranParsed.diff.add.sel === '/terraforming/projects')
    parsed.terraforming.projects.project = parsed.terraforming.projects.project.concat(terranParsed.diff.add.project);

  const result = {
    stats: parsed.terraforming.stats.stat,
    projectgroups: parsed.terraforming.projectgroups.projectgroup,
    projects: parsed.terraforming.projects.project,
  };

  result.stats = result.stats.map((stat) => {
    stat.name = translateRecursive(stat.name, translations);
    stat.inactivetext = translateRecursive(stat.inactivetext, translations);

    if (stat.range && !Array.isArray(stat.range)) stat.range = [stat.range];
    if (stat.range)
      stat.range = stat.range.map((item) => {
        item.description = translateRecursive(item.description, translations);
        return item;
      });

    return stat;
  });

  result.projectgroups = result.projectgroups.map((projectgroup) => {
    projectgroup.name = translateRecursive(projectgroup.name, translations);
    return projectgroup;
  });

  result.projects = result.projects.map((project) => {
    project.name = translateRecursive(project.name, translations);
    project.description = translateRecursive(project.description, translations);

    if (project.resources) {
      project.resources.price = parseFloat(project.resources.price);
      if (project.resources.ware && !Array.isArray(project.resources.ware)) {
        project.resources.wares = [project.resources.ware];
      } else if (project.resources.ware) {
        project.resources.wares = project.resources.ware;
      }
      if (project.resources.wares) project.resources.wares.forEach((ware) => (ware.amount = parseFloat(ware.amount)));
      delete project.resources.ware;
    }

    if (project.effects) {
      if (project.effects.effect && !Array.isArray(project.effects.effect)) {
        project.effects = [project.effects.effect];
      } else if (project.effects) {
        project.effects = project.effects.effect;
      }
    }

    if (project.rebates && project.rebates.rebate) {
      if (!Array.isArray(project.rebates.rebate)) project.rebates.rebate = [project.rebates.rebate];
      project.rebates = project.rebates.rebate;
    }

    // Calculate actual quantities needed, fill each ware amount until you reach price, use max price per ware
    if (project.name !== 'Fund Start-Up' && project.group !== 'events' && project.group !== 'xenon') {
      let price = project.resources.price;
      while (price > 0) {
        project.resources.wares.forEach((ware) => {
          if (!ware.quantity) ware.quantity = 0;
          ware.group = wares.ware[ware.ware].group;
          ware.pricePerUnit = parseFloat(wares.ware[ware.ware].price.max);
          ware.volume = parseFloat(wares.ware[ware.ware].volume);
          price -= wares.ware[ware.ware].price.max * ware.amount;
          if (price <= 0) return;
          ware.quantity += ware.amount;
          ware.totalCost = wares.ware[ware.ware].price.max * ware.quantity;
        });
      }
    } else if (project.name === 'Fund Start-Up') {
      project.resources.wares = [
        {
          ware: 'Credits',
          amount: 1,
          quantity: '0.1% of your account',
        },
      ];
    }

    return project;
  });

  const projects = result.projects;
  result.projects = {};
  projects.forEach((project) => {
    result.projects[project.id] = project;
  });

  result.planets = terraform.planets;
  return result;
}
