import React from 'react';

import { useAppSelector } from '../../../hooks';
import { EveEpicArcInfo } from '../../../redux/eve/epic-arcs';
import EpicArcsDetailGeneralNote from './GeneralNotes';
import EpicArcsDetailMissionHeader from './MissionHeader';
import EpicArcsDetailMissionPockets from './MissionPockets';
import EpicArcsDetailMissionSelector from './MissionSelector';
import './Missions.scss';

const Missions = ({
  activeMissionIndex,
  activeEpicArc,
}: {
  activeMissionIndex: number | null;
  activeEpicArc: EveEpicArcInfo;
}) => {
  const { eveNpcs } = useAppSelector((state) => state.eveNpcs);

  return (
    <div className="ea-missions">
      <EpicArcsDetailMissionSelector epicArc={activeEpicArc} />
      {activeMissionIndex === null ? (
        <EpicArcsDetailGeneralNote epicArc={activeEpicArc} />
      ) : (
        <div className="ea-missions__content">
          <EpicArcsDetailMissionHeader epicArc={activeEpicArc} activeMissionIndex={activeMissionIndex} />
          <EpicArcsDetailMissionPockets
            epicArc={activeEpicArc}
            eveNpcs={eveNpcs}
            activeMissionIndex={activeMissionIndex}
          />
        </div>
      )}
    </div>
  );
};

export default Missions;
