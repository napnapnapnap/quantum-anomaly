import React, {Component} from 'react';

const renderNodes = (invasions) => (
  invasions.map((invasion, index) => (
      <section className="warframe__invasion-planet" key={index}>
        <header className="warframe__invasion-parties">
          <span className="warframe__invasion-party warframe__invasion-party--attacker">{invasion.defender}</span>
          <span className="warframe__invasion-party warframe__invasion-party--planet">{invasion.node.value}</span>
          <span className="warframe__invasion-party warframe__invasion-party--defender">{invasion.attacker}</span>
        </header>
        <div className={`warframe__invasion-total warframe__invasion-total--${invasion.attacker.toLowerCase()}`}>
          <span className={`warframe__invasion-current warframe__invasion-current--${invasion.defender.toLowerCase()}`} style={{right: invasion.status + '%'}}></span>
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
    )
  )
);

const renderPlanet = (planet, index) => (
  <section className="warframe__invasion" key={index}>
    <h3 className="warframe__header">{planet[0].description} on {planet[0].planet}</h3>
    {renderNodes(planet)}
  </section>
);


export default class Invasions extends Component {
  render() {
    return (
      <section className="warframe__invasions warframe__seperator">
        {Object.keys(this.props.invasions).map((key, index) =>
          renderPlanet(this.props.invasions[key], index)
        )}
      </section>
    );
  }
}
