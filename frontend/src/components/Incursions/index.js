import React, {Component} from 'react';
import LoadingScreen from '../pages/LoadingScreen';

function systemsLayout(systems) {
  return systems.map(system => {
    return (
      <div style={{paddingLeft: 3 + 'em'}} key={system.solarSystemID}>
        {system.solarSystemName} {system.incursionType}
      </div>
    );
  });
}

function incursions(incursions) {
  return Object.keys(incursions).map(key => {
    const incursion     = incursions[key],
          aggressor     = incursion['aggressorFactionID']['name'],
          aggressorId   = incursion['aggressorFactionID']['id'],
          factionId     = incursion['info']['factionID'],
          factionName   = incursion['info']['factionName'],
          constellation = incursion['info']['constellationName'],
          influence     = incursion['influence'],
          state         = incursion['state'],
          hasBoss       = incursion['hasBoss'],
          systems       = incursion['info']['systems'];

    const aggressorImg     = `https://image.eveonline.com/Alliance/${aggressorId}_128.png`,
          constellationImg = `https://image.eveonline.com/Alliance/${factionId || 500000}_128.png`;

    return (
      <article key={incursion['constellation']['id_str']}>
        {constellation} <img src={constellationImg} alt={constellation}/> <br/>
        {systemsLayout(systems)}
      </article>
    );
  });
}

export default class Incursions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incursions: {}
    };
  };

  componentWillMount() {
    fetch('/api/get-incursions')
      .then(response => response.json())
      .then(response => {
        this.setState({
          incursions: response
        });
        console.log(response);
      });
  }

  render() {
    if (Object.keys(this.state.incursions).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <section className="incursions">
          <h1>Incursions</h1>
          {incursions(this.state.incursions)}
        </section>
      );
    }
  }
}

/*
{
  "info": {
    "constellationID": 20000643,
    "constellationName": "T-RQ7S",
    "factionName": null,
    "factionID": null,
    "systems": [
      {
        "solarSystemID": 30004402,
        "solarSystemName": "QYZM-W",
        "radius": "28.6",
        "security": "-1.0",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      },
      {
        "solarSystemID": 30004400,
        "solarSystemName": "I-7JR4",
        "radius": "33.3",
        "security": "-0.4",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      },
      {
        "solarSystemID": 30004398,
        "solarSystemName": "ME-4IU",
        "radius": "15.7",
        "security": "-0.6",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      },
      {
        "solarSystemID": 30004401,
        "solarSystemName": "CH9L-K",
        "radius": "11.9",
        "security": "-0.5",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      },
      {
        "solarSystemID": 30004403,
        "solarSystemName": "3KNA-N",
        "radius": "29.9",
        "security": "-0.5",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      },
      {
        "solarSystemID": 30004399,
        "solarSystemName": "BU-IU4",
        "radius": "7.2",
        "security": "-0.9",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      },
      {
        "solarSystemID": 30004397,
        "solarSystemName": "9-B1DS",
        "radius": "15.2",
        "security": "-0.5",
        "constellationID": 20000643,
        "hasRepairs": false,
        "stations": [],
        "incursionType": "N/A"
      }
    ]
  }
}
 */
