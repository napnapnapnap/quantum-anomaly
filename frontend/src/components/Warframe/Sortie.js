import React, {Component} from 'react';

import Time from '../common/Time';

let enemy;

const renderMissions = (mission, index) => (
  <section className="warframe__sortie-mission" key={index}>
    <h3 className="warframe__header">{index + 1}. {mission.node.value}</h3>
    <p className="warframe__small">
      <span className="bold">{mission.type}</span> against {enemy} (lvl. {mission.level})
    </p>
    <p className="warframe__small">
      <span className="bold">Special effect: </span>{mission.effect}
    </p>
  </section>
);

const renderSortieInfo = (sortie) => (
  <section className="warframe__sortie warframe__seperator">
    <p className="warframe__small">
      {sortie.boss}, {sortie.enemy}
    </p>
    <p className="warframe__small">
      Ends in <span className="bold"><Time time={sortie.timeEnd}/></span>
    </p>
    <article className="warframe__sortie_missions">
      {sortie.missions.map(renderMissions)}
    </article>
  </section>
);

const renderExpired = () => (
  <p className="warframe__small">
    Previous sortie just expired, new information coming in next few minutes
  </p>
);

const renderSortie = (sortie) => (
  <section className="warframe__sortie warframe__seperator">
    <h3 className="warframe__header">Sortie information</h3>
    {sortie.expired ? renderExpired() : renderSortieInfo(sortie)}
  </section>
);

export default class Sortie extends Component {
  render() {
    enemy = this.props.sortie.enemy;
    return renderSortie(this.props.sortie);
  }
}
