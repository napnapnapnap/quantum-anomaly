import { NavLink } from 'react-router-dom';

import { friendlyUrl } from '../../../helpers';
import { EveEpicArcInfo } from '../../../redux/eve/epic-arcs';

const missionType: { [key: string]: string } = {
  'Data Analyze and retrieve item': 'Data Analzyer',
  'Relic Analyze and retrieve item': 'Relic Analyzer',
  'Combat and Salvage': 'Salvager',
  'Epic arc choice': 'Branching mission',
};

const EpicArcsDetailMissionSelector = ({ epicArc }: { epicArc: EveEpicArcInfo }) => {
  return (
    <aside className="ea-missions__selector">
      <br />
      <NavLink
        to={`/epic-arcs/${epicArc.race}`}
        className={({ isActive }) => (isActive ? 'link link--active' : 'link')}
      >
        General Notes
      </NavLink>
      <br />
      <br />
      <p className="text--bold">Mission list</p>
      <ul className="ul--links">
        {epicArc.missions &&
          epicArc.missions.map(({ name, type }, index) => (
            <li key={name}>
              <NavLink
                to={`/epic-arcs/${epicArc.race}/${friendlyUrl(name)}`}
                className={({ isActive }) => (isActive ? 'link link--active' : 'link')}
              >
                {index + 1}. {name}
              </NavLink>
              {missionType[type] && (
                <span className="ea-missions__context" title={`Required for ${name}`}>
                  {missionType[type]}
                </span>
              )}
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default EpicArcsDetailMissionSelector;
