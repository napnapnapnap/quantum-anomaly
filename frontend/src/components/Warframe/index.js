import React, {Component} from 'react';
import LoadingScreen from '../pages/LoadingScreen';

export default class WarframeStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {}
    };
  };

  componentWillMount() {
    fetch('api/get-warframe-status')
      .then(response => response.json())
      .then(response => {
        this.setState({
          status: response
        });
      });
  }

  static alerts(alerts) {
    return alerts.map(alert => {
      return (
        <section>
          <div>Starts: {alert.start}</div>
          <div>Ends: {alert.end}</div>
          <div>Level: {alert.level}</div>
          <div>Faction: {alert.faction}</div>
          {alert.rewards.map(reward => {
            return (
              <div>{reward}</div>
            );
          })}
          <br/>
          <br/>
        </section>
      );
    });
  }

  render() {
    if (Object.keys(this.state.status).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <article className="overview-arcs">
          <h2>Alerts</h2>
          {WarframeStatus.alerts(this.state.status.alerts)}
        </article>
      );
    }
  }
}
