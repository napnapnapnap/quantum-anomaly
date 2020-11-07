import {promises as fs} from 'fs';
import path from 'path';

export async function getShips(req, res) {
  const pathToFile = path.join(__dirname, '..', 'static-files', 'x4', '_ships.json');
  const data = await fs.readFile(pathToFile, 'utf-8');
  const response = {...JSON.parse(data)};
  res.json(response);
}

export async function getEquipment(req, res) {
  const pathToFile = path.join(__dirname, '..', 'static-files', 'x4', '_equipment.json');
  const data = await fs.readFile(pathToFile, 'utf-8');
  const response = {...JSON.parse(data)};
  res.json(response);
}
