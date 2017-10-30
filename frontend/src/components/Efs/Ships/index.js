import React, {Component} from 'react';

import ShipsGroup from './Groups';
import LoadingScreen from '../../pages/LoadingScreen';

export default class Ships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ships: []
    };
  }

  componentDidMount() {
    fetch('/api/get-all-ships')
      .then(response => response.json())
      .then(response => {
        this.setState({
          ships: response
        });
        console.log(response.Battleship.Minmatar[3]);
      });
  }

  render() {
    return (
      <section className="overview-ships">
        {this.state.ships.length === 0 ? (() => {
            return <LoadingScreen />
          })() : 
          Object.keys(this.state.ships).map((group, index) => {
            return (
              <ShipsGroup ships={this.state.ships[group]} group={group} key={index}/>
            );
          })}
      </section>
    );
  }
}
