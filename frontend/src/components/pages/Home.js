import React, {Component} from 'react';

const homePageLinks = [
  {
    url:         '/epic-arcs',
    cover:       '/images/eve-logo.png',
    cbackground: 'black',
    label:       'Epic arcs guide'
  }, {
    url:         '/incursion-manager',
    cover:       '/images/eve-logo.png',
    cbackground: 'black',
    label:       'Incursion manager'
  }, {
    url:   '/warframe-status',
    cover: '/images/warframe-logo.png',
    label: 'WF Status'
  }
];

export default class Home extends Component {
  static homeLinks() {
    return homePageLinks.map(link => (
      <li className="home__link-wrapper">
        <a href={link.url} className="home__link">
          <span className={link.cbackground ? `home__img home__img--${link.cbackground}` : `home__img`}>
            <img src={link.cover} alt={link.url}/>
          </span>
          <span className="home__link-label">{link.label}</span>
        </a>
      </li>
    ));
  }

  render() {
    return (
      <article className="home">
        <h3>Highlighted resources</h3>
        <ul className="home__links">
          {Home.homeLinks()}
        </ul>
      </article>
    );
  }
}
