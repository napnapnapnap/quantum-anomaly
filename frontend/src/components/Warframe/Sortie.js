import React, {Component} from 'react';

import Time from '../common/Time';

const renderMissions = (mission, index) => (
  <section className="warframe__sortie-mission" key={index}>
    <p className="warframe__small">
      <span className="bold">{mission.type}</span> at {mission.node.value}
    </p>
    <p className="warframe__small">Enemies are lvl. {mission.level}</p>
    <p className="warframe__small bold">{mission.effect}</p>
  </section>
);

const renderSortieInfo = (sortie) => (
  <section className="warframe__sortie">
    <p className="warframe__small">
      {sortie.boss}, against <span className="bold">{sortie.enemy}</span>
    </p>
    <p className="warframe__small">
      Ends in <span className="bold"><Time time={sortie.timeEnd}/></span>
    </p>
    {sortie.missions.map(renderMissions)}
  </section>
);

const renderExpired = () => (
  <p className="warframe__small">
    Previous sortie just expired, new information coming in next few minutes
  </p>
);

const renderSortie = (sortie) => (
  <section className="warframe__column">
    <h3 className="warframe__header">Sortie information</h3>
    {sortie.expired ? renderExpired() : renderSortieInfo(sortie)}
  </section>
);

export default class Sortie extends Component {
  render() {
    return renderSortie(this.props.sortie);
  }
}
