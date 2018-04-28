import React, {Component} from 'react';

const renderPlanet = (planet) => (
  <div className="warframe__planet" key={planet.name}>
    <h5 className="bold">{planet.name}</h5>
    <ul>
      {planet.resources.map(resource => (
        <li className="warframe__reward" key={resource}>{resource}</li>)
      )}
    </ul>
  </div>
);

export default class Planets extends Component {
  render() {
    return (
      <section className="warframe__planets">
        {this.props.planets.map(planet => renderPlanet(planet))}
      </section>
    );
  }
}
