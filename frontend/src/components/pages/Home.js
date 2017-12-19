import React, {Component} from 'react';

export default class Home extends Component {
  render() {
    return (
      <article className="home">
        <ul className="home__links">
          <li className="home__link">
            <a href="/epic-arcs">
              <img className="home__img home__img--black" src="/images/eve-logo.png" alt="warframe"/>
              EVE Online Epic arcs guide
            </a>
          </li>
          <li className="home__link">
            <a href="/incursion-manager">
              <img className="home__img home__img--black" src="/images/eve-logo.png" alt="warframe"/>
              EVE Online Incursion manager
            </a>
          </li>
          <li className="home__link">
            <a href="/warframe-status">
              <img className="home__img" src="/images/warframe-logo.png" alt="warframe"/>
              WarFrame Status
            </a>
          </li>
        </ul>
      </article>
    );
  }
}
