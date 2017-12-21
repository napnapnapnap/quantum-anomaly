import React, {Component} from 'react';
import LoadingScreen from '../pages/LoadingScreen';
import tabs from '../../helpers/tabs';

export default class WarframeStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {}
    };
  };

  getData() {
    fetch('/api/get-warframe-status')
      .then(response => response.json())
      .then(response => {
        this.setState({
          status: response
        });
      });
  }

  componentWillMount() {
    this.getData();
    setInterval(this.getData.bind(this), 1000 * 60);
  }

  componentDidUpdate(prevProps, prevState) {
    tabs();
  }

  static invasions(invasions) {
    return invasions.map((invasion, index) => {
      return (
        <section key={index}>
          <section className="warframe__invasion-status">
            <div className="warframe__invasion-parties">
              <span className="warframe__invasion-party warframe__invasion-party--attacker">
                {invasion.defender}
              </span>
              <div className="warframe__planet-name">{invasion.node.value}</div>
              <span className="warframe__invasion-party warframe__invasion-party--defender">
                {invasion.attacker}
              </span>
            </div>
            <div className={`warframe__invasion-total warframe__invasion-total--${invasion.attacker.toLowerCase()}`}>
              <span className={`warframe__invasion-current warframe__invasion-current--${invasion.defender.toLowerCase()}`}
                    style={{right: invasion.status + '%'}}></span>
              <span className="warframe__invasion-zero"></span>
            </div>
            <div className="warframe__invasion-parties">
              <ul className="warframe__invasion-party warframe__invasion-party--attacker">
                {invasion.attackerRewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
              <ul className="warframe__invasion-party warframe__invasion-party--defender">
                {invasion.defenderRewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      );
    });
  }

  static invasionsPlanet(invasions, index) {
    return (
      <section className="warframe__invasion" key={index}>
        <h3 className="warframe__invasion-header bold">{invasions[0].description} on {invasions[0].planet}</h3>
        {WarframeStatus.invasions(invasions)}
      </section>
    );
  }

  static alerts(alerts) {
    return alerts.map((alert, index) => {
      return (
        <section className="warframe__alert" key={index}>
          <h3 className="warframe__invasion-header">Alert on {alert.location}</h3>
          <section className="box">
            <span className="box__label">Start: </span>
            <span className="box__value">{alert.start}</span>
          </section>
          <section className="box">
            <span className="box__label">End: </span>
            <span className="box__value">{alert.end}</span>
          </section>
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
        </section>
      );
    });
  }

  static sortieLevel(index) {
    if (index === 0) return '40-60';
    else if (index === 1) return '60-80';
    else return '80-100';
  }

  static sortie(sortie) {
    return (
      <section className="warframe__sortie">
        {sortie.missions.map((mission, index) => {
          return (
            <section className="warframe__sortie-mission" key={index}>
              <h3 className="warframe__invasion-header">Mission {index+1}</h3>
              <section className="box">
                <span className="box__label">Location: </span>
                <span className="box__value">{mission.node.value}</span>
              </section>              
              <section className="box">
                <span className="box__label">Type: </span>
                <span className="box__value">{mission.type} (Level {WarframeStatus.sortieLevel(index)})</span>
              </section>
              <section className="box">
                <span className="box__label">Effect: </span>
                <span className="box__value">{mission.effect}</span>
              </section>
            </section>
          );
        })}
      </section>
    );
  }

  render() {
    if (Object.keys(this.state.status).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <article className="tabs">
          <section className="tabs__header">
            <h2 className="tabs__header-item">Alerts ({this.state.status.alerts.length})</h2>
            <h2 className="tabs__header-item">Invasions ({Object.keys(this.state.status.invasions).length})</h2>
            <h2 className="tabs__header-item">Sortie</h2>
          </section>
          <section className="tabs__body">
            <section className="tabs__content">
              <section className="warframe__section">
                {WarframeStatus.alerts(this.state.status.alerts)}
              </section>
            </section>
            <section className="tabs__content">
              <section className="warframe__section">
                {Object.keys(this.state.status.invasions).map((planet, index) =>
                  WarframeStatus.invasionsPlanet(this.state.status.invasions[planet], index)
                )}
              </section>
            </section>
            <section className="tabs__content">
              {WarframeStatus.sortie(this.state.status.sortie)}
            </section>
          </section>
        </article>
      );
    }
  }
}
