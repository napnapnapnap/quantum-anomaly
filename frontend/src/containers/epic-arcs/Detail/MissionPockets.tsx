import { EveEpicArcInfo } from '../../../redux/eve/epic-arcs';
import { EveNpcs } from '../../../redux/eve/npcs';
import { getInfoByNames } from '../epic-arc-helpers';

const EpicArcsDetailMissionPockets = ({
  epicArc,
  eveNpcs,
  activeMissionIndex,
}: {
  epicArc: EveEpicArcInfo;
  eveNpcs: EveNpcs;
  activeMissionIndex: number;
}) => {
  const renderEffect = (id: number, title: string) => (
    <img className="enemies__effect" src={`https://image.eveonline.com/Type/${id}_32.png`} title={title} alt={title} />
  );

  const pockets = epicArc.missions ? epicArc.missions[activeMissionIndex].pockets : [];
  const hasPockets = !!pockets;

  return (
    <div className="mission">
      {hasPockets &&
        pockets.map((pocket, index) => (
          <div className="pocket" key={index}>
            <h5>
              {index === 0 && pockets.length === 1 && 'Single pocket'}
              {index === 0 && pockets.length !== 1 && 'Initial pocket'}
              {index !== 0 && `Pocket ${index}`}
            </h5>
            {pocket.map((wave, index) => (
              <div key={index} className="wave">
                <p className="text--bold">
                  {index === 0 && wave.enemies.length === 1 && 'Single wave'}
                  {index === 0 && wave.enemies.length !== 1 && 'Initial wave'}
                  {index !== 0 && `Wave ${index}`} at {wave.range} km
                </p>
                {wave.enemies.map((enemy) => (
                  <div className="enemies" key={Math.random()}>
                    <div className="enemies__quantity">{enemy.quantity}</div>
                    <div className="enemies__ship">
                      <p className="enemies__type">{getInfoByNames(eveNpcs, enemy.names).type}</p>
                      <p className="enemies__names">{enemy.names.join(', ')}</p>
                      {enemy.notice && <p className="enemies__notice">{enemy.notice}</p>}
                    </div>
                    <div className="enemies__effects">
                      {getInfoByNames(eveNpcs, enemy.names).scram && renderEffect(447, 'Warp Scrambler')}
                      {getInfoByNames(eveNpcs, enemy.names).web && renderEffect(526, 'Stasis Webifier')}
                      {getInfoByNames(eveNpcs, enemy.names).trackingDisr && renderEffect(2108, 'Tracking Disruptor')}
                      {getInfoByNames(eveNpcs, enemy.names).energyNeut && renderEffect(12269, 'Energy Neutralizer')}
                      {getInfoByNames(eveNpcs, enemy.names).sensorDamp && renderEffect(1968, 'Sensor Dampener')}
                      {getInfoByNames(eveNpcs, enemy.names).ecm && renderEffect(1957, 'Target Jamming')}
                      {getInfoByNames(eveNpcs, enemy.names).paint && renderEffect(12709, 'Target Painting')}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default EpicArcsDetailMissionPockets;
