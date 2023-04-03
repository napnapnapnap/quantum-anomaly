import React from 'react';

import LayoutBase from '../../layouts/Base';
import './Home.scss';
import home from './home.json';

const Home = () => (
  <LayoutBase title="Quantum Anomaly Gaming Community">
    <article className="home">
      <p>
        Quantum Anomaly is a gaming community originating from playing EVE Online together. In time we started playing
        other games and we use this website as a source of information. We have decided to share some of that
        information publicly with other gamers.
      </p>

      {Object.values(home.items).map((group) => (
        <React.Fragment key={group.label}>
          <h2 className="h4">{group.label}</h2>
          {group.items.map(({ url, cover, label, content }) => (
            <a href={url} className="home__link" key={url}>
              <div className="home__header">
                <img src={cover} alt={url} />
              </div>
              <div className="home__content">
                <h4 className="home__title">{label}</h4>
                <p>{content}</p>
              </div>
            </a>
          ))}
        </React.Fragment>
      ))}
    </article>
  </LayoutBase>
);

export default Home;
