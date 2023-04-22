import { error } from '../../../helpers/logger';
import { addDlcToSet, roundMap } from './helpers';


/*
   Go through each zone, find a gate and for each gate mark define object consisting of following:
     {
        ":entranceSide:exitSide: {
            dlc: []
            start: {x, y}
            exit: {x, y}
        }
     }

   If neither combo of entranceSide and exitSide exists, create one just with start defined.
   If either exists, then we are looking at the gate on the other side and we need to fill in the exit
 */
export default function getGateConnections(map) {
  const gateConnections = {};

  map.forEach((cluster) => {
    cluster.sectors.forEach((sector) =>
      sector.zones.forEach((zone) => {
        zone.gates.forEach((gate) => {
          const connectionBetween = gate.name
            .toLowerCase()
            .replace('connection_clustergate', '')
            .replace('601b', '601');

          const entranceSide = connectionBetween.split('to')[0];
          const exitSide = connectionBetween.split('to')[1];

          if (!exitSide) return;

          gate.dlc = new Set();
          addDlcToSet(gate.dlc, entranceSide);
          addDlcToSet(gate.dlc, exitSide);
          gate.dlc = Array.from(gate.dlc);

          gate.position = { x: roundMap(gate.position.x), z: roundMap(gate.position.z) };

          if (!gateConnections[`${entranceSide}${exitSide}`] && !gateConnections[`${exitSide}${entranceSide}`]) {
            gateConnections[`${entranceSide}${exitSide}`] = {
              dlc: gate.dlc,
              start: {
                x: gate.position.x,
                z: gate.position.z,
              },
            };
          } else if (gateConnections[`${exitSide}${entranceSide}`]) {
            gateConnections[`${exitSide}${entranceSide}`].exit = {
              x: gate.position.x,
              z: gate.position.z,
            };
          } else {
            error('Who knows... Check gateConnections');
          }
        });
      })
    );
  });

  const gateConnectionsArray = Object.keys(gateConnections).map((gateConnectionKey) => ({
    ...gateConnections[gateConnectionKey],
    id: gateConnectionKey,
  }));

  return gateConnectionsArray.filter((gateConnection) => gateConnection.exit);
}
