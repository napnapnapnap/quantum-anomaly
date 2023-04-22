export default function processStations({ sector, stations, zone }) {
  let sectorOwner = null;

  stations.forEach((station) => {
    if (!station.location.macro) return;
    if (station.assigned) return;

    const isInSector = station.location.macro.toLowerCase() === sector.name.toLowerCase();
    const isInZone = station.location.macro.toLowerCase() === zone.name.toLowerCase();

    if (isInZone || isInSector) {
      let tags = 'station';
      if (station.type === 'tradingstation') tags = 'tradestation';

      if (station.station.select && station.station.select.tags)
        tags = station.station.select.tags.replace(/\[/, '').replace(/]/, '').replace(/]/, '');

      if (!station.position) station.position = { x: 0, z: 0 };
      station.position.x = parseFloat(station.position.x);
      station.position.z = parseFloat(station.position.z);

      if (isInZone) {
        station.position.x += zone.position.x;
        station.position.z += zone.position.z;
      }

      sector.stations.push({
        id: station.id,
        race: station.race,
        owner: station.owner,
        tags: tags,
        position: station.position,
      });

      if (
        station.id.indexOf('shipyard') !== -1 ||
        station.id.indexOf('defence') !== -1 ||
        station.id.indexOf('wharf') !== -1 ||
        station.id.indexOf('equipmentdock') !== -1 ||
        station.id.indexOf('tradestation') !== -1 ||
        station.type === 'tradingstation'
      ) {
        if (station.owner !== 'alliance' && station.owner !== 'ministry') {
          if (station.station.select) sectorOwner = station.station.select.faction;
          else sectorOwner = station.owner;
        }
      }

      station.assigned = true;
    }
  });

  if (!sector.owner) sector.owner = sectorOwner;
  if (sector.name === 'Cluster_108_Sector003_macro') sector.owner = 'terran';
}
