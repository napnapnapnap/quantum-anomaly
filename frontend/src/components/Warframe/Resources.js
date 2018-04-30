import React, {Component} from 'react';

const renderResource = (resource, planets) => (
  <p className="warframe__resource" key={resource}>
    <span className="warframe__resource-name bold">{resource}: </span>
    <span>{planets.join(', ')}</span>
  </p>
);

export default class Resources extends Component {
  render() {
    const resources = this.props.resources;
    return (
      <section>
        {Object.keys(resources).map(key => renderResource(key, resources[key]))}
      </section>
    );
  }
}
