import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
import { getEveEpicArcs } from '../../../redux/eve/epic-arcs';
import './Overview.scss';
import initialSeo from './initialSeo.json';

const Overview = () => {
  const dispatch = useAppDispatch();
  const { eveEpicArcs } = useAppSelector((state) => state.eveEpicArcs);

  useEffect(() => {
    seo(initialSeo);
    if (Object.keys(eveEpicArcs).length === 0) dispatch(getEveEpicArcs());
  }, [dispatch, eveEpicArcs]);

  return (
    <LayoutBase title="Eve Online: Epic Arcs Guide">
      <div className="ea-overview text--long">
        {Object.values(eveEpicArcs).map((eveEpicArc) => (
          <Link to={`/epic-arcs/${eveEpicArc.race}`} key={eveEpicArc.empire} className="ea-overview__item">
            <header className="ea-overview__header">
              <div className="ea-overview__logo">
                <img src={`https://images.evetech.net/corporations/${eveEpicArc.iconID}/logo`} alt="faction" />
              </div>
              <div className="ea-overview__tagline">
                <h4 className="ea-overview__title">{eveEpicArc.name}</h4>
                <p>{eveEpicArc.empire}</p>
              </div>
            </header>

            <p className="text--bold">What to expect:</p>
            <ul className="ul--packed">
              {eveEpicArc.desc.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <p className="text--bold">Rewards:</p>
            <ul className="ul--packed">
              {eveEpicArc.rewards.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </LayoutBase>
  );
};

export default Overview;
