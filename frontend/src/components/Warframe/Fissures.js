import React, {Component} from 'react';

import Time from '../common/Time';

const renderFissures = (fissure) => (
  <section className="warframe__alert" key={fissure.node.value}>
    <h3 className="warframe__header">{fissure.level} fissure on {fissure.node.value}</h3>
    <p className="warframe__small">
      <span className="bold">{fissure.node.type}</span> against {fissure.node.enemy}
    </p>
    <p className="warframe__small">
      {fissure.timeStart.future ? 'Starts in' : 'Started'} <Time time={fissure.timeStart}/> {fissure.timeStart.future ? '' : 'ago'}, ends in <span className="bold"><Time time={fissure.timeEnd}/></span>
    </p>
  </section>
);

export default class Fissures extends Component {
  render() {
    return (
      <section className="warframe__alerts warframe__seperator">
        {this.props.fissures.map(fissure => renderFissures(fissure))}
      </section>
    );
  }
}
