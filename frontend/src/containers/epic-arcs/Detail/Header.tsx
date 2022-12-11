import { NavLink } from 'react-router-dom';

import { EveEpicArcFactions, EveEpicArcInfo } from '../../../redux/eve/epic-arcs';

const EpicArcsDetailHeader = ({
  epicArc,
  faction,
}: {
  epicArc: EveEpicArcInfo | undefined;
  faction: EveEpicArcFactions | undefined;
}) => {
  const factionFallbackName = faction ? `${faction![0].toUpperCase()}${faction!.slice(1)}` : '';

  return (
    <header className="overview__header">
      <div className="overview__logo">
        {epicArc ? (
          <img src={`https://images.evetech.net/corporations/${epicArc.iconID}/logo`} alt="faction" />
        ) : (
          <img src={`https://images.evetech.net/corporations/10264/logo`} alt="faction" />
        )}
      </div>
      <div className="overview__tagline">
        <h1 className="overview__title">{epicArc ? epicArc.name : factionFallbackName}</h1>
        <br />
        {epicArc && <span>{epicArc.empire} </span>}
        <NavLink to={`/epic-arcs/`} className="link--secondary">
          back to others
        </NavLink>
      </div>
    </header>
  );
};

export default EpicArcsDetailHeader;
