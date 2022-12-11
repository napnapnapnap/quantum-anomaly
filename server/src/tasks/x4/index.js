import { appLog } from "../../helpers/logger";
import { getDefaults } from "./defaults";
import { getEquipment } from "./equipment";
import { saveToFile } from "./helpers";
import { getMap } from "./map";
import { getModifications } from "./modifications";
import { getShips } from "./ships";
import { getTerraforming } from "./terraforming";
import { getTranslations } from "./translations";
import { getWares } from "./wares";
import { promises as fs } from "fs";
import path from "path";
import xml2js from "xml2js";

/*  NOTE: This task only runs on local machine. Even though path is being used in most places, this is still best ran
          to run on windows machine, which you probably have so that you can run the game as well, right? It expects
          that you provide path to EXTRACTED game files from EgoSoft. At least you need to extract ship data and
          translations. More info about extraction can be found here: https://www.egosoft.com/download/x4/bonus_en.php

For base game:
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in 01.cat -in 02.cat -in 03.cat -in 04.cat -in 05.cat -in 06.cat -in 07.cat -in 08.cat -in 09.cat -out "C:\X4"
pause

For split vendetta
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_split\ext_01.cat -in extensions\ego_dlc_split\ext_02.cat -in extensions\ego_dlc_split\ext_03.cat -out "C:\X4\extensions\ego_dlc_split"
pause

For cradle of humanity
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_terran\ext_01.cat -in extensions\ego_dlc_terran\ext_02.cat -in extensions\ego_dlc_terran\ext_03.cat -out "C:\X4\extensions\ego_dlc_terran"
pause

For tides of avarice
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_pirate\ext_01.cat -in extensions\ego_dlc_pirate\ext_02.cat -in extensions\ego_dlc_pirate\ext_03.cat -out "C:\X4\extensions\ego_dlc_pirate"
pause

For now you can just copy paste manually files from split dlc into main unpackaged folder

Cleanup for size:
cd "C:\X4"
del /S *.xsd
del /S *.xsm
del /S *.xac
del /S *.xpm
del /S *.ANI
del /S *.xmf
del /S *.gz
del /S *.ogg
del /S *.dds
del /S *.bgp
del /S *.dtd
del /S *.amw
del /S *.bgf
del /S *.bsg
del /S *.dae
del /S *.xpl
del /S *.lua
del /S *.jpg
del /S *.psb
del /S *.wav
del /S *.pk
del /S *.h
del /S *.f
del /S *.v
del /S *.comp
del /S *.fh
del /S *.vh
del /S *.tcs
del /S *.tes
del /S *.ogl
robocopy C:\X4 C:\X4 /S /move
 */

const sourceBasePath = "C:\\X4";
const sourcify = (arg) => path.join(sourceBasePath, `${arg}.xml`);

// type [macros/components]
async function composeIndexTree(type, dlc = null) {
  let sourceIndexBasePath = sourceBasePath;
  if (dlc === "split")
    sourceIndexBasePath = path.join(
      sourceIndexBasePath,
      "extensions",
      "ego_dlc_split"
    );
  if (dlc === "terran")
    sourceIndexBasePath = path.join(
      sourceIndexBasePath,
      "extensions",
      "ego_dlc_terran"
    );
  if (dlc === "pirate")
    sourceIndexBasePath = path.join(
      sourceIndexBasePath,
      "extensions",
      "ego_dlc_pirate"
    );
  sourceIndexBasePath = path.join(sourceIndexBasePath, "index");

  let sourceFilePath;
  if (type === "macros")
    sourceFilePath = path.join(sourceIndexBasePath, "macros.xml");
  else if (type === "components")
    sourceFilePath = path.join(sourceIndexBasePath, "components.xml");

  const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  let parsedIndex = await parser.parseStringPromise(
    await fs.readFile(sourceFilePath)
  );

  let index = {};
  parsedIndex.index.entry.forEach((entry) => {
    index[entry.name] = entry.value;
  });

  return index;
}

async function start() {
  const translations = await getTranslations(sourceBasePath);
  await saveToFile(translations, "_translations", "translations");

  const wares = await getWares(sourceBasePath);
  await saveToFile(wares, "_wares", "wares");

  const terraform = await getTerraforming(
    sourceBasePath,
    translations,
    wares.wares
  );
  await saveToFile(terraform, "_terraform", "terraform");

  const mapInformation = await getMap(sourceBasePath, translations);
  await saveToFile(mapInformation, "_map", "map");

  const modifications = await getModifications(
    sourceBasePath,
    wares,
    translations
  );
  await saveToFile(modifications, "_modifications", "modifications");

  let macrosIndex = await composeIndexTree("macros");
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree("macros", "split")),
  };
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree("macros", "terran")),
  };
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree("macros", "pirate")),
  };
  await saveToFile(macrosIndex, "_macros-index", "macro index");

  let componentsIndex = await composeIndexTree("components");
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree("components", "split")),
  };
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree("components", "terran")),
  };
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree("components", "pirate")),
  };
  await saveToFile(componentsIndex, "_components-index", "components index");

  let shipPaths = [];
  const fileLists = {
    engine: [],
    thruster: [],
    shield: [],
    shipstorage: [],
    storage: [],
    weapon: [],
    turret: [],
    bullet: [],
  };

  Object.keys(macrosIndex).forEach((key) => {
    if (key.indexOf("_test_") !== -1 || key.indexOf("legacy") !== -1) return;
    if (key.indexOf("ship_") === 0 && key.indexOf("xs") === -1)
      shipPaths.push(sourcify(macrosIndex[key]));

    if (key.indexOf("engine_") === 0 && key.indexOf("xs") === -1)
      fileLists.engine.push(sourcify(macrosIndex[key]));
    if (key.indexOf("thruster_") === 0 && key.indexOf("xs") === -1)
      fileLists.thruster.push(sourcify(macrosIndex[key]));
    if (key.indexOf("shield_") === 0 && key.indexOf("xs") === -1)
      fileLists.shield.push(sourcify(macrosIndex[key]));
    if (key.indexOf("shipstorage_") === 0 && key.indexOf("xs") === -1)
      fileLists.shipstorage.push(sourcify(macrosIndex[key]));
    if (key.indexOf("storage_") === 0 && key.indexOf("xs") === -1)
      fileLists.storage.push(sourcify(macrosIndex[key]));
    if (key.indexOf("weapon_") === 0 && key.indexOf("xs") === -1)
      fileLists.weapon.push(sourcify(macrosIndex[key]));
    if (key.indexOf("turret_") === 0 && key.indexOf("xs") === -1)
      fileLists.turret.push(sourcify(macrosIndex[key]));
    if (key.indexOf("bullet_") === 0 && key.indexOf("xs") === -1)
      fileLists.bullet.push(sourcify(macrosIndex[key]));
  });

  shipPaths.sort();
  shipPaths = [...new Set(shipPaths)];
  Object.keys(fileLists).forEach(
    (key) => (fileLists[key] = [...new Set(fileLists[key].sort())])
  );

  const equipment = await getEquipment(fileLists, translations);
  await saveToFile(
    {
      extralarge: equipment.extralarge,
      large: equipment.large,
      medium: equipment.medium,
      small: equipment.small,
    },
    "_equipment",
    "equipment"
  );

  const defaults = await getDefaults(sourceBasePath);
  await saveToFile(defaults, "_defaults", "defaults");

  // [TODO]: Optimize ship processing
  const ships = await getShips(
    shipPaths,
    translations,
    defaults,
    equipment,
    wares
  );
  await saveToFile(ships, "_ships", "ships");

  const totalNumberOfShips = Object.keys(ships).length;
  appLog(`Finished generating ${totalNumberOfShips} ships`, "green");
}

start();
