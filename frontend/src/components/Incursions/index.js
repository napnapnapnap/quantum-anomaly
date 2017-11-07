import React, {Component} from 'react';
import LoadingScreen from '../pages/LoadingScreen';

export default class Incursions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incursions: {},
      expanded:   {}
    };

    this.expandStations = this.expandStations.bind(this);
  };

  expandStations(systemId) {
    const expanded     = this.state.expanded;
    expanded[systemId] = !expanded[systemId];
    this.setState({
      expanded: expanded
    });
  }

  componentWillMount() {
    fetch('/api/get-incursions')
      .then(response => response.json())
      .then(response => this.setState({
        incursions: response
      }));
  }

  expandStationsButton(systemId) {
    return (
      <button className="btn btn--cta btn--small incursion__toggle" onClick={() => this.expandStations(systemId)}>
        Stations
      </button>
    );
  }

  stationsClassName(systemId) {
    return !this.state.expanded[systemId] ?
      'incursion__stations incursion__stations--hidden' : 'incursion__stations';
  }

  static stationRows(stations) {
    return stations.map(
      ({
         stationID:   id,
         stationName: name,
         hasRepairs
       }) => (
        <p className="incursion__station" key={id}>
          {name} {hasRepairs ? '+' : ''}
        </p>
      )
    );
  }

  systemsRows(systems) {
    return systems.map(
      ({
         solarSystemID:   systemId,
         incursionType:   type,
         solarSystemName: name,
         stations,
         security,
         radius
       }) => (
        <tr key={systemId}>
          <td>{type}</td>
          <td className="incursion__system-name">
            {name} {stations.length > 0 ? this.expandStationsButton(systemId) : ''}
            <div className={this.stationsClassName(systemId)}>
              {Incursions.stationRows(stations)}
            </div>
          </td>
          <td className="center">{security}</td>
          <td className="center">{radius}</td>
        </tr>
      )
    );
  }

  incursions(incursions) {
    return Object.keys(incursions).map(key => {
      const incursion     = incursions[key],
            aggressor     = incursion['aggressorFactionID']['name'],
            factionId     = incursion['factionID'],
            factionName   = incursion['factionName'],
            constellation = incursion['constellationName'],
            influence     = incursion['influence'],
            state         = incursion['state'],
            hasBoss       = incursion['hasBoss'],
            systems       = incursion['systems'],
            constImg      = `https://image.eveonline.com/Alliance/${factionId || 500000}_128.png`;

      return (
        <article className="incursion" key={incursion['constellationID']}>
          <header className="incursion__header">
            <div className="incursion__header-image">
              <img className="responsive" src={constImg} alt={constellation}/>
            </div>
            <div className="incursion__header-text">
              <h4>{constellation}</h4>
              <h6>{factionName}</h6>
            </div>
          </header>
          <section className="box">
            <span className="box__label">Influence: </span>
            <span className="box__value">{influence}%</span>
          </section>
          <section className="box">
            <span className="box__label">State: </span>
            <span className="box__value">{state} {hasBoss ? '*' : ''}</span>
          </section>
          <section className="box">
            <span className="box__label">Enemy: </span>
            <span className="box__value incursion-info__sansha">{aggressor}</span>
          </section>
          <table className="incursion__systems">
            <thead>
            <tr>
              <th>Type</th>
              <th>System</th>
              <th className="center">Security</th>
              <th className="center">Radius</th>
            </tr>
            </thead>
            <tbody>{this.systemsRows(systems)}</tbody>
          </table>
        </article>
      );
    });
  }

  render() {
    if (Object.keys(this.state.incursions).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <article className="incursions">
          <h1>Incursions</h1>
          {this.incursions(this.state.incursions)}
        </article>
      );
    }
  }
}
