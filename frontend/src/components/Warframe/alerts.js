import React, {Component} from 'react';

const renderReward = (rewards) => (
  <ul>
    {rewards.map((reward, index) => (
      <li className="warframe__reward" key={index}>{reward}</li>
    ))}
  </ul>
);

const renderAlert = ({location, start, end, faction, level, type, rewards, future}, index) => (
  <section className="warframe__alert" key={index}>
    <h3 className="warframe__header">Alert on {location}</h3>
    <p className="warframe__small">
      <span className="bold">{type}</span> against {faction} (lvl. {level})
    </p>
    <p className="warframe__small">
      {future ? 'Starts in' : 'Started'} {start} {future ? '' : 'ago'}, ends
      in <span className="bold">{end}</span>
    </p>
    {renderReward(rewards)}
  </section>
);

export default class Alerts extends Component {
  render() {
    return (
      <section className="warframe__alerts warframe__seperator">
        {this.props.alerts.map(renderAlert)}
      </section>
    );
  }
}
