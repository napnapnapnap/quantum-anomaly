import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
import {
  EveEpicArcFactions,
  EveEpicArcInfo,
  getEveEpicArcFactionMissions,
  getEveEpicArcs,
} from '../../../redux/eve/epic-arcs';
import { getEveNpcs } from '../../../redux/eve/npcs';
import { getAllNpcNames } from '../epic-arc-helpers';
import './Detail.scss';
import Missions from './Missions';

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
    <LayoutBase>
      {activeEpicArc ? (
        <>
          <div className="ea-details">
            <header className="ea-details__header">
              <div className="ea-details__logo">
                <img src={`https://images.evetech.net/corporations/${activeEpicArc.iconID}/logo`} alt="faction" />
              </div>
              <div className="ea-details__tagline">
                <h1 className="ea-details__title">{activeEpicArc.name}</h1>
                <br />
                {activeEpicArc && <span>{activeEpicArc.empire} </span>}
                <NavLink to={`/epic-arcs`} className="link text--smaller">
                  back to others
                </NavLink>
              </div>
            </header>
            <Missions activeMissionIndex={activeMissionIndex} activeEpicArc={activeEpicArc} />
          </div>
        </>
      ) : (
        <></>
      )}
    </LayoutBase>
  );
};

export default EpicArc;
