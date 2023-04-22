import { appWarning } from '../../../helpers/logger';
import { scaleDown } from './helpers';

export default function processZone({ sectorConnection, zone, components }) {
  zone.position = sectorConnection.offset.position;
  zone.gates = [];
  zone.SHCons = [];
  zone.highwayConnections = [];

  if (zone.connections && typeof zone.connections !== 'string') {
    if (!Array.isArray(zone.connections.connection)) zone.connections.connection = [zone.connections.connection];

    zone.connections.connection.forEach((zoneConnection) => {
      if (zoneConnection.ref === 'gates') {
        // WARNING: Mutates object
        scaleDown(zoneConnection);

        zoneConnection.assigned = true;
        zone.gates.push({
          name: zoneConnection.name,
          position: zoneConnection.offset.position,
        });
      } else if (zoneConnection.ref.indexOf('SHCon') !== -1) {
        components.forEach((component) =>
          component.connections.connection.forEach((componentConnection) => {
            if (zoneConnection.ref.toLowerCase() === componentConnection.name.toLowerCase()) {
              // WARNING: Mutates object
              scaleDown(componentConnection);

              zoneConnection.assigned = true;
              componentConnection.position = componentConnection.offset.position;
              delete componentConnection.offset;
              zone.SHCons.push(componentConnection);
            }
          })
        );
      } else if (zoneConnection.ref.indexOf('_gate') !== -1) {
        components.forEach((component) =>
          component.connections.connection.forEach((componentConnection) => {
            if (zoneConnection.ref.toLowerCase() === componentConnection.name.toLowerCase()) {
              // WARNING: Mutates object
              scaleDown(componentConnection);

              zoneConnection.assigned = true;
              componentConnection.position = componentConnection.offset.position;
              delete componentConnection.offset;
              zone.highwayConnections.push(componentConnection);
            }
          })
        );
      } else if (
        zoneConnection.ref === 'anything' ||
        zoneConnection.ref === 'objects' ||
        zoneConnection.ref === 'asteroids'
      ) {
        zoneConnection.skipped = true;
      }
    });

    // Sanity check zone connections
    zone.connections.connection.forEach((zoneConnection) => {
      if (!zoneConnection.assigned && !zoneConnection.skipped) {
        appWarning(`${zoneConnection.name} connection not handled in zone`);
      }
    });
  }

  // Cleanup zones
  delete zone.class;
  delete zone.component;
  delete zone.connections;

  return zone;
}
