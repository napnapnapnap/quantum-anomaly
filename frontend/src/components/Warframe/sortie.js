import React, {Component} from 'react';

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

const renderSortie = (sortie) => (
  <section className="warframe__sortie warframe__seperator">
    <h3 className="warframe__header">Sortie information</h3>
    <p className="warframe__small">
      {sortie.boss}, {sortie.enemy}
    </p>
    <p className="warframe__small">
      Ends in <span className="bold">{sortie.end}</span>
    </p>
    <article className="warframe__sortie_missions">
      {sortie.missions.map(renderMissions)}
    </article>
  </section>
);

export default class Sortie extends Component {
  render() {
    enemy = this.props.sortie.enemy;
    return renderSortie(this.props.sortie);
  }
}
