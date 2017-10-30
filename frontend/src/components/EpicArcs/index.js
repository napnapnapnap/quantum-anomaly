import React, {Component} from 'react';
import EpicArc from './EpicArc';

export default class EpicArcs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      epicArcs:  {},
      activeArc: -1
    };

    this.getArcKeys = this.getArcKeys.bind(this);
  };

  componentWillMount() {
    let activeArc = -1,
        params    = this.props.match.params;

    if (params) {
      if (params.faction === 'amarr') activeArc = 0;
      else if (params.faction === 'caldari') activeArc = 1;
      else if (params.faction === 'gallente') activeArc = 2;
      else if (params.faction === 'minmatar') activeArc = 3;
    }

    fetch('/api/get-epic-arcs')
      .then(response => response.json())
      .then(response => {
        this.setState({
          epicArcs:  response,
          activeArc: activeArc
        });
      });
  }

  getArcKeys() {
    return Object.keys(this.state.epicArcs);
  };

  render() {
    return (
      <section className="overview-arcs">
        {this.getArcKeys().length !== 0 ? (
          this.getArcKeys().map((arc, index) => {
            if (this.state.activeArc === -1 || this.state.activeArc === index) {
              return (
                <article key={index} className="overview-arcs__item">
                  <EpicArc arc={this.state.epicArcs[arc]}
                           active={this.state.activeArc === index}/>
                </article>
              );
            } else {
              return null;
            }
          })) : null}
      </section>
    );
  }
}
