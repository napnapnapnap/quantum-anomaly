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
    return alerts.map((alert, index) => {
      return (
        <article className="warframe__alert" key={index}>
          <header className="warframe__header">
            <section className="box">
              <span className="box__label">Start: </span>
              <span className="box__value">{alert.start}</span>
            </section>
            <section className="box">
              <span className="box__label">End: </span>
              <span className="box__value">{alert.end}</span>
            </section>
          </header>
          <section className="box">
            <span className="box__label">Enemy: </span>
            <span className="box__value">{alert.faction} (Level {alert.level})</span>
          </section>
          <section className="box">
            <span className="box__label">Rewards: </span>
            <span className="box__value">
              <ul>
                {alert.rewards.map((reward, index) => {
                  return (
                    <li className="warframe__reward" key={index}>{reward}</li>
                  );
                })}
              </ul>
            </span>
          </section>
          <br/>
          <br/>
        </article>
      );
    });
  }

  render() {
    if (Object.keys(this.state.status).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <article className="warframe">
          <h2>Alerts</h2>
          {WarframeStatus.alerts(this.state.status.alerts)}
        </article>
      );
    }
  }
}
