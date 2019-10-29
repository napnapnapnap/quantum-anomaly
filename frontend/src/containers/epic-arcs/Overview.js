import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Overview extends Component {
  static renderFaction(faction) {
    return (
      <Link to={`/epic-arcs/${faction.race}`} key={faction.race} className="epic-arcs__list-item">
        <header className="epic-arcs__header">
          <div className="epic-arcs__header-logo">
            <img src={`https://images.evetech.net/corporations/${faction.iconID}/logo`} alt="faction"/>
          </div>
          <div className="epic-arcs__header-text">
            <h2 className="epic-arcs__header-title">{faction.name}</h2>
            <p>{faction.empire} Epic Arc</p>
          </div>
        </header>
        <h5>General description</h5>
        <ul>
          {faction.description.map((description, index) => <li key={index}>{description}</li>)}
        </ul>
        <h5>Rewards</h5>
        <ul>
          {faction.rewards.map((reward, index) => <li key={index}>{reward}</li>)}
        </ul>
      </Link>
    );
  }

  render() {
    const {info} = this.props;
    return (
      <div className="epic-arcs__list">
        {Object.keys(info).map(faction => Overview.renderFaction(info[faction]))}
      </div>
    );
  }
}

/*
        <Link to={'/epic-arcs/general'} className="epic-arcs__list-item">
          <header className="epic-arcs__header">
            <div className="epic-arcs__header-logo">
              <img src={`https://image.eveonline.com/Corporation/98217943_128.png`} alt="faction"/>
            </div>
            <div className="epic-arcs__header-text">
              <h2 className="epic-arcs__header-title">General guidelines and overview</h2>
              <p>Quantum Anomaly Corporation</p>
            </div>
          </header>
        </Link>
 */
