import React, {Component} from 'react';

const renderCetus = (cetus) => (
  <section className="warframe__cetus warframe__seperator">
    <h3 className="warframe__header">Cetus information</h3>
    <p className="warframe__small">
      Currently it is <span className="bold">{cetus.status}</span> for another <span className="bold">{cetus.remainingMinutes}</span>
    </p>
    <p className="warframe__small">
      Ostrons bounties will refresh in {cetus.bountyRefresh}
    </p>
  </section>
);

export default class Cetus extends Component {
  render() {
    return renderCetus(this.props.cetus);
  }
}
