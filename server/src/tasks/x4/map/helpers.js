// WARNING: Mutates object. Since numbers in game are so large, we are going to scale them down a bit
export function scaleDown(item, factor = 1) {
  if (!item.offset) item.offset = { position: { x: 0, y: 0, z: 0 } };
  else if (item.offset && !item.offset.position) item.offset = { position: { x: 0, y: 0, z: 0 } };
  else
    item.offset.position = {
      x: Math.round((parseFloat(item.offset.position.x) / factor) * 1000) / 1000,
      y: Math.round((parseFloat(item.offset.position.y) / factor) * 1000) / 1000,
      z: Math.round((parseFloat(item.offset.position.z) / factor) * 1000) / 1000,
    };
}

export const isPotentialKhaakLocation = (sector) => {
  const khaakLocations = [
    'Cluster_06_Sector002_macro',
    'Cluster_16_Sector001_macro',
    'Cluster_20_Sector001_macro',
    'Cluster_28_Sector001_macro',
    'Cluster_31_Sector001_macro',
    'Cluster_37_Sector001_macro',
    'Cluster_45_Sector001_macro',
    'Cluster_419_Sector001_macro',
  ];

  return khaakLocations.includes(sector.name);
};

export function roundMap(arg) {
  return Math.round(arg * 1000) / 1000;
}

export function addDlcToSet(dlcSet, arg) {
  if (parseInt(arg) < 100) dlcSet.add('base');
  else if (parseInt(arg) >= 400 && parseInt(arg) < 500) dlcSet.add('splitVendetta');
  else if (parseInt(arg) >= 100 && parseInt(arg) < 200) dlcSet.add('cradleOfHumanity');
  else if (parseInt(arg) >= 500 && parseInt(arg) < 600) dlcSet.add('tidesOfAvarice');
  else if (parseInt(arg) >= 600 && parseInt(arg) < 700) dlcSet.add('kingdomEnd');
}

export function applyCrazySectorTransformations(cluster) {
  // since we are dealing with hexagons, there are few positions sector can take
  /*
           -----------               -----------
         /             \           /          6  \
        /  1         2  \         /               \
       /                 \       / 5               \
       \                 /       \                 /
        \  4         3  /         \               /
         \             /           \          7  /
          ------------              ------------
       For 2 sectors in cluster, we need to compare their relative positions
       The first sector will always be 0,0,0, we need to compare that to the next sector and then decide
       based on that, in which spot we will put the first and the second one
       For 3 sectors in cluster, we can use pretty much same approach, but they are arranged slightly different

       We can also add the base cluster position in galaxy to be able to draw it on same galaxy layer without
       having to nest it into clusters loop

       For one sector, just make the sectors position same as cluster...
       For two sectors, figure out relative positions of second to first, yes, this is messy shotgun development,
       but... For three sectors, there is only one instance of these in game, so, hardcode it...
   */

  if (cluster.sectors.length === 1) cluster.sectors[0].adjusted = cluster.position;
  else if (cluster.sectors.length === 2) {
    cluster.sectors[0].adjusted = { ...cluster.position };
    cluster.sectors[1].adjusted = { ...cluster.position };
    // It is very very tempting to group these, but due to all the factors it gets really tricky
    // Better leave as this, it is ugly, but it has cascading if else effect and it's actually very safe way
    // of checking things
    if (
      cluster.sectors[0].position.x === 0 &&
      cluster.sectors[0].position.z === 0 &&
      cluster.sectors[1].position.x === 0 &&
      cluster.sectors[1].position.z > 0
    ) {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 31, z: cluster.position.z - 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 31, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = 'A';
      cluster.sectors[1].transformation = 'A';
    } else if (
      cluster.sectors[0].position.x === 0 &&
      cluster.sectors[0].position.z === 0 &&
      cluster.sectors[1].position.x === 0 &&
      cluster.sectors[1].position.z < -2000
    ) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 31, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 31, z: cluster.position.z - 54 };
      cluster.sectors[0].transformation = 'B';
      cluster.sectors[1].transformation = 'B';
    } else if (
      cluster.sectors[0].position.x === 0 &&
      cluster.sectors[0].position.z === 0 &&
      cluster.sectors[1].position.x === 0 &&
      cluster.sectors[1].position.z < 0
    ) {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 31, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 31, z: cluster.position.z - 54 };
      cluster.sectors[0].transformation = 'C';
      cluster.sectors[1].transformation = 'C';
    } else if (cluster.sectors[1].position.x < 0) {
      cluster.sectors[0].adjusted.x = cluster.position.x + 31;
      cluster.sectors[1].adjusted.x = cluster.position.x - 31;
      if (cluster.sectors[1].position.z < 0) {
        cluster.sectors[0].adjusted.z = cluster.position.z + 54;
        cluster.sectors[1].adjusted.z = cluster.position.z - 54;
        cluster.sectors[0].transformation = 'D';
        cluster.sectors[1].transformation = 'D';
      } else if (cluster.sectors[1].position.z > 0) {
        cluster.sectors[0].adjusted.z = cluster.position.z - 54;
        cluster.sectors[1].adjusted.z = cluster.position.z + 54;
        cluster.sectors[0].transformation = 'E';
        cluster.sectors[1].transformation = 'E';
      }
    } else if (cluster.sectors[1].position.x > 0 && cluster.sectors[1].position.z > 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 31, z: cluster.position.z - 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 31, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = 'F';
      cluster.sectors[1].transformation = 'F';
    } else if (cluster.sectors[1].position.x > 0 && cluster.sectors[1].position.z < 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 31, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 31, z: cluster.position.z - 54 };
      cluster.sectors[0].transformation = 'G';
      cluster.sectors[1].transformation = 'G';
    } else if (cluster.sectors[1].position.z === 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 31, z: cluster.position.z - 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 31, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = 'H';
      cluster.sectors[1].transformation = 'H';
      // special flake
      if (cluster.name === 'Cluster_42_macro') {
        cluster.sectors[0].adjusted = { x: cluster.position.x - 31, z: cluster.position.z + 54 };
        cluster.sectors[1].adjusted = { x: cluster.position.x + 31, z: cluster.position.z - 54 };
        cluster.sectors[0].transformation = 'I';
        cluster.sectors[1].transformation = 'I';
      }
    }
  } else if (cluster.sectors.length === 3) {
    cluster.sectors[0].adjusted = cluster.position;
    cluster.sectors[1].adjusted = cluster.position;
    cluster.sectors[2].adjusted = cluster.position;
    // special flake
    if (cluster.name === 'Cluster_01_macro') {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 31, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x + 31, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 62, z: cluster.position.z };
      cluster.sectors[0].transformation = 'S';
      cluster.sectors[1].transformation = 'S';
      cluster.sectors[2].transformation = 'S';
    }

    // special flake2
    else if (cluster.name === 'Cluster_108_macro') {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 62, z: cluster.position.z };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 31, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x - 31, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = 'T';
      cluster.sectors[1].transformation = 'T';
      cluster.sectors[2].transformation = 'T';
    }

    // special flake3
    else if (cluster.name === 'Cluster_500_macro') {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 31, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 31, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x - 62, z: cluster.position.z };
      cluster.sectors[0].transformation = 'AV';
      cluster.sectors[1].transformation = 'AV';
      cluster.sectors[2].transformation = 'AV';
    }

    // special flake4
    else if (cluster.name === 'Cluster_606_macro') {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 31, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 31, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x + 62, z: cluster.position.z };
      cluster.sectors[0].transformation = 'KE';
      cluster.sectors[1].transformation = 'KE';
      cluster.sectors[2].transformation = 'KE';
    }
  }

  cluster.sectors.forEach((sector) =>
    sector.zones.forEach((zone) => {
      const inSectorDivider = !sector.transformation ? 3100 : 6000;
      zone.position = {
        x: sector.adjusted.x + zone.position.x / inSectorDivider,
        z: sector.adjusted.z + zone.position.z / inSectorDivider,
      };

      zone.gates.forEach((gate) => {
        gate.position = {
          x: zone.position.x + gate.position.x / inSectorDivider,
          z: zone.position.z + gate.position.z / inSectorDivider,
        };
      });
    })
  );

  cluster.sectors.forEach((sector) =>
    sector.stations.forEach((station) => {
      const inSectorDivider = !sector.transformation ? 3100 : 6000;
      if (!station.position) station.position = { x: 0, z: 0 };

      if (station.isInZone)
        station.position = {
          x: sector.adjusted.x + station.zonePositionOffset.x / inSectorDivider + station.position.x / inSectorDivider,
          z: sector.adjusted.z + station.zonePositionOffset.z / inSectorDivider + station.position.z / inSectorDivider,
        };
      else
        station.position = {
          x: sector.adjusted.x + station.position.x / inSectorDivider,
          z: sector.adjusted.z + station.position.z / inSectorDivider,
        };

      station.position = {
        x: Math.round(station.position.x * 1000) / 1000,
        z: Math.round(station.position.z * 1000) / 1000,
      };

      // since some of these things are literally on top of each other, do some "adjustment"
      if (station.id === 'shipyard_holyorder') station.position.x -= 20;
      else if (station.id === 'shipyard_antigone' || station.id === 'tradestation_antigone') station.position.z -= 10;
      else if (
        station.id === 'wharf_xenon_cluster_424' ||
        station.id === 'shipyard_xenon_cluster_112' ||
        station.id === 'shipyard_paranid' ||
        station.id === 'wharf_freesplit_01' ||
        station.id === 'wharf_split_01' ||
        station.id === 'wharf_xenon_cluster_415' ||
        station.id === 'ter_shipyard_cluster_104_sector002' ||
        station.id === 'ter_wharf_cluster_101_sector001'
      ) {
        station.position.x += 20;
        station.position.z += 5;
      } else if (station.id === 'equipmentdock_ministry_01') {
        station.position.x += 20;
        station.position.z -= 10;
      } else if (station.id === 'wharf_teladi_01') {
        station.position.x -= 20;
        station.position.z += 5;
      }
    })
  );

  cluster.sectors.forEach((sector) => {
    sector.position = sector.adjusted;
    delete sector.adjusted;
  });

  return cluster;
}
