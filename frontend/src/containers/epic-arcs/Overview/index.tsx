import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutClient from '../../../layouts/Client';
import { getEveEpicArcs } from '../../../redux/eve/epic-arcs';
import './Overview.scss';

const Overview = () => {
  const dispatch = useAppDispatch();
  const { eveEpicArcs } = useAppSelector((state) => state.eveEpicArcs);

  useEffect(() => {
    seo({
      title: 'EVE Online EveEpic Arcs Level 4',
      metaDescription: `Guides for EVE Online EveEpic Arcs: Amarr Empire Right To Rule, Caldari State Penumbra, Gallente Federation Syndication and Minmatar Republic Wildfire. In depth guide for all level 4 eveEpic arc missions. Find all about the related missions, enemies, rewards, what to bring and how to start them...`,
      keywords: [
        'Penumbra',
        'Right To Rule',
        'Syndication',
        'Wildfire',
        'Amarr Empire',
        'Caldari State',
        'Gallente' + ' Federation',
        'Minmatar Republic',
        'EVE Epic Arcs',
      ],
    });

    if (Object.keys(eveEpicArcs).length === 0) dispatch(getEveEpicArcs());
  }, [dispatch, eveEpicArcs]);

  return (
    <LayoutClient>
      <div className="overview">
        <h1>Eve Online: Epic Arcs Guide</h1>
        {Object.values(eveEpicArcs).map((eveEpicArc) => (
          <Link to={`/epic-arcs/${eveEpicArc.race}`} key={eveEpicArc.empire} className="overview__item">
            <header className="overview__header">
              <div className="overview__logo">
                <img src={`https://images.evetech.net/corporations/${eveEpicArc.iconID}/logo`} alt="faction" />
              </div>
              <div className="overview__tagline">
                <h4 className="overview__title">{eveEpicArc.name}</h4>
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
    </LayoutClient>
  );
};

export default Overview;
