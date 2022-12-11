import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutClient from '../../../layouts/Client';
import {
  EveEpicArcFactions,
  EveEpicArcInfo,
  getEveEpicArcFactionMissions,
  getEveEpicArcs,
} from '../../../redux/eve/epic-arcs';
import { getEveNpcs } from '../../../redux/eve/npcs';
import { getAllNpcNames } from '../epic-arc-helpers';
import './Detail.scss';
import EpicArcsDetailGeneralNote from './GeneralNotes';
import EpicArcsDetailHeader from './Header';
import EpicArcsDetailMissionHeader from './MissionHeader';
import EpicArcsDetailMissionPockets from './MissionPockets';
import EpicArcsDetailMissionSelector from './MissionSelector';

const EpicArc = () => {
  const dispatch = useAppDispatch();
  const { eveEpicArcs } = useAppSelector((state) => state.eveEpicArcs);
  const { eveNpcs } = useAppSelector((state) => state.eveNpcs);

  const { faction, mission } = useParams<{ faction: EveEpicArcFactions; mission?: string }>();

  const [activeEpicArc, setActiveEpicArc] = useState<EveEpicArcInfo>();
  const [activeMissionIndex, setActiveMissionIndex] = useState<number | null>(null);

  useEffect(() => {
    const noInformationAtAll = Object.keys(eveEpicArcs).length === 0;
    const arcExists = faction && eveEpicArcs && eveEpicArcs[faction];
    const basicInformationWithNoDetails = arcExists && !eveEpicArcs[faction]?.missions;

    if (noInformationAtAll) dispatch(getEveEpicArcs());
    else if (basicInformationWithNoDetails) dispatch(getEveEpicArcFactionMissions(faction));
    else if (arcExists) {
      const missingNpcs = getAllNpcNames(eveEpicArcs[faction], eveNpcs);
      if (missingNpcs.length > 0) dispatch(getEveNpcs(missingNpcs.join(';')));
      setActiveEpicArc(eveEpicArcs[faction]);
    }
  }, [dispatch, eveNpcs, faction, eveEpicArcs]);

  useEffect(() => {
    if (activeEpicArc && mission) setActiveMissionIndex(activeEpicArc.missionIndex[mission]);
    else setActiveMissionIndex(null);
  }, [activeEpicArc, mission]);

  useEffect(() => {
    let title = 'EVE Online Epic Arcs';
    let metaDescription = 'EVE Online Epic Arcs';
    let keywords: string[] = [];

    if (activeEpicArc) {
      title = `${activeEpicArc.empire} Epic Arc - ${activeEpicArc.name}`;
      metaDescription = `EVE Online ${title} ${activeEpicArc.desc}`;
      keywords.push(activeEpicArc.empire, activeEpicArc.name);
    }
    if (activeEpicArc?.missions && activeMissionIndex) {
      const { name, type, agent, source, start, dest } = activeEpicArc.missions[activeMissionIndex];
      title = `${title} - ${name}`;
      metaDescription = `EVE Online ${title}. ${type} mission given by ${agent} at ${source}. Starts in ${start} and goes to ${dest}`;
      keywords.push(activeEpicArc.empire, activeEpicArc.name, agent, source, start);
    }

    seo({ title, metaDescription, keywords });
  }, [activeEpicArc, activeMissionIndex]);

  return (
    <LayoutClient>
      <>
        <div className="overview overview--arc">
          <EpicArcsDetailHeader epicArc={activeEpicArc} faction={faction} />
        </div>
        {activeEpicArc && (
          <div className="missions">
            {activeEpicArc && <EpicArcsDetailMissionSelector epicArc={activeEpicArc} />}
            {activeMissionIndex === null ? (
              <EpicArcsDetailGeneralNote epicArc={activeEpicArc} />
            ) : (
              <div className="missions__content">
                <EpicArcsDetailMissionHeader epicArc={activeEpicArc} activeMissionIndex={activeMissionIndex} />
                <EpicArcsDetailMissionPockets
                  epicArc={activeEpicArc}
                  eveNpcs={eveNpcs}
                  activeMissionIndex={activeMissionIndex}
                />
              </div>
            )}
          </div>
        )}
      </>
    </LayoutClient>
  );
};

export default EpicArc;
