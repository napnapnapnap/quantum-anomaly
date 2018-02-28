import React, {Component} from 'react';

const homePageLinks = [{
  url:         '/epic-arcs',
  cover:       '/images/eve-logo.png',
  cbackground: 'black',
  label:       'Epic arcs guide',
  content:     'In depth guide for EVE Online epic arcs. Find info about all the related missions, enemies and rewards...'
}, {
  url:         '/incursion-manager',
  cover:       '/images/eve-logo.png',
  cbackground: 'black',
  label:       'Incursion manager',
  content:     'EVE Online current active incursions with system data...'
}, {
  url:         '/warframe-status',
  cover:       '/images/warframe-logo.png',
  cbackground: 'white',
  label:       'WarFrame Status',  
  content:     'Current status of ingame happening in Warframe...'
}];

export default class Home extends Component {
  static homeLinks() {
    return homePageLinks.map((link, index) => (
      <li className="home__link-wrapper" key={index}>
        <a href={link.url} className="home__link">
          <p className={`home__img home__img--${link.cbackground}`}>
            <img src={link.cover} alt={link.url}/>
          </p>
          <p className="home__link-label">{link.label}</p>
          <p className="home__link-content">{link.content}</p>
        </a>
      </li>
    ));
  }

  render() {
    return (
      <article className="home">
        <ul className="home__links">
          {Home.homeLinks()}
        </ul>
      </article>
    );
  }
}
